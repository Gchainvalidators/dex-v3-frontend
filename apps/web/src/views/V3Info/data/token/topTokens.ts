import { GSYS_TOKEN_BLACKLIST } from 'config/constants/info'
import { gql, GraphQLClient } from 'graphql-request'

export const TOP_TOKENS = gql`
  query topPools($blacklist: [String!]) {
    tokens(first: 50, orderBy: totalValueLockedUSD, orderDirection: desc, where: {id_not_in: $blacklist}) {
      id
    }
  }
`

interface TopTokensResponse {
  tokens: {
    id: string
  }[]
}

/**
 * Fetch top addresses by volume
 */
export async function fetchTopTokenAddresses(dataClient: GraphQLClient): Promise<{
  error: boolean
  addresses: string[] | undefined
}> {
  try {
    const data = await dataClient.request<TopTokensResponse>(TOP_TOKENS, {blacklist: GSYS_TOKEN_BLACKLIST})
    return {
      error: false,
      addresses: data ? data.tokens.map((t) => t.id) : undefined,
    }
  } catch (e) {
    return {
      error: true,
      addresses: undefined,
    }
  }
}
