// store.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
        successMessage: '',
    },
    mutations: {
        setSuccessMessage(state, message) {
            state.successMessage = message;
        },
    },
    actions: {
        setSuccessMessage({ commit }, message) {
            commit('setSuccessMessage', message);
        },
    },
});

export default store;
