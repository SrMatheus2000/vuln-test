function unique_name_804() {

  it('executes a google search for "webdriver" with phantomjs using the installed binaries', function(done) {
    var server = new seleniumRemote.SeleniumServer(webdrvr.selenium.path, {
      args: webdrvr.args
    });

    var onError = function(err) {
      console.log('An error occurred ' + err);
      server.stop();
      done();
    };

    server.start(60000).then(function(url) {
      var driver = new seleniumWebdriver.Builder()
        .usingServer(url)
        .withCapabilities(seleniumWebdriver.Capabilities.phantomjs())
        .build();

      driver.get('http://www.google.de');
      var searchBox = driver.findElement(seleniumWebdriver.By.name('q'));
      searchBox.sendKeys('webdriver');
      searchBox.getAttribute('value').then(function(value) {
        expect(value).toBe('webdriver');
        driver.quit().then(function() {
          server.stop();
          done();
        });
      });

    }, onError);
  }, 60000);

}