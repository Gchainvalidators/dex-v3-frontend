import useSWRImmutable from 'swr/immutable'

export const useCakePrice = () => {
  return useSWRImmutable(
    ['cake-usd-price'],
    async () => {
      const bldt = await (await fetch('https://tempdex.genesys.network/api/farms/price/cake')).json()
      return bldt.price as string
    },
    {
      refreshInterval: 1_000 * 10,
    },
  )
}
