function open(propsData) {
    let slot
    // vnode array
    if (Array.isArray(propsData.message)) {
        slot = propsData.message
        delete propsData.message
    }
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance
    const DialogComponent = vm.extend(Dialog)
    const component = new DialogComponent({
        el: document.createElement('div'),
        propsData
    })
    if (slot) {
        component.$slots.default = slot
    }
    if (!config.defaultProgrammaticPromise) {
        return component
    } else {
        return new Promise((resolve) => {
            component.$on('confirm', (event) => resolve({ result: event || true, dialog: component }))
            component.$on('cancel', () => resolve({ result: false, dialog: component }))
        })
    }
}