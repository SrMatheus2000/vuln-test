function(results, next) {
				postData.user = results.userInfo[0];
				postData.topic = results.topicInfo;

				// Username override for guests, if enabled
				if (parseInt(meta.config.allowGuestHandles, 10) === 1 && parseInt(postData.uid, 10) === 0 && data.handle) {
					postData.user.username = data.handle;
				}

				if (results.settings.followTopicsOnReply) {
					Topics.follow(postData.tid, uid);
				}
				postData.index = results.postIndex - 1;
				postData.favourited = false;
				postData.votes = 0;
				postData.display_moderator_tools = true;
				postData.display_move_tools = true;
				postData.selfPost = false;
				postData.relativeTime = utils.toISOString(postData.timestamp);

				if (parseInt(uid, 10)) {
					Topics.notifyFollowers(postData, uid);
				}

				if (postData.index > 0) {
					plugins.fireHook('action:topic.reply', postData);
				}

				postData.topic.title = validator.escape(postData.topic.title);
				next(null, postData);
			}