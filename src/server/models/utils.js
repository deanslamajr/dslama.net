export function verifyResponse (res) {
  if (!Array.isArray(res)) {
    throw new Error('DB response was not the expected type: Array')
  }
  if (!res.length) {
    throw new Error('DB returned an empty array.')
  }
  return res
}
