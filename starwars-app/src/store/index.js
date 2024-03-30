import { createStore } from 'vuex';
import axios from 'axios';
import { BASE_URL, routeNames } from '../config/config.js';

export default createStore({
  state: {
    apiBaseUrl: BASE_URL,
    categories: [],
    data: {},
    people: [],
  },
  getters: {
    getCategories: state => { return state.categories },
    getPeople: state => { return state.people },
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setData(state, data) {
      state.data = data;
    },
    setPeople(state, people) {
      state.people = people;
    },
  },
  actions: {
    async fetchPeople({ commit }) {
      try {
        const response = await axios.get(`${BASE_URL}/${routeNames.PEOPLE}/`);
        commit('setPeople', response.data);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    },
    async fetchCategories({ commit }) {
      try {
        const response = await axios.get(BASE_URL);
        commit('setCategories', Object.keys(response.data));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchDataByString({ state, commit }, inputValue) {
      try {
        const requests = state.categories.map(category => {
          return axios.get(`${BASE_URL}/${category}?search=${inputValue}`)
            .then(response => ({ category, data: response.data }));
        });

        const results = await Promise.all(requests);

        var newData = {};
        results.forEach(({ category, data }) => {
          if (data.results.length) {
            newData[category] = data.results;
          }
        });

        commit('setData', newData);

        return results;
      } catch (error) {
        console.error('Error searching for data:', error);
        throw error;
      }
    }

  },
  modules: {
  }
})
