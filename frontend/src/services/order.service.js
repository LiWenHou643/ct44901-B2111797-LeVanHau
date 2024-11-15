import createApiClient from './api.service';
class OrderService {
    constructor(baseUrl = '/api/tracks') {
        this.api = createApiClient(baseUrl);
    }

    async getOrders(id) {
        return (await this.api.get(`?userId=${id}`)).data;
    }

    async createOrder(id, order) {
        return (await this.api.post('/', { userId: id, order })).data;
    }

    async updateOrder(id, order) {
        return (await this.api.put(`/${id}`, order)).data;
    }
}

export default new OrderService();
