import { expect, it } from 'vitest'
import { tap } from './function'

it('tap', () => {
  // eslint-disable-next-line no-plusplus, no-param-reassign
  expect(tap(1, (value) => value++)).toEqual(1)
  // eslint-disable-next-line id-length, no-plusplus
  expect(tap({ a: 1 }, (object) => object.a++)).toEqual({ a: 2 })
})
