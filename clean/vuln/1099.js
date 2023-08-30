function unique_name_617 () {
        var downloadUrl = process.env.SAFARIDRIVER_CDNURL ||
          'http://selenium-release.storage.googleapis.com/2.48/SafariDriver.safariextz';
        var fileName = downloadUrl.split('/').pop();
        var downloadedFile = path.join(tmpPath, fileName);
        if (!fs.existsSync(downloadedFile)) {
          console.log('Downloading', downloadUrl);
          return requestBinary(downloadUrl, downloadedFile);
        } else {
          console.log('Download already available at', downloadedFile);
          return downloadedFile;
        }
      }