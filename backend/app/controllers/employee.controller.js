const ApiError = require('../api-error.js');
const MongoDB = require('../utils/mongodb.util.js');
const EmployeeService = require('../services/employee.service.js');

exports.create = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi thêm mới nhân viên'
            )
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const { name } = req.query;
        if (name) documents = await employeeService.findByName(name);
        else documents = await employeeService.find({});
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi lấy danh sách nhân viên'
            )
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy nhân viên'));
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
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy nhân viên'));
        }
        return res.send({
            message: 'Cập nhật nhân viên thành công',
            employee: document,
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message ||
                    `Có lỗi khi cập nhật nhân viên có id: ${req.params.id}`
            )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy nhân viên'));
        }
        return res.send({ message: 'Xóa thành công' });
    } catch (error) {
        return next(
            new ApiError(
                500,
                error.message ||
                    `Có lỗi khi xóa nhân viên có id: ${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const deletedCount = await employeeService.deleteAll();
        return res.send({
            message: `${deletedCount} nhân viên được xóa thành công`,
        });
    } catch (error) {
        return next(
            new ApiError(500, error.message || 'Có lỗi khi xóa tất cả dữ liệu')
        );
    }
};
