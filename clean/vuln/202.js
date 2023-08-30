function unique_name_104(a,b,c){function d(a,b){if(''==b)return a;var c={op:'_get',path:b};return e(a,c),c.value}function e(a,c,e,f){if(void 0===e&&(e=!1),void 0===f&&(f=!0),e&&('function'==typeof e?e(c,0,a,c.path):g(c,0)),''===c.path){var h={newDocument:a};if('add'===c.op)return h.newDocument=c.value,h;if('replace'===c.op)return h.newDocument=c.value,h.removed=a,h;if('move'===c.op||'copy'===c.op)return h.newDocument=d(a,c.from),'move'===c.op&&(h.removed=a),h;if('test'===c.op){if(h.test=k(a,c.value),!1===h.test)throw new b.JsonPatchError('Test operation failed','TEST_OPERATION_FAILED',0,c,a);return h.newDocument=a,h}if('remove'===c.op)return h.removed=a,h.newDocument=null,h;if('_get'===c.op)return c.value=a,h;if(e)throw new b.JsonPatchError('Operation `op` property is not one of operations defined in RFC-6902','OPERATION_OP_INVALID',0,c,a);else return h}else{f||(a=l._deepClone(a));var i,j,o,p=c.path||'',q=p.split('/'),r=a,s=1,t=q.length;for(o='function'==typeof e?e:g;;){if(j=q[s],e&&void 0==i&&(void 0===r[j]?i=q.slice(0,s).join('/'):s==t-1&&(i=c.path),void 0!==i&&o(c,0,a,i)),s++,Array.isArray(r)){if('-'===j)j=r.length;else if(e&&!l.isInteger(j))throw new b.JsonPatchError('Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index','OPERATION_PATH_ILLEGAL_ARRAY_INDEX',0,c.path,c);else l.isInteger(j)&&(j=~~j);if(s>=t){if(e&&'add'===c.op&&j>r.length)throw new b.JsonPatchError('The specified index MUST NOT be greater than the number of elements in the array','OPERATION_VALUE_OUT_OF_BOUNDS',0,c.path,c);var h=n[c.op].call(c,r,j,a);if(!1===h.test)throw new b.JsonPatchError('Test operation failed','TEST_OPERATION_FAILED',0,c,a);return h}}else if(j&&-1!=j.indexOf('~')&&(j=l.unescapePathComponent(j)),s>=t){var h=m[c.op].call(c,r,j,a);if(!1===h.test)throw new b.JsonPatchError('Test operation failed','TEST_OPERATION_FAILED',0,c,a);return h}r=r[j]}}}function f(a,c,d,f){if(void 0===f&&(f=!0),d&&!Array.isArray(c))throw new b.JsonPatchError('Patch sequence must be an array','SEQUENCE_NOT_AN_ARRAY');f||(a=l._deepClone(a));for(var g=Array(c.length),h=0,i=c.length;h<i;h++)g[h]=e(a,c[h],d),a=g[h].newDocument;return g.newDocument=a,g}function g(a,c,d,e){if('object'!=typeof a||null===a||Array.isArray(a))throw new b.JsonPatchError('Operation is not an object','OPERATION_NOT_AN_OBJECT',c,a,d);else if(!m[a.op])throw new b.JsonPatchError('Operation `op` property is not one of operations defined in RFC-6902','OPERATION_OP_INVALID',c,a,d);else if('string'!=typeof a.path)throw new b.JsonPatchError('Operation `path` property is not a string','OPERATION_PATH_INVALID',c,a,d);else if(0!==a.path.indexOf('/')&&0<a.path.length)throw new b.JsonPatchError('Operation `path` property must start with "/"','OPERATION_PATH_INVALID',c,a,d);else if(('move'===a.op||'copy'===a.op)&&'string'!=typeof a.from)throw new b.JsonPatchError('Operation `from` property is not present (applicable in `move` and `copy` operations)','OPERATION_FROM_REQUIRED',c,a,d);else if(('add'===a.op||'replace'===a.op||'test'===a.op)&&a.value===void 0)throw new b.JsonPatchError('Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)','OPERATION_VALUE_REQUIRED',c,a,d);else if(('add'===a.op||'replace'===a.op||'test'===a.op)&&l.hasUndefined(a.value))throw new b.JsonPatchError('Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)','OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED',c,a,d);else if(d)if('add'==a.op){var f=a.path.split('/').length,g=e.split('/').length;if(f!==g+1&&f!==g)throw new b.JsonPatchError('Cannot perform an `add` operation at the desired path','OPERATION_PATH_CANNOT_ADD',c,a,d)}else if('replace'===a.op||'remove'===a.op||'_get'===a.op){if(a.path!==e)throw new b.JsonPatchError('Cannot perform the operation at a path that does not exist','OPERATION_PATH_UNRESOLVABLE',c,a,d);}else if('move'===a.op||'copy'===a.op){var i={op:'_get',path:a.from,value:void 0},j=h([i],d);if(j&&'OPERATION_PATH_UNRESOLVABLE'===j.name)throw new b.JsonPatchError('Cannot perform the operation from a path that does not exist','OPERATION_FROM_UNRESOLVABLE',c,a,d)}}function h(a,c,d){try{if(!Array.isArray(a))throw new b.JsonPatchError('Patch sequence must be an array','SEQUENCE_NOT_AN_ARRAY');if(c)f(l._deepClone(c),l._deepClone(a),d||!0);else{d=d||g;for(var e=0;e<a.length;e++)d(a[e],e,c,void 0)}}catch(a){if(a instanceof b.JsonPatchError)return a;throw a}}var i={strict:!0},j=c(2),k=function(c,a){return j(c,a,i)},l=c(0);b.JsonPatchError=l.PatchError,b.deepClone=l._deepClone;var m={add:function(a,b,c){return a[b]=this.value,{newDocument:c}},remove:function(a,b,c){var d=a[b];return delete a[b],{newDocument:c,removed:d}},replace:function(a,b,c){var d=a[b];return a[b]=this.value,{newDocument:c,removed:d}},move:function(a,b,c){var f=d(c,this.path);f&&(f=l._deepClone(f));var g=e(c,{op:'remove',path:this.from}).removed;return e(c,{op:'add',path:this.path,value:g}),{newDocument:c,removed:f}},copy:function(a,b,c){var f=d(c,this.from);return e(c,{op:'add',path:this.path,value:l._deepClone(f)}),{newDocument:c}},test:function(a,b,c){return{newDocument:c,test:k(a[b],this.value)}},_get:function(a,b,c){return this.value=a[b],{newDocument:c}}},n={add:function(a,b,c){return l.isInteger(b)?a.splice(b,0,this.value):a[b]=this.value,{newDocument:c,index:b}},remove:function(a,b,c){var d=a.splice(b,1);return{newDocument:c,removed:d[0]}},replace:function(a,b,c){var d=a[b];return a[b]=this.value,{newDocument:c,removed:d}},move:m.move,copy:m.copy,test:m.test,_get:m._get};b.getValueByPointer=d,b.applyOperation=e,b.applyPatch=f,b.applyReducer=function(a,c){var d=e(a,c);if(!1===d.test)throw new b.JsonPatchError('Test operation failed','TEST_OPERATION_FAILED',0,c,a);return d.newDocument},b.validator=g,b.validate=h}