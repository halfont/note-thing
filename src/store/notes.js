
/* eslint-disable no-new */
import Vue from 'vue'

const notes = {
    namespaced: true,
    state: {
      notes: {},
    },
    mutations: {
      newNote(state, note) {
        let time = Date.now()
        Vue.set(state.notes,time,note);

      },
      delNote(state, date) {
        Vue.delete(state.notes,date);
      },
      editNote(state, note) {
        let t = note.date;
        delete note.date
        Vue.set(state.notes,t,note);
      }
    },
    actions: {
      addNote({commit}, note) {
        commit('newNote', note)
      },
      editNote({commit}, note) {
        commit('editNote', note)
      },
      delNote({commit}, date) {
        commit('delNote', date)
      }
    },
    getters: {
      allNotes: state => state.notes // -> getters['notes/allNotes']
    },
  }

  export default notes