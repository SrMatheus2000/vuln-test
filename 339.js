function unique_name_155(target, source) {
		for (var name in source) {
			var tval = target[name],
  			    sval = source[name];
			if (tval !== sval) {
				if (shouldDeepCopy(sval)) {
					if (Object.prototype.toString.call(sval) === '[object Date]') { // use this date test to handle crossing frame boundaries
						target[name] = new Date(sval);
					} else if (lang.isArray(sval)) {
 						  target[name] = exports.deepCopyArray(sval);
					} else {
						if (tval && typeof tval === 'object') {
							exports.deepCopy(tval, sval);
						} else {
							target[name] = exports.deepCopy({}, sval);
						}
					}
				} else {
					target[name] = sval;
				}
			}
		}
		return target;
	}