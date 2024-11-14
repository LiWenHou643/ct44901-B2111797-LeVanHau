const { ObjectId, ReturnDocument } = require('mongodb');

class CartService {
    constructor(client) {
        this.Cart = client.db().collection('giohang');
    }

    async findOne(id) {
        return this.Cart.findOne({ _id: ObjectId(id) });
    }

    async addToCart(id, book) {
        return this.Cart.findOneAndUpdate(
            { _id: ObjectId(id) },
            { $push: { sach: book } },
            {
                returnDocument: 'after',
            }
        );
    }

    async delete(id) {
        return this.Cart.deleteOne({ _id: ObjectId(id) });
    }

    async deleteAll() {
        return this.Cart.deleteMany();
    }
}

module.exports = CartService;
