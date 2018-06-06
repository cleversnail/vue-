import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
  config: null,
  user: null
};

const actions = {
  getConfig({ commit }, id) {
    const url = `/api/frontend/bargain/activity/${id}`;
    axios.get(url).then((res) => {
      commit('GET_CONFIG', { config: res.data.data });
    });
  },
  getUser({ commit }, id) {
    const url = `/api/frontend/user/userinfo`;
    axios.get(url).then((res) => {
      const user = res.data.data
      if (user.subscribe == 1) {
        window.subscribe = true;
      } else {
        window.subscribe = false;
      }
      commit('GET_USER', { user: user.detail});
    });
  },
}

const mutations = {
  GET_CONFIG(state, data) {
    state.config = data.config;
  },
  GET_USER(state, data) {
    state.user = data.user;
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
