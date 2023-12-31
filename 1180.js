function printDirect(parameters){
	var data = parameters
		, printer
		, docname
		, type
		, success
		, error;
	
	if(arguments.length==1){
		//TODO: check parameters type
		//if (typeof parameters )
		data = parameters.data;
		printer = parameters.printer;
		docname = parameters.docname;
		type = parameters.type;
		success = parameters.success;
		error = parameters.error;
	}else{
		printer = arguments[1];
		type = arguments[2];
		docname = arguments[3];
		success = arguments[4];
		error = arguments[5];
	}
	
	if(!success){
		success = function(){};
	}
	
	if(!error){
		error = function(err){
			throw err;
		};
	}
	
	if(!type){
		type = "RAW";
	}
	
	if(!docname){
		docname = "node print job";
	}
	
	//TODO: check parameters type
	if(process.platform=="win32"){// call C++ binding
		if(!printer_helper.printDirect){
			error("Not supported, try to compile this package with MSC");
			return;
		}
		try{
			var res = printer_helper.printDirect(data, printer, docname, type, success, error);
			if(res===true){
				success();
			}else{
				error(Error("Something wrong"));
			}
		}catch (e){
			error(e);
		}
    }else if (!printer_helper.printDirect){// should be POSIX
        var temp_file_name = path.join(os.tmpDir(),"printing");
        fs.writeFileSync(temp_file_name, data);
        child_process.exec('lpr -P'+printer+' -oraw -r'+' '+temp_file_name, function(err, stdout, stderr){
            if (err !== null) {
                error('ERROR: ' + err);
                return;
            }
            if (stderr) {
                error('STD ERROR: ' + stderr);
                return;
            }
            success();
        });
    }else{
		error("Not supported");
	}
}