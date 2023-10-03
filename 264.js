async function requireModule (path) {
  const f = await resolve(path)
  return require(f)
}