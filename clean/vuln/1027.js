function unique_name_564(body, status) {
			// (session is saved automatically when responding)
			req.session.save(function (err) {
				socketIOCallback(body);
			});
		}