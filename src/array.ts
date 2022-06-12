import { clamp } from './math'
import type { Arrayable, Nullable } from './types'

/**
 * Convert `Arrayable<T>` to `Array<T>`
 *
 * @category Array
 */
const toArray = <T>(array?: Nullable<Arrayable<T>>): Array<T> => {
  // eslint-disable-next-line no-param-reassign
  array = array || []
  if (Array.isArray(array)) {
    return array
  }
  return [array]
}

/**
 * Convert `Arrayable<T>` to `Array<T>` and flatten it
 *
 * @category Array
 */
const flattenArrayable = <T>(array?: Nullable<Arrayable<T | Array<T>>>): Array<T> => toArray(array).flat(1) as Array<T>

/**
 * Use rest arguments to merge arrays
 *
 * @category Array
 */
// eslint-disable-next-line max-len
const mergeArrayable = <T>(...arguments_: Nullable<Arrayable<T>>[]): Array<T> => arguments_.flatMap((index) => toArray(index))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PartitionFilter<T> = (index: T, index_: number, array: readonly T[]) => any

/**
 * Divide an array into two parts by a filter function
 *
 * @category Array
 * @example const [odd, even] = partition([1, 2, 3, 4], i => i % 2 != 0)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const partition = <T>(array: readonly T[], ...filters: PartitionFilter<T>[]): any => {
  // eslint-disable-next-line unicorn/no-null
  const result: T[][] = Array.from({ length: filters.length + 1 }).fill(null)
    .map(() => [])
  // eslint-disable-next-line unicorn/no-array-for-each
  array.forEach((event, index, array_) => {
    // eslint-disable-next-line no-underscore-dangle
    let index_ = 0
    for (const filter of filters) {
      if (filter(event, index, array_)) {
        // eslint-disable-next-line security/detect-object-injection, no-underscore-dangle
        result[index_].push(event)
        return
      }
      index_ += 1
    }
    // eslint-disable-next-line security/detect-object-injection, no-underscore-dangle
    result[index_].push(event)
  })
  return result
}

/**
 * Unique an Array
 *
 * @category Array
 */
const uniq = <T>(array: readonly T[]): T[] => [...new Set(array)]

/**
 * Get last item
 *
 * @category Array
 */
const last = <T>(array: readonly T[]): T | undefined => at(array, -1)

/**
 * Remove an item from Array
 *
 * @category Array
 */
const remove = <T>(array: T[], value: T) => {
  if (!array) {
    return false
  }
  const index = array.indexOf(value)
  if (index >= 0) {
    array.splice(index, 1)
    return true
  }
  return false
}

/**
 * Get nth item of Array. Negative for backward
 *
 * @category Array
 */
const at = <T>(array: readonly T[] | [], index: number): T | undefined => {
  const { length } = array
  if (!length) {
    // eslint-disable-next-line no-undefined
    return undefined
  }
  if (index < 0) {
    // eslint-disable-next-line no-param-reassign
    index += length
  }
  // eslint-disable-next-line security/detect-object-injection
  return array[index]
}

/**
 * Genrate a range array of numbers. The `stop` is exclusive.
 *
 * @category Array
 */
// eslint-disable-next-line max-statements, @typescript-eslint/no-explicit-any
const range = (...arguments_: any): number[] => {
  // eslint-disable-next-line init-declarations
  let start: number, step: number, stop: number
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (arguments_.length === 1) {
    start = 0
    step = 1;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ([stop] = arguments_)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ([start, stop, step = 1] = arguments_)
  }
  const array: number[] = []
  let current = start
  while (current < stop) {
    array.push(current)
    current += step || 1
  }
  return array
}

/**
 * Move element in an Array
 *
 * @category Array
 * @param array
 * @param from
 * @param to
 */
const move = <T>(array: T[], from: number, to: number) => {
  array.splice(to, 0, array.splice(from, 1)[0])
  return array
}

/**
 * Clamp a number to the index ranage of an array
 *
 * @category Array
 */
const clampArrayRange = (number_: number, array: readonly unknown[]) => clamp(number_, 0, array.length - 1)

/**
 * Get random items from an array
 *
 * @category Array
 */
// eslint-disable-next-line max-len
const sample = <T>(array: T[], count: number) => Array.from({ length: count }, () => array[Math.round(Math.random() * (array.length - 1))])

/**
 * Shuffle an array. This function mutates the array.
 *
 * @category Array
 */
const shuffle = <T>(array: T[]): T[] => {
  // eslint-disable-next-line no-plusplus
  for (let index = array.length - 1; index > 0; index--) {
    // eslint-disable-next-line no-underscore-dangle
    const index_ = Math.floor(Math.random() * (index + 1));
    // eslint-disable-next-line no-underscore-dangle, security/detect-object-injection
    [array[index], array[index_]] = [array[index_], array[index]]
  }
  return array
}

export {
  toArray,
  flattenArrayable,
  mergeArrayable,
  partition,
  uniq,
  last,
  remove,
  at,
  range,
  move,
  clampArrayRange,
  sample,
  shuffle
}
