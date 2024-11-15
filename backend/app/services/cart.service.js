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
            masach: book.masach,
            soquyen: undefined,
        };

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
            const existingBook = cart.sach.find((item) => {
                return item.masach === saveBook.masach; // Use strict equality for string comparison
            });

            if (existingBook) {
                existingBook.soluong += saveBook.soluong;
            } else {
                cart.sach.push(saveBook);
            }

            // Update the cart in the database
            await this.Cart.findOneAndUpdate(
                query,
                { $set: { sach: cart.sach } },
                {
                    returnDocument: ReturnDocument.AFTER,
                }
            );
        } else {
            // Create a new cart if it doesn't exist
            await this.Cart.insertOne({
                madocgia: new ObjectId(id),
                sach: [saveBook],
            });
        }
    }

    async updateCart(id, books) {
        const query = {
            madocgia: new ObjectId(id),
        };

        const cart = await this.Cart.findOneAndUpdate(
            query,
            { $set: { sach: books } },
            { returnDocument: 'after' }
        );

        return cart;
    }

    async removeFromCart(userId, book) {
        const query = {
            madocgia: new ObjectId(userId),
        };

        const cart = await this.Cart.findOne(query);

        console.log(cart);

        if (cart) {
            cart.sach = cart.sach.filter((item) => item.masach !== book.masach);

            console.log(cart.sach.length);

            return await this.Cart.findOneAndUpdate(
                query,
                { $set: { sach: cart.sach } },
                {
                    returnDocument: ReturnDocument.AFTER,
                }
            );
        }
    }

    async clearCart(id) {
        return await this.Cart.findOneAndUpdate(
            { madocgia: new ObjectId(id) },
            { $set: { sach: [] } }
        );
    }
}

module.exports = CartService;
