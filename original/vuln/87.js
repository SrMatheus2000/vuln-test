function (_, exp) {
            return new(tree.JavaScript)(exp, that.index, true).eval(env).value;
        }