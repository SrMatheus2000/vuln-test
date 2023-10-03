function unique_name_505(api, connection, next){
		var fileName = "";
		if((connection.params.fileName == null || typeof connection.params.fileName == "undefined") && connection.req != null){
			var parsedURL = api.url.parse(connection.req.url);
			var parts = parsedURL.pathname.split("/");
			
			parts.shift();
			if (connection.directModeAccess == true){ parts.shift(); }
			if (connection.requestMode == "api"){ parts.shift(); }
			
			for (var i in parts){
				if (fileName != ""){ fileName += "/"; }
				fileName += parts[i];
			}
		}else if(connection.req == null){
			// socket connection
			api.utils.requiredParamChecker(api, connection, ["fileName"]);
			if(connection.error === null){ fileName = connection.params.fileName; }
		}else{
			fileName = connection.params.fileName;
		}
		if(connection.error === null){
			fileName = api.configData.general.flatFileDirectory + fileName;
			api.fileServer.followFileToServe(api, fileName, connection, next);
		}
	}