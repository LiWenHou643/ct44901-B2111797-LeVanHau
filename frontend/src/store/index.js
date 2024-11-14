// store/index.js
import { createStore } from 'vuex';
import auth from './modules/authStore';
import cart from './modules/cartStore';

const store = createStore({
    modules: {
        cart: cart, // Cart module
        auth: auth, // Auth module
    },
});

export default store;
