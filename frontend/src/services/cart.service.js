import createApiClient from './api.service';
class CartService {
    constructor(baseUrl = '/api/cart') {
        this.api = createApiClient(baseUrl);
    }
    async getCart(id) {
        return (await this.api.get(`?userId=${id}`)).data;
    }

    async addToCart(id, book) {
        return (await this.api.put('/', { id, book })).data;
    }
}

export default new CartService();
