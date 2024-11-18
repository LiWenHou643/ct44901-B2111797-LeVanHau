const ApiError = require('../api-error.js');
const MongoDB = require('../utils/mongodb.util.js');
const CartService = require('../services/cart.service.js');

exports.getCartByUserId = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        cart = await cartService.findByUserId(req.query.userId);
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

exports.getCart = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        cart = await cartService.findOne(req.params.id);
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
        const cartService = new CartService(MongoDB.client);
        const id = req.body.id;
        const book = req.body.book;
        const books = req.body.books;

        if (books) {
            const cart = await cartService.addManyToCart(id, books);
            return res.send(cart);
        }
        const cart = await cartService.addToCart(id, book);
        return res.send(cart);
    } catch (error) {
        next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng!'
            )
        );
    }
};

exports.updateCart = async (req, res, next) => {
    try {
        const userId = req.body.id;
        const book = req.body.book;
        const cartService = new CartService(MongoDB.client);
        const cart = await cartService.updateCart(userId, book);
        return res.send(cart);
    } catch (error) {
        next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi cập nhật giỏ hàng!'
            )
        );
    }
};

exports.removeFromCart = async (req, res, next) => {
    try {
        const userId = req.body.id;
        const book = req.body.book;

        console.log(userId, book);
        const cartService = new CartService(MongoDB.client);
        const cart = await cartService.removeFromCart(userId, book);
        return res.send(cart);
    } catch (error) {
        next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi xoá sản phẩm khỏi giỏ hàng!'
            )
        );
    }
};

exports.clearCart = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const cartService = new CartService(MongoDB.client);
        const cart = await cartService.clearCart(userId);
        return res.send(cart);
    } catch (error) {
        next(
            new ApiError(
                500,
                error.message || 'Có lỗi xảy ra khi làm trống giỏ hàng!'
            )
        );
    }
};
