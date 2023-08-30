function( selector, context, rootjQuery ) {
	var match;

	if ( selector && typeof selector === "string" && !jQuery.isPlainObject( context ) &&
			(match = rquickExpr.exec( selector )) && match[1] ) {
		// This is an HTML string according to the "old" rules; is it still?
		if ( selector.charAt( 0 ) !== "<" ) {
			migrateWarn("$(html) HTML strings must start with '<' character");
		}
		if ( selector.charAt( selector.length -1 ) !== ">" ) {
			migrateWarn("$(html) HTML text after last tag is ignored");
		}
		// Now process using loose rules; let pre-1.8 play too
		if ( context && context.context ) {
			// jQuery object as context; parseHTML expects a DOM object
			context = context.context;
		}
		if ( jQuery.parseHTML ) {
			match = rignoreText.exec( selector );
			return oldInit.call( this, jQuery.parseHTML( match[1] || selector, context, true ),
					context, rootjQuery );
		}
	}
	return oldInit.apply( this, arguments );
}