<template>
    <div class="container">
        <div class="cart">
            <h3 class="text-center mb-4">Giỏ mượn</h3>
            <!-- Clear Cart Button Positioned Top Left -->
            <button
                v-if="cartItems.length > 0"
                class="btn btn-danger mb-2"
                @click="clearCart"
            >
                Xoá tất cả
            </button>
            <div v-if="cartItems.length > 0" class="card position-relative">
                <div class="card-body">
                    <ul class="list-group">
                        <li
                            v-for="item in cartItems"
                            :key="item._id"
                            class="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>
                                {{ item.tensach }} - đ{{ item.dongia }} (x{{
                                    item.soluong
                                }})
                            </span>
                            <button
                                class="btn btn-danger btn-sm"
                                @click="removeFromCart(item)"
                            >
                                Xoá
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="card-footer">
                    <p class="fw-bold mb-0">
                        Tổng sách: {{ cartQuantity }} quyển
                    </p>
                    <div
                        class="d-flex justify-content-between align-items-center"
                    >
                        <p class="fw-bold mb-0">
                            Tổng phí mượn: {{ formatPrice }}
                        </p>
                        <div>
                            <button
                                v-if="isAuthenticated"
                                class="btn btn-primary"
                                @click="order"
                            >
                                Gửi yêu cầu
                            </button>
                            <router-link
                                v-else
                                to="/login"
                                class="btn btn-warning"
                            >
                                Đăng nhập để mượn
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-center mt-4">
                <span class="text-muted"
                    >Bạn chưa thêm bất kì sách nào trong giỏ.</span
                >
                <br />
                <router-link
                    :to="{ name: 'books-public' }"
                    class="btn btn-link"
                >
                    Xem ngay
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import orderService from '@/services/order.service';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('cart', ['cartItems', 'cartQuantity', 'cartTotal']),
        ...mapGetters('auth', ['user', 'isAuthenticated']),
        formatPrice() {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(this.cartTotal); // Use cartTotal directly from Vuex state
        },
    },
    methods: {
        ...mapActions('cart', ['clearCart']),

        redirectToLogin() {
            this.$router.push({ name: 'login' });
        },

        removeFromCart(item) {
            console.log('Removing from cart:', item);
            this.$store.dispatch('cart/removeFromCart', {
                product: item,
                quantity: -1,
            });
        },

        async order() {
            try {
                const order = await orderService.createOrder(
                    this.user._id,
                    this.cartItems
                );
                if (order) {
                    this.clearCart();
                }
                this.$router.push({ name: 'order' });
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>

<style scoped></style>
