import { request, gql } from 'graphql-request'
import { GRAPH_API_PREDICTION_BNB, GRAPH_API_PREDICTION_CAKE } from 'config/constants/endpoints'
import {
  Bet,
  LedgerData,
  BetPosition,
  PredictionsState,
  PredictionStatus,
  ReduxNodeLedger,
  RoundData,
  HistoryFilter,
  ReduxNodeRound,
  NodeRound,
} from 'state/types'
import { Address } from 'wagmi'
import { getPredictionsV2Contract } from 'utils/contractHelpers'
import { predictionsV2ABI } from 'config/abi/predictionsV2'
import { publicClient } from 'utils/wagmi'
import { ChainId } from '@pancakeswap/sdk'
import { PredictionsLedgerResponse, PredictionsRoundsResponse } from 'utils/types'
import { getRoundBaseFields, getBetBaseFields, getUserBaseFields } from './queries'
import { ROUNDS_PER_PAGE } from './config'
import { transformBetResponseCAKE, transformUserResponseCAKE } from './cakeTransformers'
import { transformBetResponseBNB, transformUserResponseBNB } from './bnbTransformers'
import { BetResponse, UserResponse } from './responseType'
import { BetResponseBNB } from './bnbQueries'
import { BetResponseCAKE } from './cakeQueries'

const convertBigInt = (value: string | null) => (!value ? null : BigInt(value))

export const deserializeRound = (round: ReduxNodeRound): NodeRound => ({
  ...round,
  bearAmount: convertBigInt(round.bearAmount),
  bullAmount: convertBigInt(round.bullAmount),
  totalAmount: convertBigInt(round.totalAmount),
  lockPrice: convertBigInt(round.lockPrice),
  closePrice: convertBigInt(round.closePrice),
  rewardBaseCalAmount: convertBigInt(round.rewardBaseCalAmount),
  rewardAmount: convertBigInt(round.rewardAmount),
})

// TODO: refactor it when multi-chain
const bscClient = publicClient({ chainId: ChainId.BSC })

export enum Result {
  WIN = 'win',
  LOSE = 'lose',
  CANCELED = 'canceled',
  HOUSE = 'house',
  LIVE = 'live',
}

export const transformBetResponse = (tokenSymbol) =>
  tokenSymbol === 'BLDT' ? transformBetResponseCAKE : transformBetResponseBNB

export const transformUserResponse = (tokenSymbol) =>
  tokenSymbol === 'BLDT' ? transformUserResponseCAKE : transformUserResponseBNB

export const getRoundResult = (bet: Bet, currentEpoch: number): Result => {
  const { round } = bet
  if (round.failed) {
    return Result.CANCELED
  }

  if (round.epoch >= currentEpoch - 1) {
    return Result.LIVE
  }

  if (bet.round.position === BetPosition.HOUSE) {
    return Result.HOUSE
  }

  const roundResultPosition = round.closePrice > round.lockPrice ? BetPosition.BULL : BetPosition.BEAR

  return bet.position === roundResultPosition ? Result.WIN : Result.LOSE
}

export const getFilteredBets = (bets: Bet[], filter: HistoryFilter) => {
  switch (filter) {
    case HistoryFilter.COLLECTED:
      return bets.filter((bet) => bet.claimed === true)
    case HistoryFilter.UNCOLLECTED:
      return bets.filter((bet) => {
        return !bet.claimed && (bet.position === bet.round.position || bet.round.failed === true)
      })
    case HistoryFilter.ALL:
    default:
      return bets
  }
}

const getTotalWonMarket = (market, tokenSymbol) => {
  const total = market[`total${tokenSymbol}`] ? parseFloat(market[`total${tokenSymbol}`]) : 0
  const totalTreasury = market[`total${tokenSymbol}Treasury`] ? parseFloat(market[`total${tokenSymbol}Treasury`]) : 0

  return Math.max(total - totalTreasury, 0)
}

export const getTotalWon = async (): Promise<{ totalWonBNB: number; totalWonCAKE: number }> => {
  const [{ market: BNBMarket, market: CAKEMarket }] = await Promise.all([
    request(
      GRAPH_API_PREDICTION_BNB,
      gql`
        query getTotalWonData {
          market(id: 1) {
            totalBNB
            totalBNBTreasury
          }
        }
      `,
    ),
    request(
      GRAPH_API_PREDICTION_CAKE,
      gql`
        query getTotalWonData {
          market(id: 1) {
            totalCAKE
            totalCAKETreasury
          }
        }
      `,
    ),
  ])

  const totalWonBNB = getTotalWonMarket(BNBMarket, 'BNB')
  const totalWonCAKE = getTotalWonMarket(CAKEMarket, 'BLDT')

  return { totalWonBNB, totalWonCAKE }
}

type WhereClause = Record<string, string | number | boolean | string[]>

