import { createPublicClient, PublicClient, http, getContract, Address } from 'viem'
import { bsc, bscTestnet, mainnet, goerli, Chain } from 'viem/chains'
import { CurrencyAmount, Token } from '@pancakeswap/swap-sdk-core'
import invariant from 'tiny-invariant'
import { Pair } from './entities/pair'
import { ChainId } from './constants'
import { erc20ABI } from './abis/ERC20'
import { pancakePairV2ABI } from './abis/IPancakePair'

export const gsys = {
  id: 16507,
  name: 'Genesys Mainnet',
  network: 'gsys',
  nativeCurrency: {
    decimals: 18,
    name: 'GSYS',
    symbol: 'GSYS',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.genesys.network'],
    },
    public: {
      http: ['https://rpc.genesys.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Genesys Mainnet',
      url: 'https://gchainexplorer.genesys.network',
    },
  },
  contracts: {
    multicall3: {
      address: '0x90a2377F233E3461BACa6080d4837837d8762927' as `0x${string}`,
      blockCreated: 4_773_657,
    },
  },
  testnet: false,
} as const satisfies Chain

let TOKEN_DECIMALS_CACHE: { [chainId: number]: { [address: string]: number } } = {
  [ChainId.BSC]: {},
}

const ethClient = createPublicClient({ chain: mainnet, transport: http() })
const bscClient = createPublicClient({ chain: bsc, transport: http() })
const bscTestnetClient = createPublicClient({ chain: bscTestnet, transport: http() })
const goerliClient = createPublicClient({ chain: goerli, transport: http() })
const gsysClient = createPublicClient({ chain: gsys, transport: http() })

const getDefaultClient = (chainId: ChainId): PublicClient => {
  switch (chainId) {
    case ChainId.ETHEREUM:
      return ethClient
    case ChainId.BSC:
      return bscClient
    case ChainId.BSC_TESTNET:
      return bscTestnetClient
    case ChainId.GOERLI:
      return goerliClient
    case ChainId.GSYS:
      return gsysClient
    default:
      return bscClient
  }
}

/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */
export abstract class Fetcher {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * Fetch information for a given token on the given chain, using the given viem provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol symbol of the token
   * @param name optional name of the token
   */
  public static async fetchTokenData(
    chainId: ChainId,
    address: Address,
    publicClient: any = getDefaultClient(chainId),
    symbol: string,
    name?: string
  ): Promise<Token> {
    const erc20 = getContract({
      abi: erc20ABI,
      address,
      publicClient: publicClient as PublicClient,
    })
    const parsedDecimals =
      typeof TOKEN_DECIMALS_CACHE?.[chainId]?.[address] === 'number'
        ? TOKEN_DECIMALS_CACHE[chainId][address]
        : await erc20.read.decimals().then((decimals): number => {
            TOKEN_DECIMALS_CACHE = {
              ...TOKEN_DECIMALS_CACHE,
              [chainId]: {
                ...TOKEN_DECIMALS_CACHE?.[chainId],
                [address]: decimals,
              },
            }
            return decimals
          })
    return new Token(chainId, address, parsedDecimals, symbol, name)
  }

  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  public static async fetchPairData(
    tokenA: Token,
    tokenB: Token,
    publicClient: any = getDefaultClient(tokenA.chainId)
  ): Promise<Pair> {
    invariant(tokenA.chainId === tokenB.chainId, 'CHAIN_ID')
    const address = Pair.getAddress(tokenA, tokenB)
    const pairContract = getContract({
      abi: pancakePairV2ABI,
      address,
      publicClient: publicClient as PublicClient,
    })
    const [reserves0, reserves1] = await pairContract.read.getReserves()
    const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0]
    return new Pair(
      CurrencyAmount.fromRawAmount(tokenA, balances[0]),
      CurrencyAmount.fromRawAmount(tokenB, balances[1])
    )
  }
}
