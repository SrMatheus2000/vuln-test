function unique_name_17(e) {
    if (e.origin === lockOrigin) {
        if (e.data.blob) remoteRender(e);
        else remoteSetTint(e);
    }
}