function unique_name_373 (txn, res, params) {
  var inputs = [];
  
  Object.keys(params).forEach(function (k) {
    inputs.push(input.replace('{NAME}', k).replace('{VALUE}', entities.encode(params[k])));
   });

  res.setHeader('Content-Type', 'text/html;charset=UTF-8');
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.setHeader('Pragma', 'no-cache');

  return res.end(html.replace('{ACTION}', entities.encode(txn.redirectURI)).replace('{INPUTS}', inputs.join('')));
}