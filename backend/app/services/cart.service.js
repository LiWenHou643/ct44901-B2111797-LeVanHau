const { ObjectId, ReturnDocument } = require('mongodb');

class CartService {
    constructor(client) {
        this.Cart = client.db().collection('giohang');
    }

    async findOne(id) {
        return this.Cart.findOne({ _id: new ObjectId(id) });
    }

    async findByUserId(id) {
        return this.Cart.findOne({ madocgia: new ObjectId(id) });
    }

    async addToCart(id, book) {
        const saveBook = {
            ...book,
            masach: new ObjectId(book._id),
            _id: undefined,
            soquyen: undefined,
        };

        Object.keys(saveBook).forEach(
            (key) => saveBook[key] === undefined && delete saveBook[key]
        );

        // Define the query for finding the book in the cart
        const query = {
            madocgia: new ObjectId(id),
            'sach.masach': saveBook.masach,
        };

        // Try to find the cart and check if the book exists
        const cart = await this.Cart.findOne(query);

        if (cart) {
            // Book exists, so increment the quantity
            return this.Cart.findOneAndUpdate(
                query,
                { $inc: { 'sach.$.soluong': saveBook.soluong } }, // Increment quantity for the matched book
                {
                    returnDocument: 'after',
                }
            );
        } else {
            // Book does not exist in the cart, so add it
            saveBook.quantity = 1; // Set initial quantity to 1
            return this.Cart.findOneAndUpdate(
                { madocgia: new ObjectId(id) },
                { $push: { sach: saveBook } },
                {
                    returnDocument: 'after',
                    upsert: true, // Create a new cart if it doesn't exist
                }
            );
        }
    }

    async delete(id) {
        return this.Cart.deleteOne({ _id: new ObjectId(id) });
    }

    async deleteAll() {
        return this.Cart.deleteMany();
    }
}

module.exports = CartService;
