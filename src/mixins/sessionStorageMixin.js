export default {
  methods: {
    updateSessionStorage (storageName, value) {
      if (storageName) {
        sessionStorage.setItem(storageName, JSON.stringify(value))
      }
    },

    getItemFromSessionStorage (storageName) {
      if (storageName) {
        return JSON.parse(sessionStorage.getItem(storageName))
      }
    },

    removeFromSessionStorage (storageName) {
      if (storageName) {
        sessionStorage.removeItem(storageName)
      }
    },

    clearSessionStorage () {
      sessionStorage.clear()
    }
  }
}
