import Vue from 'vue'
import Vuex from 'vuex'
import notes from '@/store/notes'
import auth from '@/store/auth'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)


const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    notes: notes,
    auth: auth
  },
})

export default store
