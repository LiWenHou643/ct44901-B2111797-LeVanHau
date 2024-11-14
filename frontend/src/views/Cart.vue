<template>
    <div class="container mt-5">
        <div class="cart">
            <h3 class="text-center mb-4">Your Cart</h3>
            <div v-if="cartItems.length > 0" class="card">
                <div class="card-body">
                    <ul class="list-group">
                        <li
                            v-for="item in cartItems"
                            :key="item._id"
                            class="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span
                                >{{ item.tensach }} (x{{
                                    item.soluongmuon
                                }})</span
                            >
                            <button
                                class="btn btn-danger btn-sm"
                                @click="removeItem(item._id)"
                            >
                                Remove
                            </button>
                        </li>
                    </ul>
                </div>
                <div
                    class="card-footer d-flex justify-content-between align-items-center"
                >
                    <div>
                        <span class="fw-bold">Total: </span>
                    </div>
                    <div>
                        <router-link
                            to="/checkout"
                            v-if="isAuthenticated"
                            class="btn btn-primary"
                            >Proceed to Checkout</router-link
                        >
                        <router-link v-else to="/login" class="btn btn-warning">
                            Login to Checkout
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-else class="text-center mt-4">
                <span class="text-muted"
                    >Bạn chưa thêm bất kì sách nào trong giỏ.</span
                >
                <br />
                <router-link to="{ name: 'books-public' }" class="btn btn-link"
                    >Xem ngay</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import cartService from '@/services/cart.service';
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            cartItems: [],
        };
    },
    computed: {
        ...mapGetters('cart', ['cart']),
        ...mapGetters('auth', ['user', 'isAuthenticated']),
    },
    created() {
        this.fetchCartItems();
    },
    methods: {
        ...mapActions('cart', ['removeFromCart']),
        redirectToLogin() {
            this.$router.push({ name: 'login' });
        },

        async fetchCartItems() {
            if (this.isAuthenticated) {
                this.cartItems = await cartService.getCart(this.user._id);
            } else {
                this.cartItems = this.cart;
            }
        },

        async removeItem(productId) {
            if (this.isAuthenticated) {
                await cartService.removeFromCart(productId);
            } else {
                this.removeFromCart(productId);
            }
        },
    },
};
</script>

<style scoped>
/* Add your styles for the cart here */
</style>
