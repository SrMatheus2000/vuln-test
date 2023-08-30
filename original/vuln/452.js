(node, initialScope) {
        const tag = getStaticValueR(node.tag, initialScope)
        const expressions = getElementValues(
            node.quasi.expressions,
            initialScope
        )

        if (tag != null && expressions != null) {
            const func = tag.value
            const strings = node.quasi.quasis.map(q => q.value.cooked)
            strings.raw = node.quasi.quasis.map(q => q.value.raw)

            return { value: func(strings, ...expressions) }
        }

        return null
    }