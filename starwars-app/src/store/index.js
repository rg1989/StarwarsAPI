import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    apiBaseUrl: 'https://swapi.dev/api', // 'https://swapi.dev/api/'
    categories: [],
  },
  getters: {
    getCategories: state => state.categories
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const response = await axios.get(`https://swapi.dev/api/`);
        commit('setCategories', Object.keys(response.data));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  },
  modules: {
  }
})
