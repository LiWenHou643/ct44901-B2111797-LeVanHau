const authStore = {
    namespaced: true,
    state: {
        isAuthenticated:
            JSON.parse(localStorage.getItem('isAuthenticated')) || false,
        user: JSON.parse(localStorage.getItem('user')) || null,
        successMessage: '',
    },
    mutations: {
        setSuccessMessage(state, message) {
            state.successMessage = message;
        },
        setAuthentication(state, user) {
            state.isAuthenticated = !!user;
            state.user = user;

            // Persist to localStorage when authentication changes
            if (state.isAuthenticated && user) {
                localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
                localStorage.setItem('isAuthenticated', 'true'); // Mark as authenticated
            } else {
                localStorage.removeItem('user'); // Remove user data from localStorage
                localStorage.removeItem('isAuthenticated'); // Remove authentication flag
            }
        },
    },
    actions: {
        login({ commit }, userData) {
            commit('setAuthentication', userData); // Commit user data after login
        },
        logout({ commit }) {
            commit('setAuthentication', null); // Clear user data on logout
        },
        setSuccessMessage({ commit }, message) {
            commit('setSuccessMessage', message);
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        user: (state) => {
            return state.user;
        },
        successMessage: (state) => state.successMessage,
    },
    plugins: [
        (store) => {
            // Check if there is user data and authentication flag in localStorage
            const savedUser = localStorage.getItem('user');
            const savedAuth = localStorage.getItem('isAuthenticated');

            if (savedUser && savedAuth) {
                console.log('Rehydrating user data from localStorage...'); // Log rehydration to help debug
                try {
                    const parsedUser = JSON.parse(savedUser);
                    store.commit('setAuthentication', parsedUser); // Rehydrate the user state
                } catch (e) {
                    console.error(
                        'Failed to parse user data from localStorage:',
                        e
                    );
                    store.commit('setAuthentication', null); // Handle invalid data (fallback to null)
                }
            } else {
                store.commit('setAuthentication', null); // Ensure state is reset if no user found
            }
        },
    ],
};

export default authStore;
