function unique_name_795 (arg) {
        let cmd = `${this.wmic} path Win32_PerfFormattedData_PerfProc_Process get Name,PercentProcessorTime,IDProcess`;
        if(arg) cmd += ` | findstr /i /c:${this._shellEscape(arg)}`;
        
        let { stdout, stderr } = await exec(cmd).catch(e => { throw e; });
        if(stderr) throw new Error(stderr);
        if(!stdout) return { load: 0, results: [] };
        
        let found = stdout.replace(/[^\S\n]+/g, ':').replace(/:\s/g, '|').split('|')
            .filter(v => !!v)
            .map(v => {
                let [pid, proc, load] = v.split(':');
                return {
                    pid: +pid,
                    process: proc,
                    load: +load
                };
            });

        let load = found.reduce((acc, val) => acc + val.load, 0);

        return { load, found };
    }