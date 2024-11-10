const { ObjectId } = require('mongodb');

class ReaderService {
    constructor(client) {
        this.Reader = client.db().collection('docgia');
        this.Track = client.db().collection('theodoimuontra');
    }

    extractReaderData(payload) {
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

        const reader = this.extractReaderData(payload);

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

        return result;
    }

    async findByPhone(phone) {
        const filter = {
            dienthoai: { $regex: new RegExp(phone, 'i') },
        };

        console.log(filter);

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

        const phoneNumber = payload.dienthoai;

        const existingReader = await this.Reader.findOne({
            dienthoai: phoneNumber,
        });

        if (existingReader && existingReader._id.toString() !== id) {
            throw new Error(
                `Đã tồn tại đọc giả với số điện thoại ${phoneNumber}`
            );
        }

        const updateReader = this.extractReaderData(payload);
        const updatedReader = await this.Reader.findOneAndUpdate(
            filter,
            {
                $set: updateReader,
            },
            {
                returnDocument: 'after',
            }
        );

        return {
            madocgia: updatedReader._id,
            holot: updatedReader.holot,
            ten: updatedReader.ten,
            ngaysinh: updatedReader.ngaysinh,
            phai: updatedReader.phai,
            diachi: updatedReader.diachi,
            dienthoai: updatedReader.dienthoai,
        };
    }

    async delete(id) {
        const result = await this.Reader.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        await this.Track.deleteMany({
            madocgia: id,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Reader.deleteMany({});
        await this.Track.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ReaderService;
