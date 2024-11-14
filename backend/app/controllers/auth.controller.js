const ApiError = require('../api-error.js');
const MongoDB = require('../utils/mongodb.util.js');
const AuthService = require('../services/auth.service.js');

exports.login = async (req, res, next) => {
    try {
        const authService = new AuthService(MongoDB.client);
        const user = await authService.login(req.body);
        return res.send(user);
    } catch (error) {
        return next(
            new ApiError(500, error.message || 'Có lỗi xảy ra khi đăng nhập!')
        );
    }
};
