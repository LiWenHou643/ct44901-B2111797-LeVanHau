const ApiError = require('../api-error.js');
const MongoDB = require('../utils/mongodb.util.js');
const BookService = require('../services/book.service.js');

exports.create = async (req, res, next) => {
    if (!req.body?.tensach) {
        return next(new ApiError(400, 'Tên không được để trống'));
    }
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, error.message || 'Có lỗi xảy ra khi tạo')
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const bookService = new BookService(MongoDB.client);
        const { name } = req.query;
        console.log(name);
        if (name) documents = await bookService.findByName(name);
        else documents = await bookService.find({});
    } catch (error) {
        return next(
            new ApiError(500, error.message || 'Có lỗi xảy ra khi lấy dữ liệu')
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy dữ liệu'));
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
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy dữ liệu'));
        }
        return res.send({
            message: 'Cập nhật dữ liệu thành công',
            book: document,
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message ||
                    `Có lỗi khi cập nhật dữ liệu có id: ${req.params.id}`
            )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy dữ liệu'));
        }
        return res.send({ message: 'Xóa thành công' });
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message ||
                    `Có lỗi khi xóa dữ liệu có id: ${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const deletedCount = await bookService.deleteAll();
        return res.send({
            message: `${deletedCount} được xóa thành công`,
        });
    } catch (error) {
        return next(
            new ApiError(500, error.message || 'Có lỗi khi xóa tất cả dữ liệu')
        );
    }
};

exports.findAllFavorite = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const documents = await bookService.findAllFavorite();
        if (!documents) {
            return next(new ApiError(404, 'Không tìm thấy dữ liệu yêu thích'));
        }
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, error.message || 'Có lỗi xảy ra khi lấy dữ liệu')
        );
    }
};
