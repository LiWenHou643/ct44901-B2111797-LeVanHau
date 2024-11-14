// store.js
import { createStore } from 'vuex';

const authStore = createStore({
    state: {
        isAuthenticated: false,
        user: null,
        successMessage: '',
    },
    mutations: {
        setSuccessMessage(state, message) {
            state.successMessage = message;
        },
        setAuthentication(state, user) {
            state.isAuthenticated = !!user;
            state.user = user;

            // Persist to localStorage
            if (state.isAuthenticated && user) {
                localStorage.setItem('user', JSON.stringify(user)); // Save user info
                localStorage.setItem('isAuthenticated', true); // Mark user as authenticated
            } else {
                localStorage.removeItem('user'); // Remove user info when logging out
                localStorage.removeItem('isAuthenticated'); // Mark user as not authenticated
            }
        },
    },
    actions: {
        login({ commit }, userData) {
            commit('setAuthentication', userData);
        },
        logout({ commit }) {
            commit('setAuthentication', null);
        },
        setSuccessMessage({ commit }, message) {
            commit('setSuccessMessage', message);
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        user: (state) => state.user,
        successMessage: (state) => state.successMessage,
    },
    // Initialize the state from localStorage
    plugins: [
        (store) => {
            const savedUser = localStorage.getItem('user');
            const savedAuth = localStorage.getItem('isAuthenticated');

            if (savedUser && savedAuth) {
                store.commit('setAuthentication', JSON.parse(savedUser));
            }
        },
    ],
});

export default authStore;
