function unique_name_465(password, scramble) {
  if (!password) {
    return new Buffer(0);
  }

  // password must be in binary format, not utf8
  var stage1 = sha1((new Buffer(password, 'utf8')).toString('binary'));
  var stage2 = sha1(stage1);
  var stage3 = sha1(scramble.toString('binary') + stage2);
  return xor(stage3, stage1);
}