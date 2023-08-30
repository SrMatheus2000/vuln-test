function unique_name_538 ( html, isPaste ) {
    var range = this.getSelection();
    var frag = this._doc.createDocumentFragment();
    var div = this.createElement( 'DIV' );
    var startFragmentIndex, endFragmentIndex;
    var root, node, event;

    // Edge doesn't just copy the fragment, but includes the surrounding guff
    // including the full <head> of the page. Need to strip this out. In the
    // future should probably run all pastes through DOMPurify, but this will
    // do for now
    if ( isPaste ) {
        startFragmentIndex = html.indexOf( '<!--StartFragment-->' );
        endFragmentIndex = html.lastIndexOf( '<!--EndFragment-->' );
        if ( startFragmentIndex > -1 && endFragmentIndex > -1 ) {
            html = html.slice( startFragmentIndex + 20, endFragmentIndex );
        }
    }

    // Parse HTML into DOM tree
    div.innerHTML = html;
    frag.appendChild( empty( div ) );

    // Record undo checkpoint
    this.saveUndoState( range );

    try {
        root = this._root;
        node = frag;
        event = {
            fragment: frag,
            preventDefault: function () {
                this.defaultPrevented = true;
            },
            defaultPrevented: false
        };

        addLinks( frag, frag, this );
        cleanTree( frag );
        cleanupBRs( frag, null );
        removeEmptyInlines( frag );
        frag.normalize();

        while ( node = getNextBlock( node, frag ) ) {
            fixCursor( node, null );
        }

        if ( isPaste ) {
            this.fireEvent( 'willPaste', event );
        }

        if ( !event.defaultPrevented ) {
            insertTreeFragmentIntoRange( range, event.fragment, root );
            if ( !canObserveMutations ) {
                this._docWasChanged();
            }
            range.collapse( false );
            this._ensureBottomLine();
        }

        this.setSelection( range );
        this._updatePath( range, true );
    } catch ( error ) {
        this.didError( error );
    }
    return this;
}