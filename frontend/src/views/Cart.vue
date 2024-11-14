<template>
    <div class="cart">
        <div v-if="cartItems.length > 0">
            <h3>Your Cart</h3>
            <!-- <ul>
                <li v-for="item in cartItems" :key="item.id">
                    <span>{{ item.name }} (x{{ item.quantity }})</span>
                    <button @click="removeItem(item.id)">Remove</button>
                </li>
            </ul>
            <div class="cart-footer">
                <p>Total: ${{ cartTotalPrice }}</p>
                <router-link to="/checkout" v-if="isLoggedIn"
                    >Proceed to Checkout</router-link
                >
                <button v-else @click="redirectToLogin">
                    Login to Checkout
                </button>
            </div> -->
        </div>
        <div v-else>
            <span>Bạn chưa thêm bất kì sách nào trong giỏ. </span>
            <router-link :to="{ name: 'books-public' }">Xem ngay</router-link>
        </div>
    </div>
</template>

<script>
import cartService from '@/services/cart.service';

export default {
    data() {
        return {
            cartItems: cartService.getCart(),
        };
    },
    computed: {
        cartTotalPrice() {
            return cartService.getCartTotalPrice();
        },
        isLoggedIn() {
            // Assume you are using Vuex to manage authentication state
            return this.$store.getters.isAuthenticated;
        },
    },
    methods: {
        removeItem(productId) {
            cartService.removeFromCart(productId);
            this.cartItems = cartService.getCart();
        },
        redirectToLogin() {
            this.$router.push({ name: 'login' });
        },
    },
};
</script>

<style scoped>
/* Add your styles for the cart here */
</style>
