function adminLogout (request, response, keycloak) {
  let data = '';

  request.on('data', d => {
    data += d.toString();
  });

  request.on('end', function () {
    let parts = data.split('.');
    let payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    if (payload.action === 'LOGOUT') {
      let sessionIDs = payload.adapterSessionIds;
      if (!sessionIDs) {
        keycloak.grantManager.notBefore = payload.notBefore;
        response.send('ok');
        return;
      }
      if (sessionIDs && sessionIDs.length > 0) {
        let seen = 0;
        sessionIDs.forEach(id => {
          keycloak.unstoreGrant(id);
          ++seen;
          if (seen === sessionIDs.length) {
            response.send('ok');
          }
        });
      } else {
        response.send('ok');
      }
    }
  });
}