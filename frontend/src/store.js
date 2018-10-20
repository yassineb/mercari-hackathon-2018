import Vue from "vue"
import Vuex from "vuex"
import api from "@/api"

Vue.use(Vuex);
const state = {
  items: [],
	currentLocation: null
}

const actions = {
  async refreshItems({commit}, location) {
		let loc = location || state.currentLocation
    let response = await api.get('/items', {params: location})
    commit('currentLocation', loc)
    commit('refreshItems', response.data)
  }
}

const mutations = {
  refreshItems(state, items) {
    state.items = items
  },
  currentLocation(state, location) {
    state.currentLocation = location
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
});
