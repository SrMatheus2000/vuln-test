function unique_name_509(req,res){
		console.log('Serving: %s',req.url);
		var rs = fs.createReadStream(__dirname+req.url,{
			flags: 'r',
			autoClose: true
		});
		rs.on('open',function(){
			rs.pipe(res);
		});
		rs.on('error',function(e){
			res.end(e+'');
		});
	}