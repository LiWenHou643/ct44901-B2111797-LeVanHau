const express = require('express');
const cart = require('../controllers/cart.controller');

const router = express.Router();

router.route('/').get(cart.getCartByUserId);
router.route('/add').put(cart.addToCart);
router.route('/remove').put(cart.removeFromCart);
router.route('/clear').delete(cart.clearCart);

module.exports = router;
