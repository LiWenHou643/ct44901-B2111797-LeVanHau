const ApiError = require('../api-error.js');
const MongoDB = require('../utils/mongodb.util.js');
const BookService = require('../services/book.service.js');

exports.create = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi thêm mới sách'
            )
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const bookService = new BookService(MongoDB.client);
        const { name } = req.query;
        if (name) documents = await bookService.findByName(name);
        else documents = await bookService.find({});
    } catch (error) {
        return next(
            new ApiError(500, error.message || 'Có lỗi xảy ra khi lấy sách')
        );
    }

    return res.send(documents);
};

exports.findAllPublishers = async (req, res, next) => {
    let documents = [];
    try {
        const bookService = new BookService(MongoDB.client);
        documents = await bookService.findPublishers({});
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi lấy nhà xuất bản'
            )
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy sách'));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message ||
                    `Có lỗi xảy ra khi lấy sách bằng id: ${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Dữ liệu không được để trống'));
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy sách'));
        }
        return res.send({
            message: 'Cập nhật sách thành công',
            book: document,
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message ||
                    `Có lỗi khi cập nhật sách có id: ${req.params.id}`
            )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy sách'));
        }
        return res.send({ message: 'Xóa thành công' });
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message || `Có lỗi khi xóa sách có id: ${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const deletedCount = await bookService.deleteAll();
        return res.send({
            message: `${deletedCount} quyển sách được xóa thành công`,
        });
    } catch (error) {
        return next(
            new ApiError(500, error.message || 'Có lỗi khi xóa tất cả dữ liệu')
        );
    }
};
