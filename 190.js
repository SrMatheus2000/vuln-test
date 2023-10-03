function unique_name_96 (params) {
        let parent
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        const defaultParam = {
            position: config.defaultToastPosition || 'is-top'
        }
        if (params.parent) {
            parent = params.parent
            delete params.parent
        }
        let slot
        if (Array.isArray(params.message)) {
            slot = params.message
            delete params.message
        }
        const propsData = merge(defaultParam, params)

        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance
        const ToastComponent = vm.extend(Toast)
        const instance = new ToastComponent({
            parent,
            el: document.createElement('div'),
            propsData
        })
        if (slot) {
            instance.$slots.default = slot
        }
        return instance
    }