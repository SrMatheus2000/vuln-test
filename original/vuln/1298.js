function (req, res, next) {
    var sessionId = req.params.sid;

    var Visualization = models.Visualization;
    var vt;

    if(req.is('json')) {
        models.VisualizationType.find({
            where: {
                name: req.body.type
            }
        }).then(function(vizType) {
            if(!vizType) {
                throw new Error('Unknown Viztype');
            }
            vt = vizType;
            return Visualization.create({
                data: req.body.data,
                opts: req.body.options,
                description: req.body.description,
                SessionId: sessionId,
                VisualizationTypeId: vizType.id
            });
        }).then(function(viz) {
            var jsonViz = viz.toJSON();
            jsonViz.visualizationType = _.pick(vt.toJSON(), 'name', 'moduleName', 'initialDataFields', 'isStreaming', 'id');
            req.io.of(viz.getSessionSocketNamespace())
                .emit('viz', jsonViz);
            return res.json(jsonViz);
        }).catch(function(err) {
            if(err.message && err.message === 'Unknown Viztype') {
                return res.status(404).send('Could not find viz type ' + req.body.type);
            }
            return next(err);
        });
    } else {
        var form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {

            _.each(files, function(f) {
                thumbnailAndUpload(f, sessionId, function(err, data) {

                    if(err) {
                        debug('error in thumbnailAndUpload');
                        return res.status(500).send('error creating image thumbnail');
                    }
                    var imgData = data.imgData;
                    var type = 'image';
                    if(fields.type) {
                        if(_.isArray(fields.type) || _.isObject(fields.type)) {
                            type = fields.type[0];
                        } else {
                            type = fields.type;
                        }
                    }

                    models.VisualizationType.find({
                        where: {
                            name: type
                        }
                    }).then(function(vizType) {
                        if(!vizType) {
                            throw new Error('Unknown Viztype');
                        }
                        vt = vizType;
                        return Visualization.create({
                            images: [imgData],
                            opts: JSON.parse(fields.options || '{}'),
                            SessionId: sessionId,
                            description: req.body.description,
                            VisualizationTypeId: vizType.id
                        });
                    }).then(function(viz) {
                        var jsonViz = viz.toJSON();
                        jsonViz.visualizationType = vt;
                        req.io.of(viz.getSessionSocketNamespace())
                            .emit('viz', jsonViz);
                        return res.json(jsonViz);
                    }).catch(function(err) {
                        if(err.message && err.message === 'Unknown Viztype') {
                            return res.status(404).send('Could not find viz type ' + type);
                        }
                        return next(err);
                    });
                });
            });
        });
    }
}