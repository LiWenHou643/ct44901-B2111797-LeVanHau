const { ObjectId } = require('mongodb');

class ReaderService {
    constructor(client) {
        this.Reader = client.db().collection('docgia');
    }

    extractBookData(payload) {
        const reader = {
            holot: payload.holot,
            ten: payload.ten,
            ngaysinh: payload.ngaysinh,
            phai: payload.phai,
            diachi: payload.diachi,
            dienthoai: payload.dienthoai,
        };

        Object.keys(reader).forEach(
            (key) => reader[key] === undefined && delete reader[key]
        );

        return reader;
    }

    async create(payload) {
        const phoneNumber = payload.dienthoai;

        const existingReader = await this.Reader.findOne({
            dienthoai: phoneNumber,
        });

        if (existingReader) {
            throw new Error(
                `Đã tồn tại đọc giả với số điện thoại ${phoneNumber}`
            );
        }

        const reader = this.extractBookData(payload);

        const result = await this.Reader.insertOne(reader);

        const insertedReader = await this.Reader.findOne({
            _id: result.insertedId,
        });

        return {
            madocgia: insertedReader._id,
            holot: insertedReader.holot,
            ten: insertedReader.ten,
            ngaysinh: insertedReader.ngaysinh,
            phai: insertedReader.phai,
            diachi: insertedReader.diachi,
            dienthoai: insertedReader.dienthoai,
        };
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

            result.push(res); // Add to the result array
        }

        return result; // Return the combined results
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
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
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

        const updatePublisher = {
            tennxb: payload.nxb.tennxb,
            diachi: payload.nxb.diachi,
        };

        const publisherId = payload.nxb.manxb;
        const updatedPublisher = await this.Publisher.findOneAndUpdate(
            { _id: new ObjectId(publisherId) },
            {
                $set: updatePublisher,
            },
            {
                returnDocument: 'after',
            }
        );

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
}

module.exports = ReaderService;
