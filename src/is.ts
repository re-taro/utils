import { toString } from './base'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDefind = <T = any>(value?: T): value is T => typeof value !== 'undefined'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isBoolean = (value: any): value is boolean => typeof value === 'boolean'
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
const isFunction = <T extends Function> (value: any): value is T => typeof value === 'function'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNumber = (value: any): value is number => typeof value === 'number'
const isString = (value: unknown): value is string => typeof value === 'string'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (value: any): value is object => toString(value) === '[object Object]'
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWindow = (value: any): boolean => typeof window !== 'undefined' && toString(value) === '[object Window]'
// @ts-ignore
const isBrowser = typeof window !== 'undefined'

export {
  isDefind,
  isBoolean,
  isFunction,
  isNumber,
  isString,
  isObject,
  isWindow,
  isBrowser
}
