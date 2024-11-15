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
            console.log('Adding multiple books to cart');
            const cart = await cartService.updateCart(id, books);
            return res.send(cart);
        }
        const cart = await cartService.addToCart(id, book);
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
