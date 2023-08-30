function(){function t(t,e){void 0===t&&(t={}),void 0===e&&(e=!1),this._string=null,this._cache=e?null:new z,this.origOptions=_(t);var n=function(t){var e=_(t),n=Object.keys(t);if(K.forEach(function(t){Object(i.c)(n,t)&&Object(i.f)(e[t])||(e[t]=P[t])}),Object(i.f)(e.byeaster)&&(e.freq=B.YEARLY),!Object(i.f)(e.freq)||!B.FREQUENCIES[e.freq])throw new Error("Invalid frequency: "+e.freq+" "+t.freq);e.dtstart||(e.dtstart=new Date((new Date).setMilliseconds(0)));var r,o=e.dtstart.getTime()%1e3;if(Object(i.f)(e.wkst)?Object(i.e)(e.wkst)||(e.wkst=e.wkst.weekday):e.wkst=B.MO.weekday,Object(i.f)(e.bysetpos)){Object(i.e)(e.bysetpos)&&(e.bysetpos=[e.bysetpos]);for(var a=0;a<e.bysetpos.length;a++)if(0===(h=e.bysetpos[a])||!(h>=-366&&h<=366))throw new Error("bysetpos must be between 1 and 366, or between -366 and -1")}if(!(Boolean(e.byweekno)||Object(i.g)(e.byweekno)||Object(i.g)(e.byyearday)||Boolean(e.bymonthday)||Object(i.g)(e.bymonthday)||Object(i.f)(e.byweekday)||Object(i.f)(e.byeaster)))switch(e.freq){case B.YEARLY:e.bymonth||(e.bymonth=e.dtstart.getUTCMonth()+1),e.bymonthday=e.dtstart.getUTCDate();break;case B.MONTHLY:e.bymonthday=e.dtstart.getUTCDate();break;case B.WEEKLY:e.byweekday=[s.getWeekday(e.dtstart)]}if(Object(i.f)(e.bymonth)&&!Object(i.d)(e.bymonth)&&(e.bymonth=[e.bymonth]),Object(i.f)(e.byyearday)&&!Object(i.d)(e.byyearday)&&Object(i.e)(e.byyearday)&&(e.byyearday=[e.byyearday]),Object(i.f)(e.bymonthday))if(Object(i.d)(e.bymonthday)){var u=[],c=[];for(a=0;a<e.bymonthday.length;a++){var h;(h=e.bymonthday[a])>0?u.push(h):h<0&&c.push(h)}e.bymonthday=u,e.bynmonthday=c}else e.bymonthday<0?(e.bynmonthday=[e.bymonthday],e.bymonthday=[]):(e.bynmonthday=[],e.bymonthday=[e.bymonthday]);else e.bymonthday=[],e.bynmonthday=[];if(Object(i.f)(e.byweekno)&&!Object(i.d)(e.byweekno)&&(e.byweekno=[e.byweekno]),Object(i.f)(e.byweekday))if(Object(i.e)(e.byweekday))e.byweekday=[e.byweekday],e.bynweekday=null;else if(e.byweekday instanceof U)!e.byweekday.n||e.freq>B.MONTHLY?(e.byweekday=[e.byweekday.weekday],e.bynweekday=null):(e.bynweekday=[[e.byweekday.weekday,e.byweekday.n]],e.byweekday=null);else{var d=[],l=[];for(a=0;a<e.byweekday.length;a++){var y=e.byweekday[a];if(Object(i.e)(y))d.push(y);else{var f=y;!f.n||e.freq>B.MONTHLY?d.push(f.weekday):l.push([f.weekday,f.n])}}e.byweekday=Object(i.g)(d)?d:null,e.bynweekday=Object(i.g)(l)?l:null}else e.bynweekday=null;if(Object(i.f)(e.byhour)?Object(i.e)(e.byhour)&&(e.byhour=[e.byhour]):e.byhour=e.freq<B.HOURLY?[e.dtstart.getUTCHours()]:null,Object(i.f)(e.byminute)?Object(i.e)(e.byminute)&&(e.byminute=[e.byminute]):e.byminute=e.freq<B.MINUTELY?[e.dtstart.getUTCMinutes()]:null,Object(i.f)(e.bysecond)?Object(i.e)(e.bysecond)&&(e.bysecond=[e.bysecond]):e.bysecond=e.freq<B.SECONDLY?[e.dtstart.getUTCSeconds()]:null,e.freq>=B.HOURLY)r=null;else{for(r=[],a=0;a<e.byhour.length;a++)for(var b=e.byhour[a],p=0;p<e.byminute.length;p++)for(var m=e.byminute[p],w=0;w<e.bysecond.length;w++){var v=e.bysecond[w];r.push(new s.Time(b,m,v,o))}s.sort(r)}return{parsedOptions:e,timeset:r}}(t),r=n.parsedOptions,o=n.timeset;this.options=r,this.timeset=o}return t.parseText=function(t,e){return q().parseText(t,e)},t.fromText=function(t,e){return q().fromText(t,e)},t.fromString=function(e){return new t(t.parseString(e)||void 0)},t.prototype._cacheGet=function(t,e){return!!this._cache&&this._cache._cacheGet(t,e)},t.prototype._cacheAdd=function(t,e,n){if(this._cache)return this._cache._cacheAdd(t,e,n)},t.prototype.all=function(t){if(t)return this._iter(new Y("all",{},t));var e=this._cacheGet("all");return!1===e&&(e=this._iter(new D("all",{})),this._cacheAdd("all",e)),e},t.prototype.between=function(t,e,n,r){if(void 0===n&&(n=!1),!s.isValidDate(t)||!s.isValidDate(e))throw new Error("Invalid date passed in to RRule.between");var i={before:e,after:t,inc:n};if(r)return this._iter(new Y("between",i,r));var o=this._cacheGet("between",i);return!1===o&&(o=this._iter(new D("between",i)),this._cacheAdd("between",o,i)),o},t.prototype.before=function(t,e){if(void 0===e&&(e=!1),!s.isValidDate(t))throw new Error("Invalid date passed in to RRule.before");var n={dt:t,inc:e},r=this._cacheGet("before",n);return!1===r&&(r=this._iter(new D("before",n)),this._cacheAdd("before",r,n)),r},t.prototype.after=function(t,e){if(void 0===e&&(e=!1),!s.isValidDate(t))throw new Error("Invalid date passed in to RRule.after");var n={dt:t,inc:e},r=this._cacheGet("after",n);return!1===r&&(r=this._iter(new D("after",n)),this._cacheAdd("after",r,n)),r},t.prototype.count=function(){return this.all().length},t.prototype.toString=function(){return W(this.origOptions)},t.prototype.toText=function(t,e){return q().toText(this,t,e)},t.prototype.isFullyConvertibleToText=function(){return q().isFullyConvertible(this)},t.prototype.clone=function(){return new t(this.origOptions)},t.prototype._iter=function(e){var n,r,o=this.options.dtstart,a=new s.DateTime(o.getUTCFullYear(),o.getUTCMonth()+1,o.getUTCDate(),o.getUTCHours(),o.getUTCMinutes(),o.getUTCSeconds(),o.valueOf()%1e3),u=this.options,c=u.freq,h=u.interval,d=u.wkst,l=u.until,y=u.bymonth,f=u.byweekno,b=u.byyearday,p=u.byweekday,m=u.byeaster,w=u.bymonthday,v=u.bynmonthday,O=u.bysetpos,k=u.byhour,g=u.byminute,E=u.bysecond,j=new T(this);j.rebuild(a.year,a.month);var D,x,Y,S=(n={},n[t.YEARLY]=j.ydayset,n[t.MONTHLY]=j.mdayset,n[t.WEEKLY]=j.wdayset,n[t.DAILY]=j.ddayset,n[t.HOURLY]=j.ddayset,n[t.MINUTELY]=j.ddayset,n[t.SECONDLY]=j.ddayset,n)[c];c<t.HOURLY?D=this.timeset:(x=(r={},r[t.HOURLY]=j.htimeset,r[t.MINUTELY]=j.mtimeset,r[t.SECONDLY]=j.stimeset,r)[c],D=c>=t.HOURLY&&Object(i.g)(k)&&!Object(i.c)(k,a.hour)||c>=t.MINUTELY&&Object(i.g)(g)&&!Object(i.c)(g,a.minute)||c>=t.SECONDLY&&Object(i.g)(E)&&!Object(i.c)(E,a.second)?[]:x.call(j,a.hour,a.minute,a.second,a.millisecond));for(var U,_=this.options.count;;){for(var L=S.call(j,a.year,a.month,a.day),M=L[0],R=L[1],N=L[2],A=!1,C=R;C<N;C++)(A=Z(y,j,Y=M[C],f,p,m,w,v,b))&&(M[Y]=null);if(Object(i.g)(O)&&Object(i.g)(D)){for(var I=void 0,W=void 0,H=[],z=0;z<O.length;z++){(U=O[z])<0?(I=Math.floor(U/D.length),W=Object(i.i)(U,D.length)):(I=Math.floor((U-1)/D.length),W=Object(i.i)(U-1,D.length));for(var q=[],F=R;F<N;F++){var P=M[F];Object(i.f)(P)&&q.push(P)}var K=void 0;K=I<0?q.slice(I)[0]:q[I];var B=D[W],V=s.fromOrdinal(j.yearordinal+K),X=s.combine(V,B);Object(i.c)(H,X)||H.push(X)}s.sort(H);for(z=0;z<H.length;z++){X=H[z];if(l&&X>l)return this.emitResult(e);if(X>=o){var G=this.rezoneIfNeeded(X);if(!e.accept(G))return this.emitResult(e);if(_&&!--_)return this.emitResult(e)}}}else for(z=R;z<N;z++)if(Y=M[z],Object(i.f)(Y)){var J=s.fromOrdinal(j.yearordinal+Y);for(F=0;F<D.length;F++){B=D[F],X=s.combine(J,B);if(l&&X>l)return this.emitResult(e);if(X>=o){G=this.rezoneIfNeeded(X);if(!e.accept(G))return this.emitResult(e);if(_&&!--_)return this.emitResult(e)}}}if(c===t.YEARLY?a.addYears(h):c===t.MONTHLY?a.addMonths(h):c===t.WEEKLY?a.addWeekly(h,d):c===t.DAILY?a.addDaily(h):c===t.HOURLY?(a.addHours(h,A,k),D=x.call(j,a.hour,a.minute,a.second)):c===t.MINUTELY?(a.addMinutes(h,A,k,g)&&(A=!1),D=x.call(j,a.hour,a.minute,a.second)):c===t.SECONDLY&&(a.addSeconds(h,A,k,g,E)&&(A=!1),D=x.call(j,a.hour,a.minute,a.second)),a.year>s.MAXYEAR)return this.emitResult(e);j.rebuild(a.year,a.month)}},t.prototype.emitResult=function(t){return this._len=t.total,t.getValue()},t.prototype.rezoneIfNeeded=function(t){return new I(t,this.options.tzid).rezonedDate()},t.FREQUENCIES=["YEARLY","MONTHLY","WEEKLY","DAILY","HOURLY","MINUTELY","SECONDLY"],t.YEARLY=a.YEARLY,t.MONTHLY=a.MONTHLY,t.WEEKLY=a.WEEKLY,t.DAILY=a.DAILY,t.HOURLY=a.HOURLY,t.MINUTELY=a.MINUTELY,t.SECONDLY=a.SECONDLY,t.MO=F.MO,t.TU=F.TU,t.WE=F.WE,t.TH=F.TH,t.FR=F.FR,t.SA=F.SA,t.SU=F.SU,t.parseString=M,t.optionsToString=W,t}