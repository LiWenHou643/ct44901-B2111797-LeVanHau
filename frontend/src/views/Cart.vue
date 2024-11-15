<template>
    <div class="container">
        <div class="cart">
            <h3 class="text-center mb-4">Giỏ mượn</h3>
            <div v-if="cartItems.length > 0" class="card">
                <div class="card-body">
                    <ul class="list-group">
                        <li
                            v-for="item in cartItems"
                            :key="item._id"
                            class="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span
                                >{{ item.tensach }} - đ{{ item.dongia }} (x{{
                                    item.soluong
                                }})</span
                            >
                            <button class="btn btn-danger btn-sm" @click="">
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
                        <p class="fw-bold mb-0">Tổng phí mượn:</p>
                        <div>
                            <router-link
                                to="/checkout"
                                v-if="isAuthenticated"
                                class="btn btn-primary"
                                >Gửi yêu cầu</router-link
                            >
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
                <router-link :to="{ name: 'books-public' }" class="btn btn-link"
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
    computed: {
        ...mapGetters('cart', ['cartItems', 'cartQuantity']),
        ...mapGetters('auth', ['isAuthenticated']),
    },
    methods: {
        ...mapActions('cart', ['removeFromCart']),

        redirectToLogin() {
            this.$router.push({ name: 'login' });
        },
    },
};
</script>

<style scoped>
/* Add your styles for the cart here */
</style>
