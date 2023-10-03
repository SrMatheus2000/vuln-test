function getEmail(req, res, next) {
  ldapProvider.validate(req.params.email, function(err, memberInfo) {
    if (err) {
      err.statusCode = 500;
      return next(err);
    }
    return res.end(JSON.stringify(memberInfo));
  });
}