function(ctxt){
			var data = ctxt.context || ctxt,
				v = ctxt[m[0]],
				i = 0,
				n,
				dm;

			if(v && typeof v.item !== 'undefined'){
				i += 1;
				if(m[i] === 'pos'){
					//allow pos to be kept by string. Tx to Adam Freidin
					return v.pos;
				}
				data = v.item;
			}
			n = m.length;

			while( i < n ){
				if(!data){break;}
				dm = data[ m[i] ];
				//if it is a function call it
				data = typeof dm === 'function' ? dm.call( data ) : dm;
				i++;
			}

			return !data && data !== 0 ? '':data;
		}