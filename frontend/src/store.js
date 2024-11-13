// store.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
        isAuthenticated: false, // Initialize as false
        user: null, // Initialize user data
        successMessage: '',
    },
    mutations: {
        setSuccessMessage(state, message) {
            state.successMessage = message;
        },
        setAuthentication(state, user) {
            state.isAuthenticated = !!user; // Update authenticated state based on user existence
            state.user = user; // Set user data
        },
    },
    actions: {
        login({ commit }, userData) {
            // Assuming userData is the object received from the login API
            if (userData) {
                commit('setAuthentication', userData); // Commit user data on successful login
                commit('setSuccessMessage', 'Đăng nhập thành công!'); // Set success message
            }
        },
        logout({ commit }) {
            commit('setAuthentication', null); // Clear user data on logout
            commit('setSuccessMessage', 'Đăng xuất thành công!'); // Optional: Set logout success message
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated, // Getter for authentication state
        user: (state) => state.user, // Getter for user information
        successMessage: (state) => state.successMessage, // Getter for success messages
    },
});

export default store;
