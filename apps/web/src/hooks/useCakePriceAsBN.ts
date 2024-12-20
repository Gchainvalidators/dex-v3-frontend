import { ChainId } from '@pancakeswap/sdk'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import BigNumber from 'bignumber.js'
import { chainlinkOracleABI } from 'config/abi/chainlinkOracle'
import contracts from 'config/constants/contracts'
import { publicClient } from 'utils/wagmi'
import { formatUnits } from 'viem'
import { useContractRead } from 'wagmi'
import { useCakePrice } from '@pancakeswap/utils/useCakePrice'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'

// for migration to bignumber.js to avoid breaking changes
export const useCakePriceAsBN = () => {
  // const { data } = useContractRead({
  //   abi: chainlinkOracleABI,
  //   address: contracts.chainlinkOracleCAKE[ChainId.BSC],
  //   functionName: 'latestAnswer',
  //   chainId: ChainId.BSC,
  //   watch: true,
  //   select: (d) => new BigNumber(formatUnits(d, 8)),
  // })
  const data = useCakePrice()
  return data.data ? new BigNumber(data.data) : BIG_ZERO
}

export const getCakePriceFromOracle = async () => {
  // const data = await publicClient({ chainId: ChainId.BSC }).readContract({
  //   abi: chainlinkOracleABI,
  //   address: contracts.chainlinkOracleCAKE[ChainId.BSC],
  //   functionName: 'latestAnswer',
  // })
  const data = useCakePrice()
  return data?.data
}
