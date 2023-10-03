function installMixin (Vue, vueVersion) {
  Vue.mixin({
    ...vueVersion === '1' ? {
      init: initProvider,
    } : {},

    ...vueVersion === '2' ? {
      data () {
        return {
          '$apolloData': {
            queries: {},
            loading: 0,
            data: this.$_apolloInitData,
          },
        }
      },

      beforeCreate () {
        initProvider.call(this)
        proxyData.call(this)
      },

      serverPrefetch () {
        if (this.$_apolloPromises) {
          return Promise.all(this.$_apolloPromises)
        }
      },
    } : {},

    created: launch,

    destroyed: destroy,
  })
}