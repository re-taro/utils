/**
 * Replace backslash to slash
 *
 * @category String
 */
// eslint-disable-next-line require-unicode-regexp
const slash = (string_: string) => string_.replace(/\\/g, '/')

/**
 * Ensure prefix of a string
 *
 * @category String
 */
const ensurePrefix = (prefix: string, string_: string) => {
  if (!string_.startsWith(prefix)) return prefix + string_
  return string_
}

/**
 * Ensure suffix of a string
 *
 * @category String
 */
const ensureSuffix = (suffix: string, string_: string) => {
  if (!string_.endsWith(suffix)) return string_ + suffix
  return string_
}

/**
 * Dead simple template engine, just like Python's `.format()`
 *
 * @category String
 * @example
 * ```
 * const result = template(
 *   'Hello {0}! My name is {1}.',
 *   'Inès',
 *   'Anthony'
 * ) // Hello Inès! My name is Anthony.
 * ```
 */
// eslint-disable-next-line max-len
// eslint-disable-next-line unicorn/better-regex, prefer-named-capture-group, require-unicode-regexp, @typescript-eslint/no-explicit-any
const template = (string_: string, ...arguments_: any[]): string => string_.replace(/\{(\d+)\}/g, (match, key) => {
  const index = Number(key)
  if (Number.isNaN(index)) {
    return match
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, security/detect-object-injection
  return arguments_[index]
})

/*
 * Port from nanoid
 * https://github.com/ai/nanoid
 */
// eslint-disable-next-line no-secrets/no-secrets
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

/**
 * Generate a random string
 * @category String
 */
const randomString = (size = 16, dict = urlAlphabet) => {
  let id = ''
  let index = size
  const { length } = dict
  // eslint-disable-next-line no-plusplus, max-statements-per-line
  while (index--) { id += dict[Math.trunc(Math.random() * length)] }
  return id
}

export {
  slash,
  ensurePrefix,
  ensureSuffix,
  template,
  randomString
}
