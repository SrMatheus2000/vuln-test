function (str) {
        return new(tree.Anonymous)(str instanceof tree.JavaScript ? str.evaluated : str);
    }