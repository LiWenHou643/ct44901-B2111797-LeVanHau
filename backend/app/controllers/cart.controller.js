const ApiError = require('../api-error.js');
const MongoDB = require('../utils/mongodb.util.js');
const CartService = require('../services/cart.service.js');

exports.getCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await CartService.findOne(userId);
        return res.send(cart);
    } catch (error) {
        next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi lấy dữ liệu giỏ hàng!'
            )
        );
    }
};

exports.addToCart = async (req, res, next) => {
    try {
        const id = req.body.madocgia;
        const book = req.body.sach;
        const cart = await CartService.addToCart(id, book);
        return res.send(cart);
    } catch (error) {
        next(error);
    }
};

exports.removeFromCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const productId = req.body.productId;
        const cart = await CartService.removeFromCart(userId, productId);
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

exports.clearCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await CartService.clearCart(userId);
        res.json(cart);
    } catch (error) {
        next(error);
    }
};
