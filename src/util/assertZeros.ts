/**
 * Se o valor for menor que dez, adiciona um zero na frente.
 */
export const assertZeros = (val: any) => {
  if (val < 10) {
    val = `0${val}`
  }
  return val
}