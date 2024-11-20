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

        const insufficientBooks = []; // Mảng lưu trữ các quyển sách không đủ số lượng

        // Lấy danh sách các sách trong order từ cơ sở dữ liệu
        const books = await this.Book.find({
            _id: {
                $in: payload.order.map((book) => new ObjectId(book.masach)),
            },
        }).toArray();

        // Kiểm tra từng quyển sách trong order
        books.forEach((book) => {
            const orderBook = payload.order.find(
                (order) => order.masach === book._id.toString()
            );

            // Kiểm tra xem số lượng sách trong kho có đủ không
            if (book.soquyen < orderBook.soluong) {
                insufficientBooks.push({
                    tensach: book.tensach,
                    soluong: book.soquyen,
                }); // Thêm lỗi vào mảng
            }
        });

        // Nếu có sách thiếu số lượng, ném lỗi với danh sách thông báo
        if (insufficientBooks.length > 0) {
            throw new Error(JSON.stringify(insufficientBooks)); // Chuyển đối tượng thành chuỗi JSON
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

        // Update book available quantity if status is 'Đã trả'
        if (payload.trangthai === 'Đã trả') {
            const borrow = await this.Borrow.findOne(filter);
            const books = await this.Book.find({
                _id: {
                    $in: borrow.sach.map((book) => new ObjectId(book.masach)),
                },
            }).toArray();

            books.forEach((book) => {
                const borrowBook = borrow.sach.find(
                    (borrowBook) => borrowBook.masach === book._id.toString()
                );

                const newQuantity = book.soquyen + borrowBook.soluong;

                this.Book.findOneAndUpdate(
                    {
                        _id: new ObjectId(book._id),
                    },
                    {
                        $set: {
                            soquyen: newQuantity,
                        },
                    }
                );
            });
        } else if (payload.trangthai === 'Đã xác nhận') {
            const borrow = await this.Borrow.findOne(filter);
            const books = await this.Book.find({
                _id: {
                    $in: borrow.sach.map((book) => new ObjectId(book.masach)),
                },
            }).toArray();

            books.forEach((book) => {
                const borrowBook = borrow.sach.find(
                    (borrowBook) => borrowBook.masach === book._id.toString()
                );

                const newQuantity = book.soquyen - borrowBook.soluong;

                this.Book.findOneAndUpdate(
                    {
                        _id: new ObjectId(book._id),
                    },
                    {
                        $set: {
                            soquyen: newQuantity,
                        },
                    }
                );
            });
        }

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
