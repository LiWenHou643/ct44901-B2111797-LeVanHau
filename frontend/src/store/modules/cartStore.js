// store/cartStore.js
import { createStore } from 'vuex';

const cartStore = createStore({
    state: {
        // Initialize cart state from sessionStorage or an empty array
        cart: JSON.parse(sessionStorage.getItem('cart')) || [],
    },
    mutations: {
        ADD_TO_CART(state, product) {
            state.cart.push(product);
            sessionStorage.setItem('cart', JSON.stringify(state.cart)); // Persist cart in sessionStorage
        },
        REMOVE_FROM_CART(state, productId) {
            state.cart = state.cart.filter((item) => item.id !== productId);
            sessionStorage.setItem('cart', JSON.stringify(state.cart)); // Persist cart in sessionStorage
        },
        CLEAR_CART(state) {
            state.cart = [];
            sessionStorage.removeItem('cart'); // Remove cart from sessionStorage
        },
    },
    actions: {
        addToCart({ commit }, product) {
            commit('ADD_TO_CART', product);
        },
        removeFromCart({ commit }, productId) {
            commit('REMOVE_FROM_CART', productId);
        },
        clearCart({ commit }) {
            commit('CLEAR_CART');
        },
    },
    getters: {
        cart: (state) => state.cart,
        cartTotal: (state) =>
            state.cart
                .reduce((total, item) => total + item.price, 0)
                .toFixed(2),
    },
});

export default cartStore;
