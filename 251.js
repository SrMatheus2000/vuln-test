function unique_name_119(dataset) {
			this.timestamp = new Date().getTime()+"_"+process.pid

			// check for multilabel
			_.each(dataset, function(datum, key, list){
				if (_.isArray(datum.output))
					if (datum.output.length > 1)
					{
						console.log("Multi-label is not allowed")
						console.log(JSON.stringify(darum.output, null, 4))
						process.exit(0)
					}
            }, this)

            //  convert all arraay-like outputs to just values
			dataset = _.map(dataset, function(datum){
				if (_.isArray(datum.output))
					datum.output = datum.output[0]
				return datum });

			this.allLabels = _(dataset).map(function(datum){return datum.output});
			this.allLabels = _.uniq(_.flatten(this.allLabels))

			// dataset = _.map(dataset, function(datum){
			// 	datum.output = this.allLabels.indexOf(datum.output)
			// 	return datum });

			if (this.allLabels.length==1) // a single label
				return;
			//console.log(util.inspect(dataset,{depth:1}));
			if (this.debug) console.log("trainBatch start");
			var learnFile = svmcommon.writeDatasetToFile(
					dataset, this.bias, /*binarize=*/false, this.model_file_prefix+"_"+this.timestamp, "SvmLinear", FIRST_FEATURE_NUMBER);
			var modelFile = learnFile.replace(/[.]learn/,".model");

			var command = this.train_command+" "+this.learn_args+" "+learnFile + " "+modelFile;
			console.log("running "+command);

			var result = child_process.execSync(command);
			if (result.code>0) {
				console.dir(result);
				console.log(fs.readFileSync(learnFile, 'utf-8'));
				throw new Error("Failed to execute: "+command);
			}

			this.modelFileString = modelFile;

			if (this.debug) console.log("trainBatch end");
		}