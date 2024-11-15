const { ObjectId, ReturnDocument } = require('mongodb');

class CartService {
    constructor(client) {
        this.Cart = client.db().collection('giohang');
    }

    async findOne(id) {
        return this.Cart.findOne({ _id: new ObjectId(id) });
    }

    async findByUserId(id) {
        const cart = await this.Cart.findOne({ madocgia: new ObjectId(id) });
        return cart ? cart : { madocgia: new ObjectId(id), sach: [] };
    }

    async addToCart(id, book) {
        const saveBook = {
            ...book,
            masach: new ObjectId(book.masach),
            soquyen: undefined,
        };
        console.log(saveBook);

        Object.keys(saveBook).forEach(
            (key) => saveBook[key] === undefined && delete saveBook[key]
        );

        // Define the query for finding the book in the cart
        const query = {
            madocgia: new ObjectId(id),
        };

        // Try to find the cart and check if the book exists
        const cart = await this.Cart.findOne(query);

        if (cart) {
            const existingBook = cart.sach.find(
                (item) => item.masach.equals(saveBook.masach) // Use .equals() for ObjectId comparison
            );

            console.log(existingBook); // Log to see if the book is found in the cart

            if (existingBook) {
                existingBook.soluong += saveBook.soluong;
            } else {
                cart.sach.push(saveBook);
            }

            // Update the cart in the database
            await this.Cart.findOneAndUpdate(
                query,
                { $set: { sach: cart.sach } },
                { returnDocument: ReturnDocument.AFTER }
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
