function(user) {
			
			if (req.query.from) {
				res.redirect(req.query.from);
			} else if ('string' == typeof keystone.get('signin redirect')) {
				res.redirect(keystone.get('signin redirect'));
			} else if ('function' == typeof keystone.get('signin redirect')) {
				keystone.get('signin redirect')(user, req, res);
			} else {
				res.redirect('/keystone');
			}
			
		}