export const getBetHistory = async (
  where: WhereClause = {},
  first = 1000,
  skip = 0,
  api: string,
  tokenSymbol: string,
): Promise<Array<BetResponseBNB | BetResponseCAKE>> => {
  const response = await request(
    api,
    gql`
      query getBetHistory($first: Int!, $skip: Int!, $where: Bet_filter) {
        bets(first: $first, skip: $skip, where: $where, orderBy: createdAt, orderDirection: desc) {
          ${getBetBaseFields(tokenSymbol)}
          round {
            ${getRoundBaseFields(tokenSymbol)}
          }
          user {
            ${getUserBaseFields(tokenSymbol)}
          }
        }
      }
    `,
    { first, skip, where },
  )
  return response.bets
}

export const getLedgerData = async (
  account: Address,
  epochs: number[],
  address: Address,
): Promise<PredictionsLedgerResponse[]> => {
  const response = await bscClient.multicall({
    contracts: epochs.map(
      (epoch) =>
        ({
          address,
          abi: predictionsV2ABI,
          functionName: 'ledger',
          args: [BigInt(epoch), account] as const,
        } as const),
    ),
    allowFailure: false,
  })

  return response.map((r) => ({
    position: r[0] as 1 | 0,
    amount: r[1],
    claimed: r[2],
  }))
}

export const LEADERBOARD_RESULTS_PER_PAGE = 20

interface GetPredictionUsersOptions {
  skip?: number
  first?: number
  orderBy?: string
  orderDir?: string
  where?: WhereClause
}

const defaultPredictionUserOptions = {
  skip: 0,
  first: LEADERBOARD_RESULTS_PER_PAGE,
  orderBy: 'createdAt',
  orderDir: 'desc',
}

export const getHasRoundFailed = (oracleCalled: boolean, closeTimestamp: number, buffer: number) => {
  if (!oracleCalled) {
    const closeTimestampMs = (closeTimestamp + buffer) * 1000
    if (Number.isFinite(closeTimestampMs)) {
      return Date.now() > closeTimestampMs
    }
  }

  return false
}

export const getPredictionUsers = async (
  options: GetPredictionUsersOptions = {},
  api: string,
  tokenSymbol: string,
): Promise<UserResponse<BetResponse>[]> => {
  const { first, skip, where, orderBy, orderDir } = { ...defaultPredictionUserOptions, ...options }
  const response = await request(
    api,
    gql`
      query getUsers($first: Int!, $skip: Int!, $where: User_filter, $orderBy: User_orderBy, $orderDir: OrderDirection) {
        users(first: $first, skip: $skip, where: $where, orderBy: $orderBy, orderDirection: $orderDir) {
          ${getUserBaseFields(tokenSymbol)}
        }
      }
    `,
    { first, skip, where, orderBy, orderDir },
  )
  return response.users
}

export const getPredictionUser = async (
  account: string,
  api: string,
  tokenSymbol: string,
): Promise<UserResponse<BetResponse>> => {
  const response = await request(
    api,
    gql`
      query getUser($id: ID!) {
        user(id: $id) {
          ${getUserBaseFields(tokenSymbol)}
        }
      }
  `,
    {
      id: account.toLowerCase(),
    },
  )
  return response.user
}

export const getClaimStatuses = async (
  account: Address,
  epochs: number[],
  address: Address,
): Promise<PredictionsState['claimableStatuses']> => {
  const response = await bscClient.multicall({
    contracts: epochs.map(
      (epoch) =>
        ({
          address,
          abi: predictionsV2ABI,
          functionName: 'claimable',
          args: [BigInt(epoch), account] as const,
        } as const),
    ),
    allowFailure: false,
  })

  return response.reduce((accum, claimable, index) => {
    const epoch = epochs[index]

    return {
      ...accum,
      [epoch]: claimable,
    }
  }, {})
}

export type MarketData = Pick<PredictionsState, 'status' | 'currentEpoch' | 'intervalSeconds' | 'minBetAmount'>
export const getPredictionData = async (address: Address): Promise<MarketData> => {
  const [currentEpoch, intervalSeconds, minBetAmount, paused] = await bscClient.multicall({
    contracts: [
      {
        address,
        abi: predictionsV2ABI,
        functionName: 'currentEpoch',
      },
      {
        address,
        abi: predictionsV2ABI,
        functionName: 'intervalSeconds',
      },
      {
        address,
        abi: predictionsV2ABI,
        functionName: 'minBetAmount',
      },
      {
        address,
        abi: predictionsV2ABI,
        functionName: 'paused',
      },
    ],
    allowFailure: false,
  })

  return {
    status: paused ? PredictionStatus.PAUSED : PredictionStatus.LIVE,
    currentEpoch: Number(currentEpoch),
    intervalSeconds: Number(intervalSeconds),
    minBetAmount: minBetAmount.toString(),
  }
}

