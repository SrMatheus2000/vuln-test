function(body, status) {
			// (session is saved automatically when responding)
			req.session.save(function (err) {
				socketIOCallback(body);
			});
		}