function unique_name_396(){"use strict";function e(e){if(!("string"==typeof e||e instanceof String))throw new TypeError("This library (validator.js) validates strings only")}function t(t){return e(t),t=Date.parse(t),isNaN(t)?null:new Date(t)}function r(t){return e(t),parseFloat(t)}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function o(e){return"object"===(void 0===e?"undefined":i(e))&&null!==e?e="function"==typeof e.toString?e.toString():"[object Object]":(null==e||isNaN(e)&&!e.length)&&(e=""),String(e)}function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];for(var r in t)void 0===e[r]&&(e[r]=t[r]);return e}function a(t,r){e(t);var o=void 0,n=void 0;"object"===(void 0===r?"undefined":i(r))?(o=r.min||0,n=r.max):(o=arguments[1],n=arguments[2]);var a=encodeURI(t).split(/%..|./).length-1;return a>=o&&(void 0===n||a<=n)}var l={require_tld:!0,allow_underscores:!1,allow_trailing_dot:!1};function s(t,r){e(t),(r=n(r,l)).allow_trailing_dot&&"."===t[t.length-1]&&(t=t.substring(0,t.length-1));var i=t.split(".");if(r.require_tld){var o=i.pop();if(!i.length||!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(o))return!1;if(/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(o))return!1}for(var a,s=0;s<i.length;s++){if(a=i[s],r.allow_underscores&&(a=a.replace(/_/g,"")),!/^[a-z\u00a1-\uffff0-9-]+$/i.test(a))return!1;if(/[\uff01-\uff5e]/.test(a))return!1;if("-"===a[0]||"-"===a[a.length-1])return!1}return!0}var u={allow_display_name:!1,require_display_name:!1,allow_utf8_local_part:!0,require_tld:!0},d=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i,c=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i,f=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i,g=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i,p=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;var h=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,v=/^[0-9A-F]{1,4}$/i;function m(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(e(t),!(r=String(r)))return m(t,4)||m(t,6);if("4"===r)return!!h.test(t)&&t.split(".").sort(function(e,t){return e-t})[3]<=255;if("6"===r){var i=t.split(":"),o=!1,n=m(i[i.length-1],4),a=n?7:8;if(i.length>a)return!1;if("::"===t)return!0;"::"===t.substr(0,2)?(i.shift(),i.shift(),o=!0):"::"===t.substr(t.length-2)&&(i.pop(),i.pop(),o=!0);for(var l=0;l<i.length;++l)if(""===i[l]&&l>0&&l<i.length-1){if(o)return!1;o=!0}else if(n&&l===i.length-1);else if(!v.test(i[l]))return!1;return o?i.length>=1:i.length===a}return!1}var $={protocols:["http","https","ftp"],require_tld:!0,require_protocol:!1,require_host:!0,require_valid_protocol:!0,allow_underscores:!1,allow_trailing_dot:!1,allow_protocol_relative_urls:!1},_=/^\[([^\]]+)\](?::([0-9]+))?$/;function F(e,t){for(var r=0;r<t.length;r++){var i=t[r];if(e===i||(o=i,"[object RegExp]"===Object.prototype.toString.call(o)&&i.test(e)))return!0}var o;return!1}var A=/^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;for(var x,S={"en-US":/^[A-Z]+$/i,"bg-BG":/^[А-Я]+$/i,"cs-CZ":/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,"da-DK":/^[A-ZÆØÅ]+$/i,"de-DE":/^[A-ZÄÖÜß]+$/i,"el-GR":/^[Α-ω]+$/i,"es-ES":/^[A-ZÁÉÍÑÓÚÜ]+$/i,"fr-FR":/^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,"it-IT":/^[A-ZÀÉÈÌÎÓÒÙ]+$/i,"nb-NO":/^[A-ZÆØÅ]+$/i,"nl-NL":/^[A-ZÁÉËÏÓÖÜÚ]+$/i,"nn-NO":/^[A-ZÆØÅ]+$/i,"hu-HU":/^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,"pl-PL":/^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,"pt-PT":/^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,"ru-RU":/^[А-ЯЁ]+$/i,"sk-SK":/^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,"sr-RS@latin":/^[A-ZČĆŽŠĐ]+$/i,"sr-RS":/^[А-ЯЂЈЉЊЋЏ]+$/i,"sv-SE":/^[A-ZÅÄÖ]+$/i,"tr-TR":/^[A-ZÇĞİıÖŞÜ]+$/i,"uk-UA":/^[А-ЩЬЮЯЄIЇҐі]+$/i,ar:/^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/},w={"en-US":/^[0-9A-Z]+$/i,"bg-BG":/^[0-9А-Я]+$/i,"cs-CZ":/^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,"da-DK":/^[0-9A-ZÆØÅ]+$/i,"de-DE":/^[0-9A-ZÄÖÜß]+$/i,"el-GR":/^[0-9Α-ω]+$/i,"es-ES":/^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,"fr-FR":/^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,"it-IT":/^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,"hu-HU":/^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,"nb-NO":/^[0-9A-ZÆØÅ]+$/i,"nl-NL":/^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,"nn-NO":/^[0-9A-ZÆØÅ]+$/i,"pl-PL":/^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,"pt-PT":/^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,"ru-RU":/^[0-9А-ЯЁ]+$/i,"sk-SK":/^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,"sr-RS@latin":/^[0-9A-ZČĆŽŠĐ]+$/i,"sr-RS":/^[0-9А-ЯЂЈЉЊЋЏ]+$/i,"sv-SE":/^[0-9A-ZÅÄÖ]+$/i,"tr-TR":/^[0-9A-ZÇĞİıÖŞÜ]+$/i,"uk-UA":/^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,ar:/^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/},E={"en-US":".",ar:"٫"},Z=["AU","GB","HK","IN","NZ","ZA","ZM"],b=0;b<Z.length;b++)S[x="en-"+Z[b]]=S["en-US"],w[x]=w["en-US"],E[x]=E["en-US"];for(var y,R=["AE","BH","DZ","EG","IQ","JO","KW","LB","LY","MA","QM","QA","SA","SD","SY","TN","YE"],C=0;C<R.length;C++)S[y="ar-"+R[C]]=S.ar,w[y]=w.ar,E[y]=E.ar;for(var D=[],I=["bg-BG","cs-CZ","da-DK","de-DE","el-GR","es-ES","fr-FR","it-IT","hu-HU","nb-NO","nn-NO","nl-NL","pl-Pl","pt-PT","ru-RU","sr-RS@latin","sr-RS","sv-SE","tr-TR","uk-UA"],k=0;k<D.length;k++)E[D[k]]=E["en-US"];for(var B=0;B<I.length;B++)E[I[B]]=",";S["pt-BR"]=S["pt-PT"],w["pt-BR"]=w["pt-PT"],E["pt-BR"]=E["pt-PT"];var O=/^[-+]?[0-9]+$/;var N=/^(?:[-+]?(?:0|[1-9][0-9]*))$/,T=/^[-+]?[0-9]+$/;function P(t,r){e(t);var i=(r=r||{}).hasOwnProperty("allow_leading_zeroes")&&!r.allow_leading_zeroes?N:T,o=!r.hasOwnProperty("min")||t>=r.min,n=!r.hasOwnProperty("max")||t<=r.max,a=!r.hasOwnProperty("lt")||t<r.lt,l=!r.hasOwnProperty("gt")||t>r.gt;return i.test(t)&&o&&n&&a&&l}var M=/^[\x00-\x7F]+$/;var G=/[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;var L=/[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;var U=/[^\x00-\x7F]/;var K=/[\uD800-\uDBFF][\uDC00-\uDFFF]/;var z={force_decimal:!1,decimal_digits:"1,",locale:"en-US"},H=["","-","+"];var j=/^[0-9A-F]+$/i;function q(t){return e(t),j.test(t)}var W=/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;var J=/^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;var V=/^[a-f0-9]{32}$/;var Y={md5:32,md4:32,sha1:40,sha256:64,sha384:96,sha512:128,ripemd128:32,ripemd160:40,tiger128:32,tiger160:40,tiger192:48,crc32:8,crc32b:8};var Q={3:/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,4:/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,5:/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,all:/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i};var X=/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/;var ee=/^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;var te=/^(?:[0-9]{9}X|[0-9]{10})$/,re=/^(?:[0-9]{13})$/,ie=[1,3];var oe="^\\d{4}-?\\d{3}[\\dX]$";var ne={"ar-AE":/^((\+?971)|0)?5[024568]\d{7}$/,"ar-DZ":/^(\+?213|0)(5|6|7)\d{8}$/,"ar-EG":/^((\+?20)|0)?1[012]\d{8}$/,"ar-JO":/^(\+?962|0)?7[789]\d{7}$/,"ar-SA":/^(!?(\+?966)|0)?5\d{8}$/,"ar-SY":/^(!?(\+?963)|0)?9\d{8}$/,"be-BY":/^(\+?375)?(24|25|29|33|44)\d{7}$/,"bg-BG":/^(\+?359|0)?8[789]\d{7}$/,"cs-CZ":/^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,"da-DK":/^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,"de-DE":/^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,"el-GR":/^(\+?30|0)?(69\d{8})$/,"en-AU":/^(\+?61|0)4\d{8}$/,"en-GB":/^(\+?44|0)7\d{9}$/,"en-HK":/^(\+?852\-?)?[456789]\d{3}\-?\d{4}$/,"en-IN":/^(\+?91|0)?[6789]\d{9}$/,"en-KE":/^(\+?254|0)?[7]\d{8}$/,"en-NG":/^(\+?234|0)?[789]\d{9}$/,"en-NZ":/^(\+?64|0)2\d{7,9}$/,"en-PK":/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,"en-RW":/^(\+?250|0)?[7]\d{8}$/,"en-SG":/^(\+65)?[89]\d{7}$/,"en-TZ":/^(\+?255|0)?[67]\d{8}$/,"en-UG":/^(\+?256|0)?[7]\d{8}$/,"en-US":/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,"en-ZA":/^(\+?27|0)\d{9}$/,"en-ZM":/^(\+?26)?09[567]\d{7}$/,"es-ES":/^(\+?34)?(6\d{1}|7[1234])\d{7}$/,"et-EE":/^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,"fa-IR":/^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,"fi-FI":/^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,"fo-FO":/^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,"fr-FR":/^(\+?33|0)[67]\d{8}$/,"he-IL":/^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}/,"hu-HU":/^(\+?36)(20|30|70)\d{7}$/,"id-ID":/^(\+?62|0[1-9])[\s|\d]+$/,"it-IT":/^(\+?39)?\s?3\d{2} ?\d{6,7}$/,"ja-JP":/^(\+?81|0)[789]0[ \-]?[1-9]\d{2}[ \-]?\d{5}$/,"kk-KZ":/^(\+?7|8)?7\d{9}$/,"kl-GL":/^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,"ko-KR":/^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,"lt-LT":/^(\+370|8)\d{8}$/,"ms-MY":/^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,"nb-NO":/^(\+?47)?[49]\d{7}$/,"nl-BE":/^(\+?32|0)4?\d{8}$/,"nn-NO":/^(\+?47)?[49]\d{7}$/,"pl-PL":/^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,"pt-BR":/^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,"pt-PT":/^(\+?351)?9[1236]\d{7}$/,"ro-RO":/^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,"ru-RU":/^(\+?7|8)?9\d{9}$/,"sk-SK":/^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,"sr-RS":/^(\+3816|06)[- \d]{5,9}$/,"th-TH":/^(\+66|66|0)\d{9}$/,"tr-TR":/^(\+?90|0)?5\d{9}$/,"uk-UA":/^(\+?38|8)?0\d{9}$/,"vi-VN":/^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,"zh-CN":/^(\+?0?86\-?)?1[3456789]\d{9}$/,"zh-TW":/^(\+?886\-?|0)?9\d{8}$/};ne["en-CA"]=ne["en-US"],ne["fr-BE"]=ne["nl-BE"],ne["zh-HK"]=ne["en-HK"];var ae={symbol:"$",require_symbol:!1,allow_space_after_symbol:!1,symbol_after_digits:!1,allow_negatives:!0,parens_for_negatives:!1,negative_sign_before_digits:!1,negative_sign_after_digits:!1,allow_negative_sign_placeholder:!1,thousands_separator:",",decimal_separator:".",allow_decimal:!0,require_decimal:!1,digits_after_decimal:[2],allow_space_after_digits:!1};var le=/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;var se=["AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"];var ue=/[^A-Z0-9+\/=]/i;var de=/^[a-z]+\/[a-z0-9\-\+]+$/i,ce=/^[a-z\-]+=[a-z0-9\-]+$/i,fe=/^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;var ge=/^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+]{1,100}$/i,pe=/^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i,he=/^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i;var ve=/^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/,me=/^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/,$e=/^\d{4}$/,_e=/^\d{5}$/,Fe=/^\d{6}$/,Ae={AT:$e,AU:$e,BE:$e,BG:$e,CA:/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,CH:$e,CZ:/^\d{3}\s?\d{2}$/,DE:_e,DK:$e,DZ:_e,ES:_e,FI:_e,FR:/^\d{2}\s?\d{3}$/,GB:/^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,GR:/^\d{3}\s?\d{2}$/,IL:_e,IN:Fe,IS:/^\d{3}$/,IT:_e,JP:/^\d{3}\-\d{4}$/,KE:_e,LI:/^(948[5-9]|949[0-7])$/,MX:_e,NL:/^\d{4}\s?[a-z]{2}$/i,NO:$e,PL:/^\d{2}\-\d{3}$/,PT:/^\d{4}\-\d{3}?$/,RO:Fe,RU:Fe,SA:_e,SE:/^\d{3}\s?\d{2}$/,TW:/^\d{3}(\d{2})?$/,US:/^\d{5}(-\d{4})?$/,ZA:$e,ZM:_e};function xe(t,r){e(t);var i=r?new RegExp("^["+r+"]+","g"):/^\s+/g;return t.replace(i,"")}function Se(t,r){e(t);for(var i=r?new RegExp("["+r+"]"):/\s/,o=t.length-1;o>=0&&i.test(t[o]);)o--;return o<t.length?t.substr(0,o+1):t}function we(t,r){return e(t),t.replace(new RegExp("["+r+"]+","g"),"")}var Ee={all_lowercase:!0,gmail_lowercase:!0,gmail_remove_dots:!0,gmail_remove_subaddress:!0,gmail_convert_googlemaildotcom:!0,outlookdotcom_lowercase:!0,outlookdotcom_remove_subaddress:!0,yahoo_lowercase:!0,yahoo_remove_subaddress:!0,icloud_lowercase:!0,icloud_remove_subaddress:!0},Ze=["icloud.com","me.com"],be=["hotmail.at","hotmail.be","hotmail.ca","hotmail.cl","hotmail.co.il","hotmail.co.nz","hotmail.co.th","hotmail.co.uk","hotmail.com","hotmail.com.ar","hotmail.com.au","hotmail.com.br","hotmail.com.gr","hotmail.com.mx","hotmail.com.pe","hotmail.com.tr","hotmail.com.vn","hotmail.cz","hotmail.de","hotmail.dk","hotmail.es","hotmail.fr","hotmail.hu","hotmail.id","hotmail.ie","hotmail.in","hotmail.it","hotmail.jp","hotmail.kr","hotmail.lv","hotmail.my","hotmail.ph","hotmail.pt","hotmail.sa","hotmail.sg","hotmail.sk","live.be","live.co.uk","live.com","live.com.ar","live.com.mx","live.de","live.es","live.eu","live.fr","live.it","live.nl","msn.com","outlook.at","outlook.be","outlook.cl","outlook.co.il","outlook.co.nz","outlook.co.th","outlook.com","outlook.com.ar","outlook.com.au","outlook.com.br","outlook.com.gr","outlook.com.pe","outlook.com.tr","outlook.com.vn","outlook.cz","outlook.de","outlook.dk","outlook.es","outlook.fr","outlook.hu","outlook.id","outlook.ie","outlook.in","outlook.it","outlook.jp","outlook.kr","outlook.lv","outlook.my","outlook.ph","outlook.pt","outlook.sa","outlook.sg","outlook.sk","passport.com"],ye=["rocketmail.com","yahoo.ca","yahoo.co.uk","yahoo.com","yahoo.de","yahoo.fr","yahoo.in","yahoo.it","ymail.com"];return{version:"9.4.0",toDate:t,toFloat:r,toInt:function(t,r){return e(t),parseInt(t,r||10)},toBoolean:function(t,r){return e(t),r?"1"===t||"true"===t:"0"!==t&&"false"!==t&&""!==t},equals:function(t,r){return e(t),t===r},contains:function(t,r){return e(t),t.indexOf(o(r))>=0},matches:function(t,r,i){return e(t),"[object RegExp]"!==Object.prototype.toString.call(r)&&(r=new RegExp(r,i)),r.test(t)},isEmail:function(t,r){if(e(t),(r=n(r,u)).require_display_name||r.allow_display_name){var i=t.match(d);if(i)t=i[1];else if(r.require_display_name)return!1}var o=t.split("@"),l=o.pop(),h=o.join("@"),v=l.toLowerCase();if("gmail.com"!==v&&"googlemail.com"!==v||(h=h.replace(/\./g,"").toLowerCase()),!a(h,{max:64})||!a(l,{max:254}))return!1;if(!s(l,{require_tld:r.require_tld}))return!1;if('"'===h[0])return h=h.slice(1,h.length-1),r.allow_utf8_local_part?p.test(h):f.test(h);for(var m=r.allow_utf8_local_part?g:c,$=h.split("."),_=0;_<$.length;_++)if(!m.test($[_]))return!1;return!0},isURL:function(t,r){if(e(t),!t||t.length>=2083||/[\s<>]/.test(t))return!1;if(0===t.indexOf("mailto:"))return!1;r=n(r,$);var i=void 0,o=void 0,a=void 0,l=void 0,u=void 0,d=void 0,c=void 0,f=void 0;if((c=(t=(c=(t=(c=t.split("#")).shift()).split("?")).shift()).split("://")).length>1){if(i=c.shift(),r.require_valid_protocol&&-1===r.protocols.indexOf(i))return!1}else{if(r.require_protocol)return!1;r.allow_protocol_relative_urls&&"//"===t.substr(0,2)&&(c[0]=t.substr(2))}if(""===(t=c.join("://")))return!1;if(""===(t=(c=t.split("/")).shift())&&!r.require_host)return!0;if((c=t.split("@")).length>1&&(o=c.shift()).indexOf(":")>=0&&o.split(":").length>2)return!1;d=null,f=null;var g=(l=c.join("@")).match(_);return g?(a="",f=g[1],d=g[2]||null):(a=(c=l.split(":")).shift(),c.length&&(d=c.join(":"))),!(null!==d&&(u=parseInt(d,10),!/^[0-9]+$/.test(d)||u<=0||u>65535)||!(m(a)||s(a,r)||f&&m(f,6))||(a=a||f,r.host_whitelist&&!F(a,r.host_whitelist)||r.host_blacklist&&F(a,r.host_blacklist)))},isMACAddress:function(t){return e(t),A.test(t)},isIP:m,isFQDN:s,isBoolean:function(t){return e(t),["true","false","1","0"].indexOf(t)>=0},isAlpha:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en-US";if(e(t),r in S)return S[r].test(t);throw new Error("Invalid locale '"+r+"'")},isAlphanumeric:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en-US";if(e(t),r in w)return w[r].test(t);throw new Error("Invalid locale '"+r+"'")},isNumeric:function(t){return e(t),O.test(t)},isPort:function(e){return P(e,{min:0,max:65535})},isLowercase:function(t){return e(t),t===t.toLowerCase()},isUppercase:function(t){return e(t),t===t.toUpperCase()},isAscii:function(t){return e(t),M.test(t)},isFullWidth:function(t){return e(t),G.test(t)},isHalfWidth:function(t){return e(t),L.test(t)},isVariableWidth:function(t){return e(t),G.test(t)&&L.test(t)},isMultibyte:function(t){return e(t),U.test(t)},isSurrogatePair:function(t){return e(t),K.test(t)},isInt:P,isFloat:function(t,r){e(t),r=r||{};var i=new RegExp("^(?:[-+])?(?:[0-9]+)?(?:\\"+(r.locale?E[r.locale]:".")+"[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$");return""!==t&&"."!==t&&"-"!==t&&"+"!==t&&i.test(t)&&(!r.hasOwnProperty("min")||t>=r.min)&&(!r.hasOwnProperty("max")||t<=r.max)&&(!r.hasOwnProperty("lt")||t<r.lt)&&(!r.hasOwnProperty("gt")||t>r.gt)},isDecimal:function(t,r){if(e(t),(r=n(r,z)).locale in E)return!H.includes(t.replace(/ /g,""))&&(i=r,new RegExp("^[-+]?([0-9]+)?(\\"+E[i.locale]+"[0-9]{"+i.decimal_digits+"})"+(i.force_decimal?"":"?")+"$")).test(t);var i;throw new Error("Invalid locale '"+r.locale+"'")},isHexadecimal:q,isDivisibleBy:function(t,i){return e(t),r(t)%parseInt(i,10)==0},isHexColor:function(t){return e(t),W.test(t)},isISRC:function(t){return e(t),J.test(t)},isMD5:function(t){return e(t),V.test(t)},isHash:function(t,r){return e(t),new RegExp("^[a-f0-9]{"+Y[r]+"}$").test(t)},isJSON:function(t){e(t);try{var r=JSON.parse(t);return!!r&&"object"===(void 0===r?"undefined":i(r))}catch(e){}return!1},isEmpty:function(t){return e(t),0===t.length},isLength:function(t,r){e(t);var o=void 0,n=void 0;"object"===(void 0===r?"undefined":i(r))?(o=r.min||0,n=r.max):(o=arguments[1],n=arguments[2]);var a=t.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)||[],l=t.length-a.length;return l>=o&&(void 0===n||l<=n)},isByteLength:a,isUUID:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"all";e(t);var i=Q[r];return i&&i.test(t)},isMongoId:function(t){return e(t),q(t)&&24===t.length},isAfter:function(r){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:String(new Date);e(r);var o=t(i),n=t(r);return!!(n&&o&&n>o)},isBefore:function(r){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:String(new Date);e(r);var o=t(i),n=t(r);return!!(n&&o&&n<o)},isIn:function(t,r){e(t);var n=void 0;if("[object Array]"===Object.prototype.toString.call(r)){var a=[];for(n in r)({}).hasOwnProperty.call(r,n)&&(a[n]=o(r[n]));return a.indexOf(t)>=0}return"object"===(void 0===r?"undefined":i(r))?r.hasOwnProperty(t):!(!r||"function"!=typeof r.indexOf)&&r.indexOf(t)>=0},isCreditCard:function(t){e(t);var r=t.replace(/[- ]+/g,"");if(!X.test(r))return!1;for(var i=0,o=void 0,n=void 0,a=void 0,l=r.length-1;l>=0;l--)o=r.substring(l,l+1),n=parseInt(o,10),i+=a&&(n*=2)>=10?n%10+1:n,a=!a;return!(i%10!=0||!r)},isISIN:function(t){if(e(t),!ee.test(t))return!1;for(var r=t.replace(/[A-Z]/g,function(e){return parseInt(e,36)}),i=0,o=void 0,n=void 0,a=!0,l=r.length-2;l>=0;l--)o=r.substring(l,l+1),n=parseInt(o,10),i+=a&&(n*=2)>=10?n+1:n,a=!a;return parseInt(t.substr(t.length-1),10)===(1e4-i)%10},isISBN:function t(r){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(e(r),!(i=String(i)))return t(r,10)||t(r,13);var o=r.replace(/[\s-]+/g,""),n=0,a=void 0;if("10"===i){if(!te.test(o))return!1;for(a=0;a<9;a++)n+=(a+1)*o.charAt(a);if("X"===o.charAt(9)?n+=100:n+=10*o.charAt(9),n%11==0)return!!o}else if("13"===i){if(!re.test(o))return!1;for(a=0;a<12;a++)n+=ie[a%2]*o.charAt(a);if(o.charAt(12)-(10-n%10)%10==0)return!!o}return!1},isISSN:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e(t);var i=oe;if(i=r.require_hyphen?i.replace("?",""):i,!(i=r.case_sensitive?new RegExp(i):new RegExp(i,"i")).test(t))return!1;var o=t.replace("-",""),n=8,a=0,l=!0,s=!1,u=void 0;try{for(var d,c=o[Symbol.iterator]();!(l=(d=c.next()).done);l=!0){var f=d.value;a+=("X"===f.toUpperCase()?10:+f)*n,--n}}catch(e){s=!0,u=e}finally{try{!l&&c.return&&c.return()}finally{if(s)throw u}}return a%11==0},isMobilePhone:function(t,r,i){if(e(t),i&&i.strictMode&&!t.startsWith("+"))return!1;if(r in ne)return ne[r].test(t);if("any"===r){for(var o in ne)if(ne.hasOwnProperty(o)&&ne[o].test(t))return!0;return!1}throw new Error("Invalid locale '"+r+"'")},isPostalCode:function(t,r){if(e(t),r in Ae)return Ae[r].test(t);if("any"===r){for(var i in Ae)if(Ae.hasOwnProperty(i)&&Ae[i].test(t))return!0;return!1}throw new Error("Invalid locale '"+r+"'")},isCurrency:function(t,r){return e(t),function(e){var t="\\d{"+e.digits_after_decimal[0]+"}";e.digits_after_decimal.forEach(function(e,r){0!==r&&(t=t+"|\\d{"+e+"}")});var r="(\\"+e.symbol.replace(/\./g,"\\.")+")"+(e.require_symbol?"":"?"),i="("+["0","[1-9]\\d*","[1-9]\\d{0,2}(\\"+e.thousands_separator+"\\d{3})*"].join("|")+")?",o="(\\"+e.decimal_separator+"("+t+"))"+(e.require_decimal?"":"?"),n=i+(e.allow_decimal||e.require_decimal?o:"");return e.allow_negatives&&!e.parens_for_negatives&&(e.negative_sign_after_digits?n+="-?":e.negative_sign_before_digits&&(n="-?"+n)),e.allow_negative_sign_placeholder?n="( (?!\\-))?"+n:e.allow_space_after_symbol?n=" ?"+n:e.allow_space_after_digits&&(n+="( (?!$))?"),e.symbol_after_digits?n+=r:n=r+n,e.allow_negatives&&(e.parens_for_negatives?n="(\\("+n+"\\)|"+n+")":e.negative_sign_before_digits||e.negative_sign_after_digits||(n="-?"+n)),new RegExp("^(?!-? )(?=.*\\d)"+n+"$")}(r=n(r,ae)).test(t)},isISO8601:function(t){return e(t),le.test(t)},isISO31661Alpha2:function(t){return e(t),se.includes(t.toUpperCase())},isBase64:function(t){e(t);var r=t.length;if(!r||r%4!=0||ue.test(t))return!1;var i=t.indexOf("=");return-1===i||i===r-1||i===r-2&&"="===t[r-1]},isDataURI:function(t){e(t);var r=t.split(",");if(r.length<2)return!1;var i=r.shift().trim().split(";"),o=i.shift();if("data:"!==o.substr(0,5))return!1;var n=o.substr(5);if(""!==n&&!de.test(n))return!1;for(var a=0;a<i.length;a++)if(a===i.length-1&&"base64"===i[a].toLowerCase());else if(!ce.test(i[a]))return!1;for(var l=0;l<r.length;l++)if(!fe.test(r[l]))return!1;return!0},isMimeType:function(t){return e(t),ge.test(t)||pe.test(t)||he.test(t)},isLatLong:function(t){if(e(t),!t.includes(","))return!1;var r=t.split(",");return ve.test(r[0])&&me.test(r[1])},ltrim:xe,rtrim:Se,trim:function(e,t){return Se(xe(e,t),t)},escape:function(t){return e(t),t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\//g,"&#x2F;").replace(/\\/g,"&#x5C;").replace(/`/g,"&#96;")},unescape:function(t){return e(t),t.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x2F;/g,"/").replace(/&#x5C;/g,"\\").replace(/&#96;/g,"`")},stripLow:function(t,r){return e(t),we(t,r?"\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F":"\\x00-\\x1F\\x7F")},whitelist:function(t,r){return e(t),t.replace(new RegExp("[^"+r+"]+","g"),"")},blacklist:we,isWhitelisted:function(t,r){e(t);for(var i=t.length-1;i>=0;i--)if(-1===r.indexOf(t[i]))return!1;return!0},normalizeEmail:function(e,t){t=n(t,Ee);var r=e.split("@"),i=r.pop(),o=[r.join("@"),i];if(o[1]=o[1].toLowerCase(),"gmail.com"===o[1]||"googlemail.com"===o[1]){if(t.gmail_remove_subaddress&&(o[0]=o[0].split("+")[0]),t.gmail_remove_dots&&(o[0]=o[0].replace(/\./g,"")),!o[0].length)return!1;(t.all_lowercase||t.gmail_lowercase)&&(o[0]=o[0].toLowerCase()),o[1]=t.gmail_convert_googlemaildotcom?"gmail.com":o[1]}else if(~Ze.indexOf(o[1])){if(t.icloud_remove_subaddress&&(o[0]=o[0].split("+")[0]),!o[0].length)return!1;(t.all_lowercase||t.icloud_lowercase)&&(o[0]=o[0].toLowerCase())}else if(~be.indexOf(o[1])){if(t.outlookdotcom_remove_subaddress&&(o[0]=o[0].split("+")[0]),!o[0].length)return!1;(t.all_lowercase||t.outlookdotcom_lowercase)&&(o[0]=o[0].toLowerCase())}else if(~ye.indexOf(o[1])){if(t.yahoo_remove_subaddress){var a=o[0].split("-");o[0]=a.length>1?a.slice(0,-1).join("-"):a[0]}if(!o[0].length)return!1;(t.all_lowercase||t.yahoo_lowercase)&&(o[0]=o[0].toLowerCase())}else t.all_lowercase&&(o[0]=o[0].toLowerCase());return o.join("@")},toString:o}}