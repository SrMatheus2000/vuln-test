(node, initialScope) {
        const object = getStaticValueR(node.object, initialScope)
        const property = node.computed
            ? getStaticValueR(node.property, initialScope)
            : { value: node.property.name }

        if (object != null && property != null) {
            return { value: object.value[property.value] }
        }
        return null
    }