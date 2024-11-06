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
        const readers = await this.Reader.find(filter).toArray();
        const result = readers.map((reader) => ({
            madocgia: reader._id,
            holot: reader.holot,
            ten: reader.ten,
            ngaysinh: reader.ngaysinh,
            phai: reader.phai,
            diachi: reader.diachi,
            dienthoai: reader.dienthoai,
        }));

        return result;
    }

    async findByName(name) {
        const filter = {
            ten: { $regex: new RegExp(name, 'i') },
        };

        const readers = await this.Reader.find(filter).toArray();

        const result = readers.map((reader) => ({
            madocgia: reader._id,
            holot: reader.holot,
            ten: reader.ten,
            ngaysinh: reader.ngaysinh,
            phai: reader.phai,
            diachi: reader.diachi,
            dienthoai: reader.dienthoai,
        }));

        return result; // Return the list of books with publisher data
    }

    async findById(id) {
        if (!ObjectId.isValid(id)) {
            throw new Error('Sai định dạng id');
        }

        const reader = await this.Reader.findOne({
            _id: new ObjectId(id),
        });

        if (!reader) {
            throw new Error('Không tìm thấy đọc giả');
        }

        return {
            madocgia: reader._id,
            holot: reader.holot,
            ten: reader.ten,
            ngaysinh: reader.ngaysinh,
            phai: reader.phai,
            diachi: reader.diachi,
            dienthoai: reader.dienthoai,
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
