import { flattenArrayable } from './array'

const clamp = (number_: number, min: number, max: number) => Math.min(max, Math.max(min, number_))

// eslint-disable-next-line id-length
const sum = (...arguments_: number[] | number[][]) => flattenArrayable(arguments_).reduce((a, b) => a + b, 0)

export {
  clamp,
  sum
}
