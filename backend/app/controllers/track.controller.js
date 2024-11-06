const ApiError = require('../api-error.js');
const MongoDB = require('../utils/mongodb.util.js');
const TrackBorrowService = require('../services/track.service.js');
const { ObjectId } = require('mongodb');

exports.create = async (req, res, next) => {
    try {
        const trackBorrowService = new TrackBorrowService(MongoDB.client);
        const document = await trackBorrowService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi thêm mới phiếu mượn'
            )
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const trackBorrowService = new TrackBorrowService(MongoDB.client);
        const { readerId } = req.query;
        if (readerId)
            documents = await trackBorrowService.find({
                madocgia: readerId,
            });
        else documents = await trackBorrowService.find({});
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi lấy phiếu mượn'
            )
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const trackBorrowService = new TrackBorrowService(MongoDB.client);
        const document = await trackBorrowService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy phiếu mượn'));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message ||
                    `Có lỗi xảy ra khi lấy phiếu mượn bằng id: ${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Dữ liệu không được để trống'));
    }

    try {
        const trackBorrowService = new TrackBorrowService(MongoDB.client);
        const document = await trackBorrowService.update(
            req.params.id,
            req.body
        );
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy phiếu mượn'));
        }
        return res.send({
            message: 'Cập nhật phiếu mượn thành công',
            borrowCard: document,
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message ||
                    `Có lỗi khi cập nhật phiếu mượn có id: ${req.params.id}`
            )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const trackBorrowService = new TrackBorrowService(MongoDB.client);
        const document = await trackBorrowService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy phiếu mượn'));
        }
        return res.send({ message: 'Xóa thành công' });
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message ||
                    `Có lỗi khi xóa phiếu mượn có id: ${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const trackBorrowService = new TrackBorrowService(MongoDB.client);
        const deletedCount = await trackBorrowService.deleteAll();
        return res.send({
            message: `${deletedCount} phiếu mượn được xóa thành công`,
        });
    } catch (error) {
        return next(
            new ApiError(500, error.message || 'Có lỗi khi xóa tất cả dữ liệu')
        );
    }
};
