/**
 * Promise, or maybe not
 */
type Awaitable<T> = T | PromiseLike<T>

/**
 * Null or whatever
 */
type Nullable<T> = T | null | undefined

/**
 * Array, or not yet
 */
type Arrayable<T> = T | Array<T>

/**
 * Function
 */
type Fnc<T = void> = () => T

/**
 * Constructor
 */
type Constructor<T = void> = new (...arguments_: unknown[]) => T

/**
 * Infers the element type of an array
 */
type ElementOf<T> = T extends (infer E)[] ? E : never

/**
 * Defines an intersection type of all union items.
 *
 * @param U Union of any types that will be intersected.
 * @returns U items intersected
 * @see https://stackoverflow.com/a/50375286/9259330
 */
// eslint-disable-next-line max-len
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

/**
 * Infers the arguments type of a function
 */
type ArgumentsType<T> = T extends ((...arguments_: infer A) => unknown) ? A : never

type MergeInsertions<T> =
  T extends object
    ? { [K in keyof T]: MergeInsertions<T[K]> }
    : T

type DeepMerge<F, S> = MergeInsertions<{
  [K in keyof F | keyof S]: K extends keyof S & keyof F
    ? DeepMerge<F[K], S[K]>
    : K extends keyof S
      ? S[K]
      : K extends keyof F
        ? F[K]
        : never;
}>

export type {
  Awaitable,
  Nullable,
  Arrayable,
  Fnc,
  Constructor,
  ElementOf,
  UnionToIntersection,
  ArgumentsType,
  DeepMerge
}
