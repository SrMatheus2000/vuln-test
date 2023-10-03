function getElementValues(nodeList, initialScope) {
    const valueList = []

    for (let i = 0; i < nodeList.length; ++i) {
        const elementNode = nodeList[i]

        if (elementNode == null) {
            valueList.length = i + 1
        } else if (elementNode.type === "SpreadElement") {
            const argument = getStaticValueR(elementNode.argument, initialScope)
            if (argument == null) {
                return null
            }
            valueList.push(...argument.value)
        } else {
            const element = getStaticValueR(elementNode, initialScope)
            if (element == null) {
                return null
            }
            valueList.push(element.value)
        }
    }

    return valueList
}