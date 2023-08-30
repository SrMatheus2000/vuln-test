function (n) {
  if (n === '.') return 1
  return Buffer.byteLength(n.replace(/^\.|\.$/gm, '')) + 2
}