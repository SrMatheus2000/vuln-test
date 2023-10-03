(option, index) => {
      return h('option', {
        key: `option_${index}_opt`,
        attrs: { disabled: Boolean(option.disabled) },
        domProps: { innerHTML: option.text, value: option.value }
      })
    }