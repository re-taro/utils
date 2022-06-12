import pLimit from 'p-limit'

/**
 * Internal marker for filtered items
 */
const VOID = Symbol('p-void')

interface POptions {

  /**
   * How many promises are resolved at the same time.
   */
  concurrency?: number | undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class PInstance<T = any> extends Promise<Awaited<T>[]> {
  private promises = new Set<T | Promise<T>>()

  get promise (): Promise<Awaited<T>[]> {
    // eslint-disable-next-line init-declarations
    let batch
    const items = [...this.items, ...this.promises]

    if (this.options?.concurrency) {
      const limit = pLimit(this.options.concurrency)
      batch = Promise.all(items.map((promise) => limit(() => promise)))
    } else {
      batch = Promise.all(items)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, id-length
    return batch.then((l) => l.filter((index: any) => index !== VOID))
  }

  constructor (public items: Iterable<T> = [], public options?: POptions) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    super(() => {})
  }

  add (...arguments_: (T | Promise<T>)[]) {
    for (const index of arguments_) {
      this.promises.add(index)
    }
  }

  map<U> (function_: (value: Awaited<T>, index: number) => U): PInstance<Promise<U>> {
    return new PInstance(
      [...this.items]
        .map(async (index, index_) => {
          // eslint-disable-next-line @typescript-eslint/await-thenable, id-length
          const v = await index
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((v as any) === VOID) return VOID as unknown as U
          return function_(v, index_)
        }),
      this.options
    )
  }

  filter (function_: (value: Awaited<T>, index: number) => boolean | Promise<boolean>): PInstance<Promise<T>> {
    return new PInstance(
      [...this.items]
        .map(async (index, index_) => {
          // eslint-disable-next-line @typescript-eslint/await-thenable, id-length
          const v = await index
          // eslint-disable-next-line id-length
          const r = await function_(v, index_)
          if (!r) {
            return VOID as unknown as T
          }
          return v
        }),
      this.options
    )
  }

  forEach (function_: (value: Awaited<T>, index: number) => void): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.map(function_).then()
  }

  // eslint-disable-next-line max-len
  reduce<U> (function_: (previousValue: U, currentValue: Awaited<T>, currentIndex: number, array: Awaited<T>[]) => U, initialValue: U): Promise<U> {
    // eslint-disable-next-line unicorn/no-array-reduce, unicorn/no-array-callback-reference
    return this.promise.then((array) => array.reduce(function_, initialValue))
  }

  clear () {
    this.promises.clear()
  }

  // eslint-disable-next-line unicorn/no-thenable, @typescript-eslint/no-explicit-any
  then (function_?: () => PromiseLike<any>) {
    // eslint-disable-next-line id-length
    const p = this.promise
    if (function_) return p.then(function_)
    return p
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (function_?: (error: unknown) => PromiseLike<any>) {
    return this.promise.catch(function_)
  }

  finally (function_?: () => void) {
    return this.promise.finally(function_)
  }
}

/**
 * Utility for managing multiple promises.
 *
 * @category Promise
 * @example
 * ```
 * import { p } from '@re-taro/utils'
 *
 * const items = [1, 2, 3, 4, 5]
 *
 * await p(items)
 *   .map(async i => await multiply(i, 3))
 *   .filter(async i => await isEven(i))
 * // [6, 12]
 * ```
 */
// eslint-disable-next-line id-length, @typescript-eslint/no-explicit-any
const p = <T = any>(items?: Iterable<T>, options?: POptions): PInstance<T> => new PInstance(items, options)

export {
  p
}
