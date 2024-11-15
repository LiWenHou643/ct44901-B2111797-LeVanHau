import orderService from '@/services/order.service';
const orderStore = {
    namespaced: true,
    state: {
        orders: [],
    },
    mutations: {
        setOrders(state, orders) {
            state.orders = orders;
        },
    },
    actions: {
        async fetchOrders({ commit, rootState }) {
            if (rootState.auth.isAuthenticated) {
                try {
                    const userId = rootState.auth.user._id;
                    const response = await orderService.getOrders(userId);
                    commit('setOrders', response);
                } catch (error) {
                    console.error(error);
                }
            }
        },
    },
    getters: {
        orders: (state) => state.orders,
    },
};

export default orderStore;
