function ( event ) {
				var data = event.data;

				// Make sure we're dealing with JSON
				if( typeof data === 'string' && data.charAt( 0 ) === '{' && data.charAt( data.length - 1 ) === '}' ) {
					data = JSON.parse( data );

					// Check if the requested method can be found
					if( data.method && typeof Reveal[data.method] === 'function' ) {
						var result = Reveal[data.method].apply( Reveal, data.args );

						// Dispatch a postMessage event with the returned value from
						// our method invocation for getter functions
						dispatchPostMessage( 'callback', { method: data.method, result: result } );
					}
				}
			}