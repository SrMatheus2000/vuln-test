function loopfn(name, dselect, inner, sorter, filter){
		return function(ctxt){
			var a = dselect(ctxt),
				old = ctxt[name],
				temp = { items : a },
				filtered = 0,
				length,
				strs = [],
				buildArg = function(idx, temp, ftr, len){
					//keep the current loop. Tx to Adam Freidin
					var save_pos = ctxt.pos,
						save_item = ctxt.item,
						save_items = ctxt.items;
					ctxt.pos = temp.pos = idx;
					ctxt.item = temp.item = a[ idx ];
					ctxt.items = a;
					//if array, set a length property - filtered items
					if(typeof len !== 'undefined'){ ctxt.length = len; }
					//if filter directive
					if(typeof ftr === 'function' && ftr.call(ctxt.item, ctxt) === false){
						filtered++;
						return;
					}
					strs.push( inner.call(ctxt.item, ctxt ) );
					//restore the current loop
					ctxt.pos = save_pos;
					ctxt.item = save_item;
					ctxt.items = save_items;
				},
				cmv = function(p){
					if( ctxt[ p ] ){
						delete ctxt[ p ];
					}
				},
				prop, i, ii;
			ctxt[name] = temp;
			if( isArray(a) ){
				length = a.length || 0;
				// if sort directive
				if(typeof sorter === 'function'){
					a.sort(function(a, b){
						return sorter.call(ctxt, a, b);
					});
				}
				//loop on array
				for(i = 0, ii = length; i < ii; i++){
					buildArg(i, temp, filter, length - filtered);
				}
			}else{
				if(a && typeof sorter !== 'undefined'){
					error('sort is only available on arrays, not objects');
				}
				//loop on collections
				for( prop in a ){
					if( a.hasOwnProperty( prop ) ){
						buildArg(prop, temp, filter);
					}
				}
			}

			if( typeof old !== 'undefined'){
				ctxt[ name ] = old;
			}else{
				cmv( name );
			}
			return strs.join('');
		};
	}