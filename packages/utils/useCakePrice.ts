import useSWRImmutable from 'swr/immutable'

export const useCakePrice = () => {
  return useSWRImmutable(
    ['cake-usd-price'],
    async () => {
      const bldt = await (await fetch('https://bluelotusdao.org/api/farms/price/cake')).json()
      return bldt.price as string
    },
    {
      refreshInterval: 1_000 * 10,
    },
  )
}
