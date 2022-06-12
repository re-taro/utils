import { expect, it } from 'vitest'
import { createSingletonPromise, sleep } from './promise'

// eslint-disable-next-line max-statements
it('promise', async () => {
  let dummy = 0
  // eslint-disable-next-line @typescript-eslint/require-await
  const promise = createSingletonPromise(async () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    sleep(10)
    dummy += 1
    return dummy
  })
  expect(dummy).toBe(0)
  await promise()
  expect(dummy).toBe(1)
  await promise()
  expect(await promise()).toBe(1)
  expect(dummy).toBe(1)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  promise.reset()
  await promise()
  expect(dummy).toBe(2)
})
