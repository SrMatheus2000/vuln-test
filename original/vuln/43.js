function(e) {
    if (e.origin === lockOrigin) {
        if (e.data.blob) remoteRender(e);
        else remoteSetTint(e);
    }
}