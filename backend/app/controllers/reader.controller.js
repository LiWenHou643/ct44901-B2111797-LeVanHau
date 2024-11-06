const ApiError = require('../api-error.js');
const MongoDB = require('../utils/mongodb.util.js');
const ReaderService = require('../services/reader.service.js');

exports.create = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi thêm mới đọc giả'
            )
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const readerService = new ReaderService(MongoDB.client);
        const { name } = req.query;
        if (name) documents = await readerService.findByName(name);
        else documents = await readerService.find({});
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi lấy danh sách đọc giả'
            )
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy đọc giả'));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message ||
                    `Có lỗi xảy ra khi lấy dữ liệu bằng id: ${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Dữ liệu không được để trống'));
    }

    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy đọc giả'));
        }
        return res.send({
            message: 'Cập nhật đọc giả thành công',
            reader: document,
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message ||
                    `Có lỗi khi cập nhật đọc giả có id: ${req.params.id}`
            )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy đọc giả'));
        }
        return res.send({ message: 'Xóa thành công' });
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message ||
                    `Có lỗi khi xóa đọc giả có id: ${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const deletedCount = await readerService.deleteAll();
        return res.send({
            message: `${deletedCount} đọc giả được xóa thành công`,
        });
    } catch (error) {
        return next(
            new ApiError(500, error.message || 'Có lỗi khi xóa tất cả dữ liệu')
        );
    }
};
