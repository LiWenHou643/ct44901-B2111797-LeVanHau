// store/index.js
import { createStore } from 'vuex';
import auth from './modules/authStore';
import cart from './modules/cartStore';

const store = createStore({
    modules: {
        cart, // Cart module
        auth, // Auth module
    },
});

export default store;
