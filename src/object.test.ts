/* eslint-disable id-length */
import { describe, expect, it } from 'vitest'
import { deepMerge } from './object'

describe('deepMerge', () => {
  it('should merge Objects and all nested Ones', () => {
    const object1 = { a: { a1: 'A1' }, c: 'C', d: {} }
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, unicorn/no-null, @typescript-eslint/no-explicit-any
    const object2 = { a: { a2: 'A2' }, b: { b1: 'B1' }, d: null } as any
    // eslint-disable-next-line unicorn/no-null
    const object3 = { a: { a1: 'A1', a2: 'A2' }, b: { b1: 'B1' }, c: 'C', d: null }
    expect(deepMerge({}, object1, object2)).toEqual(object3)
  })
  it('should behave like Object.assign on the top level', () => {
    const object1 = { a: { a1: 'A1' }, c: 'C' }
    // eslint-disable-next-line no-undefined
    const object2 = { a: undefined, b: { b1: 'B1' } }
    const merged = deepMerge(object1, object2)
    expect(merged).toEqual({ ...object1, ...object2 })
  })
  it('should not merge array values, just override', () => {
    const object1 = { a: ['A', 'B'] }
    const object2 = { a: ['C'], b: ['D'] }
    expect(deepMerge({}, object1, object2)).toEqual({ a: ['C'], b: ['D'] })
  })
})

/* eslint-enable */
