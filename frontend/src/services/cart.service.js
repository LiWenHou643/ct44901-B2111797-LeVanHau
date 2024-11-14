export default {
    // Get the cart items from localStorage
    getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    },

    // Add a product to the cart
    addToCart(product) {
        const cart = this.getCart();
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            // If the product is already in the cart, increase quantity
            existingProduct.quantity += 1;
        } else {
            // If it's not in the cart, add it
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    },

    // Remove a product from the cart
    removeFromCart(productId) {
        let cart = this.getCart();
        cart = cart.filter((item) => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    },

    // Clear the entire cart
    clearCart() {
        localStorage.removeItem('cart');
    },

    // Get the total items in the cart
    getCartItemCount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    },

    // Get the total price of the cart
    getCartTotalPrice() {
        const cart = this.getCart();
        return cart.reduce(
            (total, item) => total + item.quantity * item.price,
            0
        );
    },
};
