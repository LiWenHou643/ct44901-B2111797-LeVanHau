// store/index.js
import { createStore } from 'vuex';
import auth from './modules/authStore';
import cart from './modules/cartStore';
import order from './modules/orderStore';

const store = createStore({
    modules: {
        cart: cart, // Cart module
        auth: auth, // Auth module
        order: order, // Order module
    },
});

export default store;
