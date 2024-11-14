const cartStore = {
    namespaced: true,
    state: {
        // Initialize cart state from sessionStorage or an empty array
        cart: JSON.parse(sessionStorage.getItem('cart')) || [],
    },
    mutations: {
        ADD_TO_CART(state, product) {
            const existingProduct = state.cart.find(
                (item) => item._id === product._id
            );

            if (existingProduct) {
                // If the product exists, increment the quantity
                existingProduct.quantity += 1;
            } else {
                // If the product doesn't exist, add a new product to the cart with quantity 1
                state.cart.push({ ...product, quantity: 1 });
            }

            // Persist the updated cart in sessionStorage
            sessionStorage.setItem('cart', JSON.stringify(state.cart));
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
};

export default cartStore;
