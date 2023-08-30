function unique_name_802(url) {
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

    }