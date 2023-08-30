function () {
    if (!data) {
      con.end();
      return;
    }
    if (data === 'stop') {
      con.end();
      server.close();
      return;
    }
    var cwd, args, text;
    if (data.substring(0, 1) === '{') {
      var json = JSON.parse(data);
      cwd = json.cwd;
      args = json.args;
      text = json.text;
    } else {
      var parts = data.split(' ');
      cwd = parts[0];
      args = parts.slice(1);
    }
    try {
      con.write(linter(cwd, args, text));
    } catch (e) {
      con.write(e.toString() + '\n');
    }
    con.end();
  }