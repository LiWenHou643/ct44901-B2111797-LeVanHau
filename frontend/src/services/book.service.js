import createApiClient from './api.service';
class BookService {
    constructor(baseUrl = '/api/books') {
        this.api = createApiClient(baseUrl);
    }
    async getAll({ page = 1, limit = 12, search = '' }) {
        const response = await this.api.get('/', {
            params: { page, limit, search }, // Passing pagination params to the backend
        });
        return response.data; // Return the response data containing books and pagination info
    }
    async create(data) {
        return (await this.api.post('/', data)).data;
    }
    async deleteAll() {
        return (await this.api.delete('/')).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getBookByTitle(title) {
        return (await this.api.get(`?title=${title}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async deleteAll() {
        return (await this.api.delete('/')).data;
    }
}
export default new BookService();
