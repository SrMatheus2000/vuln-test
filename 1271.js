(input, start, duration, output) => {
    return new Promise(function(resolve, reject) {
      if (fs.existsSync(input)) {
        exec(
          `ffmpeg -hide_banner -loglevel quiet -ss ${start} -i ${input} -t ${duration} -c copy -y ${output}.mp4`,
          (error, stdout, stderr) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(`${output}.mp4`);
          }
        );
      } else {
        reject(new Error("ffmpegdotjs could not find file"));
      }
    });
  }