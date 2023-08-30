function staticUsersAuthorizer(username, password) {
        for(var i in users)
            if(username == i && password == users[i])
                return true

        return false
    }