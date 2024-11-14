const express = require('express');
const cart = require('../controllers/cart.controller');

const router = express.Router();

router
    .route('/:id')
    .get(cart.getCart)
    .put(cart.addToCart)
    .delete(cart.removeFromCart);

router.route('/clear').delete(cart.clearCart);

module.exports = router;
