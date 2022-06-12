import type { Fnc, Nullable } from './types'

/**
 * Call every function in an array
 */
const batchInvoke = (functions: Nullable<Fnc>[]) => {
  // eslint-disable-next-line no-underscore-dangle
  for (const function_ of functions) function_ && function_()
}

/**
 * Call the function
 */
const invoke = (function_: Fnc) => function_()

/**
 * Pass the value through the callback, and return the value
 *
 * @example
 * ```
 * function createUser(name: string): User {
 *   return tap(new User, user => {
 *     user.name = name
 *   })
 * }
 * ```
 */
const tap = <T>(value: T, callback: (value_: T) => void): T => {
  callback(value)
  return value
}

export {
  batchInvoke,
  invoke,
  tap
}
