async function createVerificationObjects(signatureList, literalDataList, keys, date=new Date()) {
  return Promise.all(signatureList.map(async function(signature) {
    return createVerificationObject(signature, literalDataList, keys, date);
  }));
}