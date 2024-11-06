const { ObjectId } = require('mongodb');

class TrackService {
    constructor(client) {
        this.Borrow = client.db().collection('theodoimuonsach');
        this.Reader = client.db().collection('docgia');
        this.Book = client.db().collection('sach');
    }

    extractborrowData(payload) {
        const borrow = {
            madocgia: payload.madocgia,
            masach: payload.masach,
            msnv: payload.msnv,
            ngaymuon: payload.ngaymuon,
            ngaytra: payload.ngaytra,
        };

        Object.keys(borrow).forEach(
            (key) => borrow[key] === undefined && delete borrow[key]
        );

        return borrow;
    }

    async create(payload) {
        // Check if reader exists
        const reader = await this.Reader.findOne({
            _id: new ObjectId(payload.madocgia),
        });

        if (!reader) {
            throw new Error('Mã độc giả không tồn tại');
        }

        // Check if book exists
        const book = await this.Book.findOne({
            _id: new ObjectId(payload.masach),
        });

        if (!book) {
            throw new Error('Mã sách không tồn tại');
        }

        // Check if book is borrowed
        const borrowed = await this.Borrow.findOne({
            masach: payload.masach,
            madocgia: payload.madocgia,
            ngaymuon: payload.ngaymuon,
        });

        if (borrowed) {
            throw new Error(
                `Đọc giả ${reader.ten} đã mượn sách ${book.tensach} vào ngày ${payload.ngaymuon}`
            );
        }

        const borrow = this.extractborrowData(payload);

        const result = await this.Borrow.insertOne(borrow);

        const insertedborrow = await this.Borrow.findOne({
            _id: result.insertedId,
        });

        return {
            madocgia: insertedborrow.madocgia,
            masach: insertedborrow.masach,
            msnv: insertedborrow.msnv,
            ngaymuon: insertedborrow.ngaymuon,
            ngaytra: insertedborrow.ngaytra,
        };
    }

    async find(filter) {
        console.log(filter);
        const borrows = await this.Borrow.find(filter).toArray();
        console.log(borrows);
        const result = borrows.map((borrow) => ({
            _id: borrow._id,
            madocgia: borrow.madocgia,
            masach: borrow.masach,
            msnv: borrow.msnv,
            ngaymuon: borrow.ngaymuon,
            ngaytra: borrow.ngaytra,
        }));

        return result;
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const updateBorrow = this.extractborrowData(payload);
        const updatedBorrow = await this.Borrow.findOneAndUpdate(
            filter,
            {
                $set: updateBorrow,
            },
            {
                returnDocument: 'after',
            }
        );

        return {
            _id: updatedBorrow._id,
            madocgia: updatedBorrow.madocgia,
            masach: updatedBorrow.masach,
            msnv: updatedBorrow.msnv,
            ngaymuon: updatedBorrow.ngaymuon,
            ngaytra: updatedBorrow.ngaytra,
        };
    }

    async delete(id) {
        const result = await this.Borrow.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Borrow.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = TrackService;
