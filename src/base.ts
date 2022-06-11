export const assert = (condition: boolean, message: string): asserts condition => {
  if (!condition) {
    throw new Error(message)
  }
}
export const toString = (value: unknown) => Object.prototype.toString.call(value)
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {}
