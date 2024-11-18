const { ObjectId } = require('mongodb');

class TrackService {
    constructor(client) {
        this.Borrow = client.db().collection('theodoimuonsach');
        this.Reader = client.db().collection('docgia');
        this.Book = client.db().collection('sach');
        this.Cart = client.db().collection('giohang');
    }

    extractborrowData(payload) {
        const borrow = {
            madocgia: payload.madocgia,
            masach: payload.masach,
            trangthai: payload.trangthai,
            nvduyet: payload.nvduyet,
            nvnhan: payload.nvnhan,
            nvtra: payload.nvtra,
            henmuon: payload.henmuon,
            hentra: payload.hentra,
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
            _id: new ObjectId(payload.userId),
        });

        if (!reader) {
            throw new Error('Mã độc giả không tồn tại');
        }

        // Check if book quantity is enough
        const books = await this.Book.find({
            _id: {
                $in: payload.order.map((book) => new ObjectId(book.masach)),
            },
        }).toArray();

        if (books.length < payload.order.length) {
            throw new Error('Số lượng sách không đủ');
        }

        const fees = payload.order.reduce((acc, cur) => {
            return acc + cur.dongia * cur.soluong;
        }, 0);

        const result = await this.Borrow.insertOne({
            madocgia: new ObjectId(payload.userId),
            sach: payload.order,
            phimuon: fees,
            trangthai: 'Chờ xác nhận',
            ngayyeucau: new Date(),
        });
        const insertedBorrow = await this.Borrow.findOne({
            _id: result.insertedId,
        });

        if (insertedBorrow) {
            await this.Cart.findOneAndUpdate(
                {
                    madocgia: new ObjectId(payload.userId),
                },
                {
                    $set: {
                        sach: [],
                    },
                },
                {
                    returnDocument: 'after',
                }
            );
        }

        return insertedBorrow;
    }

    async find(filter) {
        const borrows = await this.Borrow.find(filter).toArray();
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

        return updatedBorrow;
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
