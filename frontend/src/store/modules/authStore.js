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
        async login({ commit, dispatch }, userData) {
            commit('setAuthentication', userData); // Commit user data after login
            await dispatch('syncCart');
        },
        logout({ commit }) {
            commit('setAuthentication', null); // Clear user data on logout
        },
        setSuccessMessage({ commit }, message) {
            commit('setSuccessMessage', message);
        },
        async syncCart({ state, dispatch }) {
            if (state.isAuthenticated && state.user) {
                try {
                    // If there's cart data in sessionStorage, merge it with the backend cart data
                    const sessionBooks =
                        JSON.parse(sessionStorage.getItem('cart'))?.sach || [];

                    // Fetch cart data from the server
                    const cartData = await dispatch('cart/fetchCart', null, {
                        root: true,
                    });

                    // Merge the sessionCart and cartData.sach but remove duplicates
                    const mergedCart = [
                        ...sessionBooks,
                        ...cartData.sach.filter(
                            (item) =>
                                !sessionBooks.some(
                                    (sessionItem) =>
                                        sessionItem.masach === item.masach
                                )
                        ),
                    ];
                    console.log('Merged cart:', mergedCart);
                    // Sync cart data with Vuex store
                    dispatch('cart/setCart', mergedCart, { root: true });

                    // Sync cart data with the backend
                    await dispatch('cart/updateCartInDb', mergedCart, {
                        root: true,
                    });
                } catch (error) {
                    console.error('Failed to sync cart:', error);
                }
            }
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        user: (state) => {
            return state.user;
        },
        successMessage: (state) => state.successMessage,
    },
};

export default authStore;
