import { ChainId } from '@pancakeswap/sdk'
import { createPublicClient, http, PublicClient, Chain } from 'viem'
import { bsc, bscTestnet, goerli, mainnet, zkSyncTestnet, polygonZkEvm, zkSync } from 'viem/chains'

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

const requireCheck = [ETH_NODE, GOERLI_NODE, BSC_NODE, BSC_TESTNET_NODE, POLYGON_ZKEVM_NODE, ZKSYNC_NODE, GSYS_NODE]
requireCheck.forEach((node) => {
  if (!node) {
    throw new Error('Missing env var')
  }
})

const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(ETH_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
    },
  },
})

export const bscClient: PublicClient = createPublicClient({
  chain: bsc,
  transport: http(BSC_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
    },
  },
})

export const bscTestnetClient: PublicClient = createPublicClient({
  chain: bscTestnet,
  transport: http(BSC_TESTNET_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
    },
  },
})

const goerliClient = createPublicClient({
  chain: goerli,
  transport: http(GOERLI_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
    },
  },
})

const zksyncTestnetClient = createPublicClient({
  chain: zkSyncTestnet,
  transport: http(),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
    },
  },
})

const polygonZkEvmClient = createPublicClient({
  chain: {
    ...polygonZkEvm,
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 57746,
      },
    },
  },
  transport: http(POLYGON_ZKEVM_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
    },
  },
})

const zksyncClient = createPublicClient({
  chain: zkSync,
  transport: http(ZKSYNC_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
    },
  },
})

export const gsysClient: PublicClient = createPublicClient({
  chain: gsys,
  transport: http(GSYS_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
    },
  },
})

export const viemProviders = ({ chainId }: { chainId?: ChainId }): PublicClient => {
  switch (chainId) {
    case ChainId.ETHEREUM:
      return mainnetClient
    case ChainId.BSC:
      return bscClient
    case ChainId.BSC_TESTNET:
      return bscTestnetClient
    case ChainId.GOERLI:
      return goerliClient
    case ChainId.ZKSYNC_TESTNET:
      return zksyncTestnetClient
    case ChainId.POLYGON_ZKEVM:
      return polygonZkEvmClient
    case ChainId.ZKSYNC:
      return zksyncClient
    case ChainId.GSYS:
      return gsysClient
    default:
      return gsysClient
  }
}
