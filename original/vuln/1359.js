function (file) {
    proc =
      childProcess.spawn("raspivid",
                         ["-o", file + ".h264", "-t", "0", "-ih", "-pf", "high", "-ISO", "800",
                           "-ex", "night", "-drc", "high", "-n", "-fps", "30", "-w", `${width}`, "-h",
                           `${height}`, "-r", "90", "-b", "8000000", "-r", hostname]);
    
    proc.title = 'record';
    writeLogs("record");
  }