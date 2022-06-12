import { describe, expect, it } from 'vitest'
import { p as P } from './p'

// eslint-disable-next-line no-promise-executor-return
const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// eslint-disable-next-line max-lines-per-function
describe('should', () => {
  it('p', async () => {
    // eslint-disable-next-line id-length
    const p = P()
    let dummy = 0
    p.add((async () => {
      await timeout(100)
      dummy += 1
      return 4
    })())
    expect(dummy).toBe(0)
    await p
    expect(dummy).toBe(1)
  })
  it('chain array map', async () => {
    expect(
      await P([1, 2, 3, 4, 5])
        .map(async (index) => {
          await timeout(10)
          return index * index
        })
        .filter((index) => index > 10)
        // eslint-disable-next-line id-length
        .reduce((a, b) => a + b, 0)
    )
      .toEqual(41)
  })
  it('concurrency: 1', async () => {
    let running = 0
    // eslint-disable-next-line @typescript-eslint/require-await, id-length
    const promises = Array.from({ length: 100 }, async (_, index: number) => {
      // eslint-disable-next-line no-plusplus
      running++
      expect(running).to.be.lessThanOrEqual(1)
      // eslint-disable-next-line no-plusplus
      running--
      return index
    })
    // eslint-disable-next-line id-length
    const results = await P(promises, { concurrency: 1 }).reduce((a, b) => a + b, 0)
    expect(results).to.be.equal(4950)
  })
  it('concurrency: 4', async () => {
    let running = 0
    // eslint-disable-next-line @typescript-eslint/require-await
    const promises = Array.from({ length: 100 }, async () => {
      // eslint-disable-next-line no-plusplus
      running++
      expect(running).to.be.lessThanOrEqual(4)
      // eslint-disable-next-line no-plusplus
      running--
    })
    await P(promises, { concurrency: 4 })
  })
  it('fails with wrong format', async () => {
    try {
      await P([], { concurrency: 1.5 })
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
    }
    try {
      await P([], { concurrency: 0 })
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
    }
  })
})
