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
        } else if (book.soquyen === 0) {
            throw new Error('Sách đã hết');
        }

        // Check if book is borrowed
        const borrowed = await this.Borrow.findOne({
            masach: new ObjectId(payload.masach),
            madocgia: new ObjectId(payload.madocgia),
            ngaymuon: payload.ngaymuon,
            ngaytra: payload.ngaytra,
        });

        if (borrowed) {
            throw new Error(
                `Đọc giả ${reader.ten} đã mượn sách ${book.tensach} vào ngày ${payload.ngaymuon}`
            );
        }

        const borrow = this.extractborrowData(payload);

        const result = await this.Borrow.insertOne({
            ...borrow,
            masach: new ObjectId(borrow.masach),
            madocgia: new ObjectId(borrow.madocgia),
            msnv: new ObjectId(borrow.msnv),
        });

        const updatedBook = await this.Book.findOneAndUpdate(
            { _id: new ObjectId(borrow.masach) },
            {
                $inc: { soquyen: -1 },
            },
            {
                returnDocument: 'after',
            }
        );

        console.log(updatedBook);

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
        const borrows = await this.Borrow.aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: 'sach',
                    localField: 'masach',
                    foreignField: '_id',
                    as: 'bookDetails',
                },
            },
            {
                $lookup: {
                    from: 'docgia',
                    localField: 'madocgia',
                    foreignField: '_id',
                    as: 'readerDetails',
                },
            },
            {
                $lookup: {
                    from: 'nhanvien',
                    localField: 'msnv',
                    foreignField: '_id',
                    as: 'staffDetails',
                },
            },
            {
                $project: {
                    _id: 1,
                    madocgia: 1,
                    hotendocgia: {
                        $concat: [
                            { $arrayElemAt: ['$readerDetails.holot', 0] },
                            ' ',
                            { $arrayElemAt: ['$readerDetails.ten', 0] },
                        ],
                    },
                    masach: 1,
                    tensach: { $arrayElemAt: ['$bookDetails.tensach', 0] },
                    msnv: 1,
                    hotennhanvien: {
                        $arrayElemAt: ['$staffDetails.hotennv', 0],
                    },
                    ngaymuon: 1,
                    ngaytra: 1,
                },
            },
        ]).toArray();

        return borrows;
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

        return {};
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
