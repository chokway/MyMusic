import * as types from '../types'

const state = {
  showListenList: false,
  showPersonal: false,
  showPlay: false,
}

const actions = {
  setShowPersonal({commit}, status) {
    commit(types.COM_SHOW_PERSONAL, status)
  },
  setShowPlay({commit}, status) {
    commit(types.COM_SHOW_PLAY, status)
  },
  setShowListenList({commit}, status) {
    commit(types.COM_SHOW_LISTEN_LIST, status)
  },
}

const getters = {
  showPersonal: state => state.showPersonal,
  showPlay: state => state.showPlay,
  showListenList: state => state.showListenList,
}

const mutations = {
  [types.COM_SHOW_PERSONAL](state, status) {
    state.showPersonal = status
  },
  [types.COM_SHOW_PLAY](state, status) {
    state.showPlay = status
  },
  [types.COM_SHOW_LISTEN_LIST](state, status) {
    state.showListenList = status
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}
