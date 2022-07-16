import { createStore } from 'vuex'

const store = createStore({
  state: {
      showDevToolDialog:false,
      loading:true,
  },
  mutations: {
    updateShowDevToolDialog(state, val:boolean) {
        state.showDevToolDialog = val;
    },
  },
  actions: {},
  modules: {},
})

export default store