export const getRoundsData = async (epochs: number[], address: Address): Promise<PredictionsRoundsResponse[]> => {
  const response = await bscClient.multicall({
    contracts: epochs.map(
      (epoch) =>
        ({
          address,
          abi: predictionsV2ABI,
          functionName: 'rounds',
          args: [BigInt(epoch)] as const,
        } as const),
    ),
    allowFailure: false,
  })

  return response.map((r) => ({
    epoch: r[0],
    startTimestamp: r[1],
    lockTimestamp: r[2],
    closeTimestamp: r[3],
    lockPrice: r[4],
    closePrice: r[5],
    lockOracleId: r[6],
    closeOracleId: r[7],
    totalAmount: r[8],
    bullAmount: r[9],
    bearAmount: r[10],
    rewardBaseCalAmount: r[11],
    rewardAmount: r[12],
    oracleCalled: r[13],
  }))
}

export const makeFutureRoundResponse = (epoch: number, startTimestamp: number): ReduxNodeRound => {
  return {
    epoch,
    startTimestamp,
    lockTimestamp: null,
    closeTimestamp: null,
    lockPrice: null,
    closePrice: null,
    totalAmount: '0',
    bullAmount: '0',
    bearAmount: '0',
    rewardBaseCalAmount: '0',
    rewardAmount: '0',
    oracleCalled: false,
    lockOracleId: null,
    closeOracleId: null,
  }
}

export const makeRoundData = (rounds: ReduxNodeRound[]): RoundData => {
  return rounds.reduce((accum, round) => {
    return {
      ...accum,
      [round.epoch.toString()]: round,
    }
  }, {})
}

export const serializePredictionsLedgerResponse = (ledgerResponse: PredictionsLedgerResponse): ReduxNodeLedger => ({
  position: ledgerResponse.position === 0 ? BetPosition.BULL : BetPosition.BEAR,
  amount: ledgerResponse.amount.toString(),
  claimed: ledgerResponse.claimed,
})

export const makeLedgerData = (account: string, ledgers: PredictionsLedgerResponse[], epochs: number[]): LedgerData => {
  return ledgers.reduce((accum, ledgerResponse, index) => {
    if (!ledgerResponse) {
      return accum
    }

    // If the amount is zero that means the user did not bet
    if (ledgerResponse.amount === 0n) {
      return accum
    }

    const epoch = epochs[index].toString()

    return {
      ...accum,
      [account]: {
        ...accum[account],
        [epoch]: serializePredictionsLedgerResponse(ledgerResponse),
      },
    }
  }, {})
}

/**
 * Serializes the return from the "rounds" call for redux
 */
export const serializePredictionsRoundsResponse = (response: PredictionsRoundsResponse): ReduxNodeRound => {
  const {
    epoch,
    startTimestamp,
    lockTimestamp,
    closeTimestamp,
    lockPrice,
    closePrice,
    totalAmount,
    bullAmount,
    bearAmount,
    rewardBaseCalAmount,
    rewardAmount,
    oracleCalled,
    lockOracleId,
    closeOracleId,
  } = response

  return {
    oracleCalled,
    epoch: Number(epoch),
    startTimestamp: startTimestamp === 0n ? null : Number(startTimestamp),
    lockTimestamp: lockTimestamp === 0n ? null : Number(lockTimestamp),
    closeTimestamp: closeTimestamp === 0n ? null : Number(closeTimestamp),
    lockPrice: lockPrice === 0n ? null : lockPrice.toString(),
    closePrice: closePrice === 0n ? null : closePrice.toString(),
    totalAmount: totalAmount.toString(),
    bullAmount: bullAmount.toString(),
    bearAmount: bearAmount.toString(),
    rewardBaseCalAmount: rewardBaseCalAmount.toString(),
    rewardAmount: rewardAmount.toString(),
    lockOracleId: lockOracleId.toString(),
    closeOracleId: closeOracleId.toString(),
  }
}

export const fetchUsersRoundsLength = async (account: Address, address: Address) => {
  try {
    const contract = getPredictionsV2Contract(address)
    const length = await contract.read.getUserRoundsLength([account])
    return length
  } catch {
    return 0n
  }
}

/**
 * Fetches rounds a user has participated in
 */
export const fetchUserRounds = async (
  account: Address,
  cursor = 0,
  size = ROUNDS_PER_PAGE,
  address: Address,
): Promise<{ [key: string]: ReduxNodeLedger }> => {
  const contract = getPredictionsV2Contract(address)

  try {
    const [rounds, ledgers] = await contract.read.getUserRounds([account, BigInt(cursor), BigInt(size)])

    return rounds.reduce((accum, round, index) => {
      return {
        ...accum,
        [round.toString()]: serializePredictionsLedgerResponse(ledgers[index] as PredictionsLedgerResponse),
      }
    }, {})
  } catch {
    // When the results run out the contract throws an error.
    return null
  }
}
