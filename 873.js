function unique_name_460 (message, title) {
    return ipcRenderer.sendSync('ELECTRON_BROWSER_WINDOW_CONFIRM', message, title)
  }