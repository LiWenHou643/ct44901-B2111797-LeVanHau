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
        const { search: title, page = 1, limit = 10 } = req.query;

        // Convert page and limit to numbers to avoid any potential issues with strings
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);
        const skip = (pageNumber - 1) * pageSize;

        // Fetch books based on whether we have a title query or not
        if (title) {
            documents = await bookService.findByName(title);
        } else {
            documents = await bookService.find({}, skip, pageSize);
        }
        const totalBooks = await bookService.count();

        // Calculate total pages
        const totalPages = Math.ceil(totalBooks / pageSize);

        // Send the response with paginated books and metadata
        return res.send({
            books: documents,
            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalBooks,
            },
        });
    } catch (error) {
        return next(
            new ApiError(500, error.message || 'Có lỗi xảy ra khi lấy sách')
        );
    }
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
        console.log('hello');
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
