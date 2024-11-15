// cartStore.js
import cartService from '@/services/cart.service';
const cartStore = {
    namespaced: true,
    state: {
        cart: JSON.parse(sessionStorage.getItem('cart')) || [], // initialize cart from sessionStorage
    },
    mutations: {
        ADD_TO_CART(state, { product, quantity }) {
            if (!state.cart || !state.cart.sach) {
                console.log(
                    'Cart not found in sessionStorage. Creating a new cart'
                );
                state.cart = { sach: [] };
            }
            const existingProduct = state.cart?.sach?.find(
                (item) => item.masach === product.masach
            );
            if (existingProduct) {
                existingProduct.soluong += quantity;
            } else {
                state.cart.sach.push({ ...product, soluong: quantity });
            }
            sessionStorage.setItem('cart', JSON.stringify(state.cart)); // persist to sessionStorage
        },
        REMOVE_FROM_CART(state, productId) {
            state.cart = state.cart.filter((item) => item._id !== productId);
            sessionStorage.setItem('cart', JSON.stringify(state.cart)); // persist to sessionStorage
        },
        CLEAR_CART(state) {
            state.cart = [];
            sessionStorage.removeItem('cart'); // clear from sessionStorage
        },
        SET_CART(state, cart) {
            state.cart = cart;
            sessionStorage.setItem('cart', JSON.stringify(cart)); // update sessionStorage after fetching from backend
        },
    },
    actions: {
        // Action to add a book to the cart and sync with the backend if the user is logged in
        async addToCart({ commit, rootState }, { product, quantity }) {
            // Add the item to the cart locally
            commit('ADD_TO_CART', { product, quantity });

            // If the user is logged in, sync the cart with the backend
            if (rootState.auth.isAuthenticated) {
                try {
                    const userId = rootState.auth.user._id; // Get the user ID from the auth store
                    await cartService.addToCart(userId, {
                        ...product,
                        soluong: quantity,
                    }); // Call the API to add the product to the backend cart
                    console.log('Cart synced with the backend');
                } catch (error) {
                    console.error('Failed to sync cart with backend:', error);
                }
            }
        },

        removeFromCart({ commit }, productId) {
            commit('REMOVE_FROM_CART', productId);
        },
        clearCart({ commit }) {
            commit('CLEAR_CART');
        },

        async fetchCart({ commit, rootState }) {
            if (rootState.auth.isAuthenticated) {
                // If logged in, fetch cart from the backend
                try {
                    const cart = await cartService.getCart(
                        rootState.auth.user._id
                    ); // Assuming user.id is stored in auth module
                    commit('SET_CART', cart);

                    return cart;
                } catch (error) {
                    console.error('Failed to fetch cart from server', error);
                    return null;
                }
            } else {
                // If guest, load cart from sessionStorage
                const storedCart =
                    JSON.parse(sessionStorage.getItem('cart')) || [];
                commit('SET_CART', storedCart);
                return storedCart;
            }
        },

        setCart({ commit }, cart) {
            commit('SET_CART', cart);
        },

        async updateCartInDb({ commit, state, rootState }) {
            if (rootState.auth.isAuthenticated && rootState.auth.user) {
                const userId = rootState.auth.user._id;
                const cartData = state.cart;

                try {
                    // Send the updated cart to the backend
                    const carts = await cartService.updateCart(
                        userId,
                        cartData
                    ); // Assuming your cartService has an updateCart method
                    console.log(carts);
                    commit('SET_CART', carts); // Update the cart in the store
                    console.log('Cart successfully updated in the database');
                } catch (error) {
                    console.error(
                        'Failed to update cart in the database:',
                        error
                    );
                }
            }
        },
    },
    getters: {
        cart: (state) => state.cart,
        cartItems: (state) => state.cart.sach || [],
        cartTotal: (state) =>
            state.cart
                .reduce(
                    (total, item) => total + item.price * item.soluongmuon,
                    0
                )
                .toFixed(2),
        cartQuantity: (state) =>
            state.cart?.sach.reduce((total, item) => total + item.soluong, 0) ||
            0,
        cartTypeQuantity: (state) => state.cart?.sach?.length || 0,
    },
};

export default cartStore;
