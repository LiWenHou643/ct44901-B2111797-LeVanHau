const { ObjectId } = require('mongodb');

class ContactService {
    constructor(client) {
        this.Book = client.db().collection('sach');
        this.Publisher = client.db().collection('nhaxuatban');
    }

    extractBookData(payload) {
        const book = {
            tensach: payload.tensach,
            dongia: payload.dongia,
            soquyen: payload.soquyen,
            namxuatban: payload.namxuatban,
            manxb: payload.manxb,
            tacgia: payload.tacgia,
        };

        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );

        return book;
    }

    // Create a new book with a reference to the publisher (manxb)
    async create(payload) {
        const book = this.extractBookData(payload);

        let publisher;

        if (book.manxb) {
            // If the publisher exists (manxb is provided), we query for the publisher
            publisher = await this.Publisher.findOne({ _id: book.manxb });
        } else {
            // If publisher doesn't exist (no manxb), create a new publisher
            publisher = await this.Publisher.findOne({
                tennxb: payload.tennxb,
            }); // Assuming we have the publisher name

            if (!publisher) {
                // Insert the new publisher if it doesn't exist
                const newPublisher = {
                    tennxb: payload.tennxb, // Name of the publisher
                    diachi: payload.diachi, // Publisher address
                };

                const result = await this.Publisher.insertOne(newPublisher);
                publisher = await this.Publisher.findOne({
                    _id: result.insertedId,
                }); // Get the full inserted publisher document
            }

            // Set the new publisher's ObjectId to the book
            book.manxb = publisher._id;
        }

        // Insert the book with the resolved publisher ID
        const result = await this.Book.insertOne(book);

        if (result.insertedId) {
            // Retrieve the full book including publisher info
            const insertedBook = await this.Book.findOne({
                _id: result.insertedId,
            });

            // Add publisher info to the book object
            insertedBook.publisher = publisher;

            return insertedBook; // Return the book with publisher info
        }

        throw new Error('Failed to insert the book');
    }

    async find(filter) {
        // Find books based on the filter
        const books = await this.Book.find(filter).toArray(); // Convert cursor to an array of books

        // Map over each book and fetch the publisher (manxb) information
        const result = [];

        for (const book of books) {
            // Fetch the publisher from the Publisher collection using the manxb (publisher ID)
            const publisher = await this.Publisher.findOne({ _id: book.manxb });

            // Construct the response object with book and publisher data
            const res = {
                _id: book._id,
                tensach: book.tensach,
                dongia: book.dongia,
                soquyen: book.soquyen,
                namxuatban: book.namxuatban,
                tacgia: book.tacgia,
                nxb: publisher, // Include the publisher document
            };

            result.push(res); // Add to the result array
        }

        return result; // Return the combined results
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(new RegExp(name)), $options: 'i' },
        });
    }

    async findById(id) {
        if (!ObjectId.isValid(id)) {
            throw new Error('Sai định dạng id');
        }

        return await this.Book.findOne({
            _id: new ObjectId(id),
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        console.log(id);
        const update = this.extractBookData(payload);
        const result = await this.Book.findOneAndUpdate(
            filter,
            {
                $set: update,
            },
            {
                returnDocument: 'after',
            }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Book.deleteMany({});
        return result.deletedCount;
    }

    async findAllFavorite() {
        return await this.find({ favorite: true });
    }
}

module.exports = ContactService;
