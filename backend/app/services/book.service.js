const { ObjectId } = require('mongodb');

class BookService {
    constructor(client) {
        this.Book = client.db().collection('sach');
        this.Publisher = client.db().collection('nhaxuatban');
        this.Track = client.db().collection('theodoimuonsach');
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

    async create(payload) {
        const book = this.extractBookData(payload);

        let publisher;

        if (book.manxb) {
            publisher = await this.Publisher.findOne({
                _id: new ObjectId(book.manxb),
            });
            book.manxb = new ObjectId(book.manxb); // Convert the string to an ObjectId
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

        const result = await this.Book.insertOne(book);

        // Fetch the full document to ensure references (e.g., publisher) are correct
        const insertedBook = await this.Book.findOne({
            _id: result.insertedId,
        });

        return {
            masach: insertedBook._id,
            tensach: insertedBook.tensach,
            dongia: insertedBook.dongia,
            soquyen: insertedBook.soquyen,
            namxuatban: insertedBook.namxuatban,
            tacgia: insertedBook.tacgia,
            nxb: {
                manxb: publisher._id,
                tennxb: publisher.tennxb,
                diachi: publisher.diachi,
            },
        };

        throw new Error('Lỗi khi thêm mới sách');
    }

    async findPublishers(filter) {
        const publishers = await this.Publisher.find(filter).toArray();

        return publishers.map((publisher) => ({
            manxb: publisher._id,
            tennxb: publisher.tennxb,
            diachi: publisher.diachi,
        }));
    }

    async find(filter = {}, skip = 0, limit = 10) {
        try {
            const pipeline = [
                // Match the filter (if any)
                { $match: filter },

                // Join with the 'nhaxuatban' collection (publisher)
                {
                    $lookup: {
                        from: 'nhaxuatban', // The 'nhaxuatban' collection
                        localField: 'manxb', // The field in 'sach' that references the publisher ID
                        foreignField: '_id', // The field in 'nhaxuatban' that contains the publisher ID
                        as: 'publisher', // The alias for the result of the join
                    },
                },

                // Unwind the 'publisher' array to access the publisher data (since $lookup returns an array)
                {
                    $unwind: {
                        path: '$publisher', // Path to the joined 'publisher' field
                        preserveNullAndEmptyArrays: true, // In case there's no publisher, we keep the book
                    },
                },

                // Project the desired fields
                {
                    $project: {
                        masach: '$_id',
                        tensach: '$tensach',
                        dongia: '$dongia',
                        soquyen: '$soquyen',
                        namxuatban: '$namxuatban',
                        tacgia: '$tacgia',
                        nxb: {
                            manxb: '$publisher._id',
                            tennxb: '$publisher.tennxb',
                            diachi: '$publisher.diachi',
                        },
                    },
                },

                // Pagination - Skip and Limit
                { $skip: skip },
                { $limit: limit },
            ];

            // Execute the aggregation pipeline
            const books = await this.Book.aggregate(pipeline).toArray();

            return books;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw new Error('Error fetching books from the database');
        }
    }

    async count() {
        return this.Book.countDocuments();
    }

    async findByName(name) {
        // Create the filter with a case-insensitive regex for 'name'
        const filter = {
            tensach: { $regex: new RegExp(name, 'i') }, // 'i' makes it case-insensitive
        };

        // Fetch books that match the filter
        const books = await this.Book.find(filter).toArray();

        // For each book, fetch the publisher details (manxb)
        const result = [];

        for (const book of books) {
            // Fetch the publisher using the manxb field
            const publisher = await this.Publisher.findOne({ _id: book.manxb });

            // Combine the book data with the publisher info
            result.push({
                masach: book._id,
                tensach: book.tensach,
                dongia: book.dongia,
                soquyen: book.soquyen,
                namxuatban: book.namxuatban,
                tacgia: book.tacgia,
                nxb: {
                    manxb: publisher._id,
                    tennxb: publisher.tennxb,
                    diachi: publisher.diachi,
                }, // Include the publisher document
            });
        }

        return result; // Return the list of books with publisher data
    }

    async findById(id) {
        // Validate the format of the id
        if (!ObjectId.isValid(id)) {
            throw new Error('Sai định dạng id');
        }

        // Fetch the book by its _id
        const book = await this.Book.findOne({
            _id: new ObjectId(id),
        });

        // If no book is found, return null or throw an error (depending on your use case)
        if (!book) {
            throw new Error('Book not found');
        }

        // Fetch the publisher (nxb) based on the manxb field in the book
        const publisher = await this.Publisher.findOne({ _id: book.manxb });

        // Return the book along with the publisher data
        return {
            masach: book._id,
            tensach: book.tensach,
            dongia: book.dongia,
            soquyen: book.soquyen,
            namxuatban: book.namxuatban,
            tacgia: book.tacgia,
            nxb: {
                manxb: publisher._id,
                tennxb: publisher.tennxb,
                diachi: publisher.diachi,
            }, // Include the publisher document
        };
    }

    async update(id, payload) {
        if (!ObjectId.isValid(id)) {
            throw new Error('Sai định dạng id');
        }

        const filter = {
            _id: new ObjectId(id),
        };

        const updateBook = this.extractBookData(payload);
        const updatedBook = await this.Book.findOneAndUpdate(
            filter,
            {
                $set: updateBook,
            },
            {
                returnDocument: 'after',
            }
        );

        if (updatedBook === null) {
            throw new Error('Không tìm thấy sách');
        }

        const updatePublisher = {
            tennxb: payload.tennxb,
            diachi: payload.diachi,
        };

        const publisherId = updatedBook.manxb;
        const updatedPublisher = await this.Publisher.findOneAndUpdate(
            { _id: new ObjectId(publisherId) },
            {
                $set: updatePublisher,
            },
            {
                returnDocument: 'after',
            }
        );

        if (updatedBook === null || updatedPublisher === null) {
            throw new Error('Không tìm thấy nhà xuất bản');
        }

        return {
            masach: updatedBook._id,
            tensach: updatedBook.tensach,
            dongia: updatedBook.dongia,
            soquyen: updatedBook.soquyen,
            namxuatban: updatedBook.namxuatban,
            tacgia: updatedBook.tacgia,
            nxb: {
                manxb: updatedPublisher._id,
                tennxb: updatedPublisher.tennxb,
                diachi: updatedPublisher.diachi,
            },
        };

        throw new Error('Lỗi khi cập nhật sách');
    }

    async delete(id) {
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        if (result === null) {
            throw new Error('Không tìm thấy sách');
        }

        await this.Track.deleteMany({
            masach: id,
        });

        return result;
    }

    async deleteAll() {
        const result = await this.Book.deleteMany({});
        await this.Track.deleteMany({});

        return result.deletedCount;
    }
}

module.exports = BookService;
