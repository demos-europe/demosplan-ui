export default function () {
  return {
    actions: {
      get: jest.fn()
    },
    getters: {
      selectedElementsLength: jest.fn()
    },
    store: new Vuex.Store({
      modules: {
        statement: {
          namespaced: true,
          state: {
            procedureId: '',
            selectedElements: {},
            statements: {}
          },
          actions,
          getters
        }
      }
    })
  }
}
