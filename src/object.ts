import { isObject } from './is'
import type { DeepMerge } from './types'

/**
 * Type guard for any key, `k`.
 * Marks `k` as a key of `T` if `k` is in `obj`.
 *
 * @category Object
 * @param object object to query for key `k`
 * @param key key to check existence in `obj`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isKeyOf = <T extends object> (object: T, key: keyof any): key is keyof T => key in object

/**
 * Strict typed `Object.keys`
 *
 * @category Object
 */
const objectKeys = <T extends object> (object: T) => Object.keys(object) as Array<keyof T>

/**
 * Strict typed `Object.entries`
 *
 * @category Object
 */
const objectEntries = <T extends object> (object: T) => Object.entries(object) as Array<[keyof T, T[keyof T]]>

/**
 * Deep merge :P
 *
 * @category Object
 */
// eslint-disable-next-line max-statements
const deepMerge = <T extends object = object, S extends object = T> (target: T, ...sources: S[]): DeepMerge<T, S> => {
  if (sources.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return target as any
  }
  const source = sources.shift()
  // eslint-disable-next-line no-undefined
  if (source === undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return target as any
  }
  if (isMergableObject(target) && isMergableObject(source)) {
    for (const key of objectKeys(source)) {
      // eslint-disable-next-line security/detect-object-injection
      if (isMergableObject(source[key])) {
        // @ts-expect-error
        // eslint-disable-next-line security/detect-object-injection
        if (!target[key]) {
          // @ts-expect-error
          // eslint-disable-next-line security/detect-object-injection
          target[key] = {}
        }
        // @ts-expect-error
        // eslint-disable-next-line security/detect-object-injection
        deepMerge(target[key], source[key])
      } else {
        // @ts-expect-error
        // eslint-disable-next-line security/detect-object-injection
        target[key] = source[key]
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return deepMerge(target, ...sources)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
const isMergableObject = (item: any): item is Object => isObject(item) && !Array.isArray(item)

/**
 * Create a new subset object by giving keys
 *
 * @category Object
 */
// eslint-disable-next-line unicorn/no-array-reduce, id-length
const objectPick = <O, T extends keyof O>(object: O, keys: T[], omitUndefined = false) => keys.reduce((n, k) => {
  // eslint-disable-next-line no-undefined, security/detect-object-injection
  if (k in object && (!omitUndefined || object[k] !== undefined)) n[k] = object[k]
  return n
}, {} as Pick<O, T>)

/**
 * Clear undefined fields from an object. It mutates the object
 *
 * @category Object
 */
const clearUndefined = <T extends object>(object: T): T => {
  // @ts-expect-error
  // eslint-disable-next-line security/detect-object-injection, no-undefined, unicorn/no-array-for-each
  Object.keys(object).forEach((key: string) => (object[key] === undefined ? delete object[key] : {}))
  return object
}

/**
 * Determines whether an object has a property with the specified name
 *
 * @see https://eslint.org/docs/rules/no-prototype-builtins
 * @category Object
 */
const hasOwnProperty = <T>(object: T, value: PropertyKey) => {
  if (object === null) {
    return false
  }
  // eslint-disable-next-line prefer-object-has-own
  return Object.prototype.hasOwnProperty.call(object, value)
}

export {
  isKeyOf,
  objectKeys,
  objectEntries,
  deepMerge,
  objectPick,
  clearUndefined,
  hasOwnProperty
}
