(err, product) => {
            if(err){
                console.info(err.stack);
            }
            let imagePath = path.join('/uploads', req.body.directory, file.originalname.replace(/ /g, '_'));

            // if there isn't a product featured image, set this one
            if(!product.productImage){
                db.products.update({_id: common.getId(req.body.productId)}, {$set: {productImage: imagePath}}, {multi: false}, (err, numReplaced) => {
                    if(err){
                        console.info(err.stack);
                    }
                    req.session.message = 'File uploaded successfully';
                    req.session.messageType = 'success';
                    res.redirect('/admin/product/edit/' + req.body.productId);
                });
            }else{
                req.session.message = 'File uploaded successfully';
                req.session.messageType = 'success';
                res.redirect('/admin/product/edit/' + req.body.productId);
            }
        }