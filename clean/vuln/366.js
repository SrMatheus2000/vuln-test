function createMuteOgg(outputFile, options) {
    return new Promise((resolve, reject) => {
        const ch = options.numOfChannels === 1 ? 'mono' : 'stereo';
        child_process_1.exec('ffmpeg -f lavfi -i anullsrc=r=' +
            options.sampleRate +
            ':cl=' +
            ch +
            ' -t ' +
            options.seconds +
            ' -c:a libvorbis ' +
            outputFile, (error, stdout, stderr) => {
            if (error)
                return reject(error);
            resolve(true);
        });
    });
}