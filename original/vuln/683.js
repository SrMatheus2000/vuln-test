function(){function t(t,e){void 0===t&&(t={}),void 0===e&&(e=!1),this._string=null,this._cache=e?null:new V,this.origOptions=L(t);var n=function(t){var e=L(t),n=Object.keys(t);if(q.forEach(function(t){Object(i.c)(n,t)&&Object(i.f)(e[t])||(e[t]=H[t])}),Object(i.f)(e.byeaster)&&(e.freq=P.YEARLY),!Object(i.f)(e.freq)||!P.FREQUENCIES[e.freq])throw new Error("Invalid frequency: "+e.freq+" "+t.freq);e.dtstart||(e.dtstart=new Date((new Date).setMilliseconds(0)));var r,o=e.dtstart.getTime()%1e3;if(Object(i.f)(e.wkst)?Object(i.e)(e.wkst)||(e.wkst=e.wkst.weekday):e.wkst=P.MO.weekday,Object(i.f)(e.bysetpos)){Object(i.e)(e.bysetpos)&&(e.bysetpos=[e.bysetpos]);for(var a=0;a<e.bysetpos.length;a++)if(0===(l=e.bysetpos[a])||!(l>=-366&&l<=366))throw new Error("bysetpos must be between 1 and 366, or between -366 and -1")}if(!(Boolean(e.byweekno)||Object(i.g)(e.byweekno)||Object(i.g)(e.byyearday)||Boolean(e.bymonthday)||Object(i.g)(e.bymonthday)||Object(i.f)(e.byweekday)||Object(i.f)(e.byeaster)))switch(e.freq){case P.YEARLY:e.bymonth||(e.bymonth=e.dtstart.getUTCMonth()+1),e.bymonthday=e.dtstart.getUTCDate();break;case P.MONTHLY:e.bymonthday=e.dtstart.getUTCDate();break;case P.WEEKLY:e.byweekday=[s.getWeekday(e.dtstart)]}if(Object(i.f)(e.bymonth)&&!Object(i.d)(e.bymonth)&&(e.bymonth=[e.bymonth]),Object(i.f)(e.byyearday)&&!Object(i.d)(e.byyearday)&&Object(i.e)(e.byyearday)&&(e.byyearday=[e.byyearday]),Object(i.f)(e.bymonthday))if(Object(i.d)(e.bymonthday)){var u=[],c=[];for(a=0;a<e.bymonthday.length;a++){var l;(l=e.bymonthday[a])>0?u.push(l):l<0&&c.push(l)}e.bymonthday=u,e.bynmonthday=c}else e.bymonthday<0?(e.bynmonthday=[e.bymonthday],e.bymonthday=[]):(e.bynmonthday=[],e.bymonthday=[e.bymonthday]);else e.bymonthday=[],e.bynmonthday=[];if(Object(i.f)(e.byweekno)&&!Object(i.d)(e.byweekno)&&(e.byweekno=[e.byweekno]),Object(i.f)(e.byweekday))if(Object(i.e)(e.byweekday))e.byweekday=[e.byweekday],e.bynweekday=null;else if(e.byweekday instanceof x)!e.byweekday.n||e.freq>P.MONTHLY?(e.byweekday=[e.byweekday.weekday],e.bynweekday=null):(e.bynweekday=[[e.byweekday.weekday,e.byweekday.n]],e.byweekday=null);else{var h=[],f=[];for(a=0;a<e.byweekday.length;a++){var d=e.byweekday[a];if(Object(i.e)(d))h.push(d);else{var y=d;!y.n||e.freq>P.MONTHLY?h.push(y.weekday):f.push([y.weekday,y.n])}}e.byweekday=Object(i.g)(h)?h:null,e.bynweekday=Object(i.g)(f)?f:null}else e.bynweekday=null;if(Object(i.f)(e.byhour)?Object(i.e)(e.byhour)&&(e.byhour=[e.byhour]):e.byhour=e.freq<P.HOURLY?[e.dtstart.getUTCHours()]:null,Object(i.f)(e.byminute)?Object(i.e)(e.byminute)&&(e.byminute=[e.byminute]):e.byminute=e.freq<P.MINUTELY?[e.dtstart.getUTCMinutes()]:null,Object(i.f)(e.bysecond)?Object(i.e)(e.bysecond)&&(e.bysecond=[e.bysecond]):e.bysecond=e.freq<P.SECONDLY?[e.dtstart.getUTCSeconds()]:null,e.freq>=P.HOURLY)r=null;else{for(r=[],a=0;a<e.byhour.length;a++)for(var m=e.byhour[a],p=0;p<e.byminute.length;p++)for(var v=e.byminute[p],b=0;b<e.bysecond.length;b++){var g=e.bysecond[b];r.push(new s.Time(m,v,g,o))}s.sort(r)}return{parsedOptions:e,timeset:r}}(t),r=n.parsedOptions,o=n.timeset;this.options=r,this.timeset=o}return t.parseText=function(t,e){return Z().parseText(t,e)},t.fromText=function(t,e){return Z().fromText(t,e)},t.fromString=function(e){return new t(t.parseString(e)||void 0)},t.prototype._cacheGet=function(t,e){return!!this._cache&&this._cache._cacheGet(t,e)},t.prototype._cacheAdd=function(t,e,n){if(this._cache)return this._cache._cacheAdd(t,e,n)},t.prototype.all=function(t){if(t)return this._iter(new M("all",{},t));var e=this._cacheGet("all");return!1===e&&(e=this._iter(new j("all",{})),this._cacheAdd("all",e)),e},t.prototype.between=function(t,e,n,r){void 0===n&&(n=!1);var i={before:e,after:t,inc:n};if(r)return this._iter(new M("between",i,r));var o=this._cacheGet("between",i);return!1===o&&(o=this._iter(new j("between",i)),this._cacheAdd("between",o,i)),o},t.prototype.before=function(t,e){void 0===e&&(e=!1);var n={dt:t,inc:e},r=this._cacheGet("before",n);return!1===r&&(r=this._iter(new j("before",n)),this._cacheAdd("before",r,n)),r},t.prototype.after=function(t,e){void 0===e&&(e=!1);var n={dt:t,inc:e},r=this._cacheGet("after",n);return!1===r&&(r=this._iter(new j("after",n)),this._cacheAdd("after",r,n)),r},t.prototype.count=function(){return this.all().length},t.prototype.toString=function(){return z(this.origOptions)},t.prototype.toText=function(t,e){return Z().toText(this,t,e)},t.prototype.isFullyConvertibleToText=function(){return Z().isFullyConvertible(this)},t.prototype.clone=function(){return new t(this.origOptions)},t.prototype._iter=function(e){var n,r,o=this.options.dtstart,a=new s.DateTime(o.getUTCFullYear(),o.getUTCMonth()+1,o.getUTCDate(),o.getUTCHours(),o.getUTCMinutes(),o.getUTCSeconds(),o.valueOf()%1e3),u=this.options,c=u.freq,l=u.interval,h=u.wkst,f=u.until,d=u.bymonth,y=u.byweekno,m=u.byyearday,p=u.byweekday,v=u.byeaster,b=u.bymonthday,g=u.bynmonthday,w=u.bysetpos,k=u.byhour,O=u.byminute,T=u.bysecond,S=new E(this);S.rebuild(a.year,a.month);var j,D,M,N=(n={},n[t.YEARLY]=S.ydayset,n[t.MONTHLY]=S.mdayset,n[t.WEEKLY]=S.wdayset,n[t.DAILY]=S.ddayset,n[t.HOURLY]=S.ddayset,n[t.MINUTELY]=S.ddayset,n[t.SECONDLY]=S.ddayset,n)[c];c<t.HOURLY?j=this.timeset:(D=(r={},r[t.HOURLY]=S.htimeset,r[t.MINUTELY]=S.mtimeset,r[t.SECONDLY]=S.stimeset,r)[c],j=c>=t.HOURLY&&Object(i.g)(k)&&!Object(i.c)(k,a.hour)||c>=t.MINUTELY&&Object(i.g)(O)&&!Object(i.c)(O,a.minute)||c>=t.SECONDLY&&Object(i.g)(T)&&!Object(i.c)(T,a.second)?[]:D.call(S,a.hour,a.minute,a.second,a.millisecond));for(var x,L=this.options.count;;){for(var I=N.call(S,a.year,a.month,a.day),_=I[0],A=I[1],U=I[2],C=!1,Y=A;Y<U;Y++)(C=J(d,S,M=_[Y],y,p,v,b,g,m))&&(_[M]=null);if(Object(i.g)(w)&&Object(i.g)(j)){for(var R=void 0,z=void 0,F=[],V=0;V<w.length;V++){(x=w[V])<0?(R=Math.floor(x/j.length),z=Object(i.i)(x,j.length)):(R=Math.floor((x-1)/j.length),z=Object(i.i)(x-1,j.length));for(var Z=[],W=A;W<U;W++){var H=_[W];Object(i.f)(H)&&Z.push(H)}var q=void 0;q=R<0?Z.slice(R)[0]:Z[R];var P=j[z],G=s.fromOrdinal(S.yearordinal+q),B=s.combine(G,P);Object(i.c)(F,B)||F.push(B)}s.sort(F);for(V=0;V<F.length;V++){B=F[V];if(f&&B>f)return this.emitResult(e);if(B>=o){var K=this.rezoneIfNeeded(B);if(!e.accept(K))return this.emitResult(e);if(L&&!--L)return this.emitResult(e)}}}else for(V=A;V<U;V++)if(M=_[V],Object(i.f)(M)){var $=s.fromOrdinal(S.yearordinal+M);for(W=0;W<j.length;W++){P=j[W],B=s.combine($,P);if(f&&B>f)return this.emitResult(e);if(B>=o){K=this.rezoneIfNeeded(B);if(!e.accept(K))return this.emitResult(e);if(L&&!--L)return this.emitResult(e)}}}if(c===t.YEARLY?a.addYears(l):c===t.MONTHLY?a.addMonths(l):c===t.WEEKLY?a.addWeekly(l,h):c===t.DAILY?a.addDaily(l):c===t.HOURLY?(a.addHours(l,C,k),j=D.call(S,a.hour,a.minute,a.second)):c===t.MINUTELY?(a.addMinutes(l,C,k,O)&&(C=!1),j=D.call(S,a.hour,a.minute,a.second)):c===t.SECONDLY&&(a.addSeconds(l,C,k,O,T)&&(C=!1),j=D.call(S,a.hour,a.minute,a.second)),a.year>s.MAXYEAR)return this.emitResult(e);S.rebuild(a.year,a.month)}},t.prototype.emitResult=function(t){return this._len=t.total,t.getValue()},t.prototype.rezoneIfNeeded=function(t){return new R(t,this.options.tzid).rezonedDate()},t.FREQUENCIES=["YEARLY","MONTHLY","WEEKLY","DAILY","HOURLY","MINUTELY","SECONDLY"],t.YEARLY=a.YEARLY,t.MONTHLY=a.MONTHLY,t.WEEKLY=a.WEEKLY,t.DAILY=a.DAILY,t.HOURLY=a.HOURLY,t.MINUTELY=a.MINUTELY,t.SECONDLY=a.SECONDLY,t.MO=W.MO,t.TU=W.TU,t.WE=W.WE,t.TH=W.TH,t.FR=W.FR,t.SA=W.SA,t.SU=W.SU,t.parseString=_,t.optionsToString=z,t}