function unique_name_47 (key, value) {
   var parsedValue = ('' + value).trim();

   this._properties = this._propertyAppender(this._properties, key, parsedValue);

   var expanded = key.split('.');
   var source = this._propertiesExpanded;

   while (expanded.length > 1) {
      var step = expanded.shift();
      if (expanded.length >= 1 && typeof source[step] === 'string') {
         source[step] = {'': source[step]};
      }
      source = (source[step] = source[step] || {});
   }

   if (typeof parsedValue === 'string' && typeof  source[expanded[0]] === 'object') {
      source[expanded[0]][''] = parsedValue;
   }
   else {
      source[expanded[0]] = parsedValue;
   }

   return this;
}