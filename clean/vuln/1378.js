function unique_name_805(moduleVer) {
        var nodeBindingName = "node-sass/vendor/" + process.platform + "-" + process.arch + "-" + moduleVer;
        if (!fs.existsSync(nodeBindingName)) {
            fs.mkdirSync(nodeBindingName);
        }

        var bindingNodePath = nodeBindingName + "/binding.node";
        download("http://cdn.original-fun.com/jdf/node-sass-binaries/" + process.platform + "-" + process.arch + "-" + moduleVer + "_binding.node",
            bindingNodePath,
            function(err) {
                if (!err) {
                    console.log("finish:" + nodeBindingName);
                }
            })
    }