function(path) {
   if( _fs.existsSync(path) ) {
       _fs.readdirSync(path).forEach(function(file,index){
           var curPath = path + "/" + file;
           if(_fs.lstatSync(curPath).isDirectory()) { // recurse
               exports.deleteFolderRecursive(curPath);
           } else { // delete file
               _fs.unlinkSync(curPath);
           }
       });
       _fs.rmdirSync(path);
   }
}