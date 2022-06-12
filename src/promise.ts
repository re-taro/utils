import { remove } from './array'
import type { Fnc } from './types'

export interface SingletonPromiseReturn<T> {
  (): Promise<T>

  /**
   * Reset current staled promise.
   * Await it to have proper shutdown.
   */
  reset: () => Promise<void>
}

/**
 * Create singleton promise function
 *
 * @category Promise
 */
const createSingletonPromise = <T>(function_: () => Promise<T>): SingletonPromiseReturn<T> => {
  // eslint-disable-next-line no-underscore-dangle, init-declarations
  let _promise: Promise<T> | undefined
  const wrapper = () => {
    if (!_promise) _promise = function_()
    return _promise
  }
  wrapper.reset = async () => {
    // eslint-disable-next-line no-underscore-dangle
    const _previous = _promise
    // eslint-disable-next-line no-undefined
    _promise = undefined
    if (_previous) await _previous
  }
  return wrapper
}

/**
 * Promised `setTimeout`
 *
 * @category Promise
 */
// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-misused-promises, no-promise-executor-return, @typescript-eslint/no-explicit-any
const sleep = (ms: number, callback?: Fnc<any>) => new Promise<void>((resolve) => setTimeout(async () => {
  await callback?.()
  resolve()
}, ms))

/**
 * Create a promise lock
 *
 * @category Promise
 * @example
 * ```
 * const lock = createPromiseLock()
 *
 * lock.run(async () => {
 *   await doSomething()
 * })
 *
 * // in anther context:
 * await lock.wait() // it will wait all tasking finished
 * ```
 */
const createPromiseLock = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const locks: Promise<any>[] = []
  return {
    clear () {
      locks.length = 0
    },
    isWaiting () {
      return locks.length > 0
    },
    async run<T = void> (function_: () => Promise<T>): Promise<T> {
      const value = function_()
      locks.push(value)
      try {
        return await value
      } finally {
        remove(locks, value)
      }
    },
    async wait (): Promise<void> {
      await Promise.allSettled(locks)
    }
  }
}

/**
 * Promise with `resolve` and `reject` methods of itself
 */
export interface ControlledPromise<T = void> extends Promise<T> {
  resolve(value: T | PromiseLike<T>): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject(reason?: any): void
}

/**
 * Return a Promise with `resolve` and `reject` methods
 *
 * @category Promise
 * @example
 * ```
 * const promise = createControlledPromise()
 *
 * await promise
 *
 * // in anther context:
 * promise.resolve(data)
 * ```
 */
const createControlledPromise = <T>(): ControlledPromise<T> => {
  // eslint-disable-next-line init-declarations, @typescript-eslint/no-explicit-any
  let reject: any, resolve: any
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as ControlledPromise<T>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  promise.resolve = resolve
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  promise.reject = reject
  return promise
}

export {
  createSingletonPromise,
  sleep,
  createPromiseLock,
  createControlledPromise
}
