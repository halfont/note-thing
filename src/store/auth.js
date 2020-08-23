
/* eslint-disable no-new */
import Vue from 'vue'

const auth = {
  namespaced: true,
  state: {
    users: {},
    loggedIn: {}
  },
  mutations: {
    newUser(state, user) {
      Vue.set(state.users, user.email, user);
    },
    // delUser(state, date) {
    //   Vue.delete(state.users, date);
    // },
    // editUser(state, user) {
    //   Vue.set(state.users, user.email, user);
    // },
    loginUser(state, user) {

      let session = new Date();
      session.setMinutes(session.getMinutes() + 30);
      user.sessionExp = session.getTime()
      Vue.set(state.loggedIn, user.sessionExp, user);

    },
    logoutUser(state) {
      let lastExp = Object.keys(state.loggedIn)[0];
      Vue.delete(state.loggedIn, lastExp);
    }
  },
  actions: {
    newUser({ commit }, user) {
      commit('newUser', user)
      commit('logoutUser', user)
      commit('loginUser', user)
    },
    loginUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        if (this.state.auth.users[user.email] && user.password === this.state.auth.users[user.email]['password']) {
          commit('logoutUser', user)
          commit('loginUser', user)
          resolve()
        }
        reject("wrong email/password")
      })
    },
    logoutUser({ commit }, user) {
      commit('logoutUser', user)
    },
    // editUser({ commit }, user) {
    //   commit('editUser', user)
    // },
    // delUser({ commit }, user) {
    //   commit('delUser', user)
    // }
  },
  getters: {
    loggedIn: (state) =>
      Object.keys(state.loggedIn)[0] > new Date() // -> getters['auth/loggedIn']
  },
}

export default auth