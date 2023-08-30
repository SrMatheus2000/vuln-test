function unique_name_350(t){t.MONTH_DAYS=[31,28,31,30,31,30,31,31,30,31,30,31],t.ONE_DAY=864e5,t.MAXYEAR=9999,t.ORDINAL_BASE=new Date(Date.UTC(1970,0,1)),t.PY_WEEKDAYS=[6,0,1,2,3,4,5],t.getYearDay=function(e){var n=new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate());return Math.ceil((n.valueOf()-new Date(e.getUTCFullYear(),0,1).valueOf())/t.ONE_DAY)+1},t.isLeapYear=function(t){return t%4==0&&t%100!=0||t%400==0},t.tzOffset=function(t){return 60*t.getTimezoneOffset()*1e3},t.daysBetween=function(e,n){var r=e.getTime()-t.tzOffset(e)-(n.getTime()-t.tzOffset(n));return Math.round(r/t.ONE_DAY)},t.toOrdinal=function(e){return t.daysBetween(e,t.ORDINAL_BASE)},t.fromOrdinal=function(e){return new Date(t.ORDINAL_BASE.getTime()+e*t.ONE_DAY)},t.getMonthDays=function(e){var n=e.getUTCMonth();return 1===n&&t.isLeapYear(e.getUTCFullYear())?29:t.MONTH_DAYS[n]},t.getWeekday=function(e){return t.PY_WEEKDAYS[e.getUTCDay()]},t.monthRange=function(e,n){var r=new Date(Date.UTC(e,n,1));return[t.getWeekday(r),t.getMonthDays(r)]},t.combine=function(t,e){return e=e||t,new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()))},t.clone=function(t){return new Date(t.getTime())},t.cloneDates=function(e){for(var n=[],r=0;r<e.length;r++)n.push(t.clone(e[r]));return n},t.sort=function(t){t.sort(function(t,e){return t.getTime()-e.getTime()})},t.timeToUntilString=function(t,e){void 0===e&&(e=!0);var n=new Date(t);return[Object(i.h)(n.getUTCFullYear().toString(),4,"0"),Object(i.h)(n.getUTCMonth()+1,2,"0"),Object(i.h)(n.getUTCDate(),2,"0"),"T",Object(i.h)(n.getUTCHours(),2,"0"),Object(i.h)(n.getUTCMinutes(),2,"0"),Object(i.h)(n.getUTCSeconds(),2,"0"),e?"Z":""].join("")},t.untilStringToDate=function(t){var e=/^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/.exec(t);if(!e)throw new Error("Invalid UNTIL value: "+t);return new Date(Date.UTC(parseInt(e[1],10),parseInt(e[2],10)-1,parseInt(e[3],10),parseInt(e[5],10)||0,parseInt(e[6],10)||0,parseInt(e[7],10)||0))};var e=function(){function t(t,e,n,r){this.hour=t,this.minute=e,this.second=n,this.millisecond=r||0}return t.prototype.getHours=function(){return this.hour},t.prototype.getMinutes=function(){return this.minute},t.prototype.getSeconds=function(){return this.second},t.prototype.getMilliseconds=function(){return this.millisecond},t.prototype.getTime=function(){return 1e3*(60*this.hour*60+60*this.minute+this.second)+this.millisecond},t}();t.Time=e;var n=function(e){function n(t,n,r,i,o,a,s){var u=e.call(this,i,o,a,s)||this;return u.year=t,u.month=n,u.day=r,u}return o(n,e),n.prototype.getWeekday=function(){return t.getWeekday(new Date(this.getTime()))},n.prototype.getTime=function(){return new Date(Date.UTC(this.year,this.month-1,this.day,this.hour,this.minute,this.second,this.millisecond)).getTime()},n.prototype.getDay=function(){return this.day},n.prototype.getMonth=function(){return this.month},n.prototype.getYear=function(){return this.year},n.prototype.addYears=function(t){this.year+=t},n.prototype.addMonths=function(t){if(this.month+=t,this.month>12){var e=Math.floor(this.month/12),n=Object(i.i)(this.month,12);this.month=n,this.year+=e,0===this.month&&(this.month=12,--this.year)}},n.prototype.addWeekly=function(t,e){e>this.getWeekday()?this.day+=-(this.getWeekday()+1+(6-e))+7*t:this.day+=-(this.getWeekday()-e)+7*t,this.fixDay()},n.prototype.addDaily=function(t){this.day+=t,this.fixDay()},n.prototype.addHours=function(t,e,n){var r=!1;for(e&&(this.hour+=Math.floor((23-this.hour)/t)*t);;){this.hour+=t;var o=Object(i.a)(this.hour,24),a=o.div,s=o.mod;if(a&&(this.hour=s,this.addDaily(a),r=!0),Object(i.b)(n)||Object(i.c)(n,this.hour))break}return r},n.prototype.addMinutes=function(t,e,n,r){var o=!1;for(e&&(this.minute+=Math.floor((1439-(60*this.hour+this.minute))/t)*t);;){this.minute+=t;var a=Object(i.a)(this.minute,60),s=a.div,u=a.mod;if(s&&(this.minute=u,o=this.addHours(s,!1,n)),(Object(i.b)(n)||Object(i.c)(n,this.hour))&&(Object(i.b)(r)||Object(i.c)(r,this.minute)))break}return o},n.prototype.addSeconds=function(t,e,n,r,o){var a=!1;for(e&&(this.second+=Math.floor((86399-(3600*this.hour+60*this.minute+this.second))/t)*t);;){this.second+=t;var s=Object(i.a)(this.second,60),u=s.div,c=s.mod;if(u&&(this.second=c,a=this.addMinutes(u,!1,n,r)),(Object(i.b)(n)||Object(i.c)(n,this.hour))&&(Object(i.b)(r)||Object(i.c)(r,this.minute))&&(Object(i.b)(o)||Object(i.c)(o,this.second)))break}return a},n.prototype.fixDay=function(){if(!(this.day<=28)){var e=t.monthRange(this.year,this.month-1)[1];if(!(this.day<=e))for(;this.day>e;){if(this.day-=e,++this.month,13===this.month&&(this.month=1,++this.year,this.year>t.MAXYEAR))return;e=t.monthRange(this.year,this.month-1)[1]}}},n}(e);t.DateTime=n}