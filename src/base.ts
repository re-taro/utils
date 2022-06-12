const assert = (condition: boolean, message: string): asserts condition => {
  if (!condition) {
    throw new Error(message)
  }
}
const toString = (value: unknown) => Object.prototype.toString.call(value)
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export {
  assert,
  toString,
  noop
}
