import { AprMap, FarmWithPrices } from '@pancakeswap/farms'

const KV_PREFIX = {
  lp: 'lp:',
  lpApr: 'lpApr:',
  farmByPid: 'farmByPid:',
  farmList: 'farmList:',
}

export type FarmResult = Array<FarmWithPrices & { cakeApr?: string; lpApr?: number }>

export type FarmResultV2 = Array<{
  name: string,
  pair: string,
  pairLink: string,
  logo: string,
  poolRewards: Array<string>,
  apr?: string,
  totalStaked?: number
}>

export type SavedFarmResult = {
  updatedAt: string
  poolLength: number
  regularCakePerBlock: number
  data: FarmResult
}

export type SavedFarmResultV2 = {
  updatedAt: string
  poolLength: number
  regularCakePerBlock: number
  data: FarmResultV2
}

const createKvKey = {
  lp: (chainId: number | string, address: string) => `${KV_PREFIX.lp}${chainId}-${address}`,
  lpAll: (chainId: number | string) => `${KV_PREFIX.lp}:${chainId}all`,
  apr: (chainId: number | string) => `${KV_PREFIX.lpApr}${chainId}`,
  farm: (chainId: number | string, pid: number | string) => `${KV_PREFIX.farmByPid}${chainId}-${pid}`,
  farms: (chainId: number | string) => `${KV_PREFIX.farmList}${chainId}`,
}

export class FarmKV {
  static async getFarms(chainId: number | string) {
    return FARMS.get<SavedFarmResult>(createKvKey.farms(chainId), {
      type: 'json',
    })
  }

  static async getFarmsV2(chainId: number | string) {
    return FARMS.get<SavedFarmResultV2>(createKvKey.farms(chainId), {
      type: 'json',
    })
  }

  static async saveFarms(chainId: number | string, farms: SavedFarmResult) {
    return FARMS.put(createKvKey.farms(chainId), JSON.stringify(farms))
  }

  static async saveFarmsV2(chainId: number | string, farms: SavedFarmResultV2) {
    return FARMS.put(createKvKey.farms(chainId), JSON.stringify(farms))
  }

  static async getApr(chainId: number | string) {
    return FARMS.get<AprMap>(createKvKey.apr(chainId), {
      type: 'json',
    })
  }

  // eslint-disable-next-line consistent-return
  static async saveApr(chainId: number | string, aprMap: AprMap | null) {
    const stringifyAprMap = aprMap ? JSON.stringify(aprMap) : null
    if (stringifyAprMap) {
      return FARMS.put(createKvKey.apr(chainId), stringifyAprMap)
    }
  }
}

export const farmKV = new FarmKV()
