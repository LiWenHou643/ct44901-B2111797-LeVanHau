import createApiClient from './api.service';
class BookService {
    constructor(
        baseUrl = 'https://d113-2402-800-6343-da28-8d1c-ed72-8492-7fa3.ngrok-free.app'
    ) {
        this.api = createApiClient(baseUrl);
    }
    async getAll({ page = 1, limit = 12, search = '' }) {
        try {
            const response = await this.api.get('/api/books', {
                params: { page, limit, search },
            });
            console.log('Fetched books:', response);
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error; // Optionally handle or re-throw the error
        }
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
