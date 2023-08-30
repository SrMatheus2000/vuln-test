function(item) {
        var path   = item.path
          , index  = path.lastIndexOf('/')
          , name   = path.substring(index + 1)
          , folder = folders[path.substring(0, index)]
          , url    = '/' + repo.username + '/' + repo.reponame + '/' + item.type + '/' + repo.branch + '/' + path

        folder.push(item)
        item.text   = name
        item.icon   = item.type
        if (item.type === 'tree') {
          folders[item.path] = item.children = []
          item.a_attr = { href: '#' }
        }
        else if (item.type === 'blob') {
          item.a_attr = { href: url }
        }
      }