function(rootID, transaction, mountDepth) {
    ReactComponent.Mixin.mountComponent.call(
      this,
      rootID,
      transaction,
      mountDepth
    );
    return (
      '<span ' + ReactMount.ATTR_NAME + '="' + rootID + '">' +
        escapeTextForBrowser(this.props.text) +
      '</span>'
    );
  }