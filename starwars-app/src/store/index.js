import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    apiBaseUrl: 'https://swapi.dev/api', // 'https://swapi.dev/api/'
    categories: [],
    data: {},
  },
  getters: {
    getCategories: state => { return state.categories },
    // getByCategory: state => query => state.categories
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setData(state, data) {
      state.data = data;
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
    },
    async fetchDataByString({ state, commit }, inputValue) {
      try {
        // Array to store promises for each category request
        const requests = state.categories.map(category => {
          return axios.get(`https://swapi.dev/api/${category}?search=${inputValue}`)
            .then(response => ({ category, data: response.data }));
        });

        // Wait for all requests to complete
        const results = await Promise.all(requests);

        // Commit the fetched data for each category
        var newData = {};
        results.forEach(({ category, data }) => {
          if (data.results.length) {
            newData[category] = data.results;
          }
        });

        commit('setData', newData);

        // Return the aggregated result
        return results;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propagate the error
      }
    }

  },
  modules: {
  }
})
