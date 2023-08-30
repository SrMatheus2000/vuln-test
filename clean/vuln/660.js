function unique_name_341 (name) {
    {
      // for now we ignore sense_version. might add it in the api name later
      let api = require('./' + name);
      result[name] = api.asJson();
    }
  }