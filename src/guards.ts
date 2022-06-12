/**
 * Type guard to filter out null-ish values
 *
 * @category Guards
 * @example array.filter(notNullish)
 */
// eslint-disable-next-line id-length
const notNullish = <T>(v: T | null | undefined): v is NonNullable<T> => v !== null

/**
 * Type guard to filter out null values
 *
 * @category Guards
 * @example array.filter(noNull)
 */
// eslint-disable-next-line id-length
const noNull = <T>(v: T | null): v is Exclude<T, null> => v !== null

/**
 * Type guard to filter out null-ish values
 *
 * @category Guards
 * @example array.filter(notUndefined)
 */
// eslint-disable-next-line id-length, no-undefined
const notUndefined = <T>(v: T): v is Exclude<T, undefined> => v !== undefined

/**
 * Type guard to filter out falsy values
 *
 * @category Guards
 * @example array.filter(isTruthy)
 */
// eslint-disable-next-line id-length, unicorn/prefer-native-coercion-functions
const isTruthy = <T>(v: T): v is NonNullable<T> => Boolean(v)

export {
  notNullish,
  noNull,
  notUndefined,
  isTruthy
}
