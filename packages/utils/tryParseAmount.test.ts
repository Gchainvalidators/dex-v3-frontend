import { ERC20Token, ChainId } from '@pancakeswap/sdk'
import { describe, it, expect } from 'vitest'
import tryParseAmount from './tryParseAmount'

describe('utils/tryParseAmount', () => {
  it('should be undefined when no valid input', () => {
    expect(tryParseAmount()).toBeUndefined()
  })
  it('should be undefined when input is 0', () => {
    expect(tryParseAmount('0.00')).toBeUndefined()
  })

  it('should pared value', () => {
    expect(
      tryParseAmount(
        '100',
        new ERC20Token(
          ChainId.BSC,
          '0x7E9808c731ce79B2DfC18B88e3Baad3D115DB102',
          18,
          'BLDT',
          'BlueLotusDAO',
          'https://pancakeswap.finance/',
        ),
      ),
    ).toBeTruthy()
  })
})
