<template>
    <div class="container">
        <h1 class="mb-4 text-center">Yêu cầu mượn sách</h1>

        <!-- Displaying the list of book requests -->
        <div v-if="orders.length > 0">
            <div class="card" v-for="(order, index) in orders" :key="index">
                <div class="card-body">
                    <!-- Order information -->
                    <div class="d-flex justify-content-between">
                        <strong>{{ formatDateVN(order.ngayyeucau) }}</strong>
                        <span
                            :class="[
                                'badge',
                                order.trangthai === 'Chờ xác nhận'
                                    ? 'bg-warning'
                                    : 'bg-success',
                            ]"
                        >
                            {{ order.trangthai }}
                        </span>
                    </div>

                    <!-- Displaying the list of books in this order -->
                    <div v-if="order.sach && order.sach.length > 0">
                        <ul class="list-group list-group-flush">
                            <li
                                v-for="(book, bookIndex) in order.sach"
                                :key="bookIndex"
                                class="list-group-item"
                            >
                                <strong>{{ book.tensach }}</strong> -
                                {{ book.dongia }} đ Tác giả:
                                {{ book.tacgia }} Năm xuất bản:
                                {{ book.namxuatban }}
                            </li>
                        </ul>
                    </div>
                    <!-- If no books in this order -->
                    <div v-else class="alert alert-warning mt-3" role="alert">
                        Không có sách nào trong yêu cầu.
                    </div>
                </div>
            </div>
        </div>

        <!-- If no book requests have been sent yet -->
        <div v-else class="alert alert-info text-center mt-4" role="alert">
            Bạn chưa mượn quyển sách nào.
            <router-link to="/books" class="alert-link"
                >Bắt đầu mượn ngay</router-link
            >
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        // Get the book requests from the store
        ...mapGetters('order', ['orders']),
    },
    methods: {
        formatDateVN(dateString) {
            const date = new Date(dateString);

            // Các mảng tên tháng và ngày trong tuần bằng tiếng Việt
            const vietnameseWeekdays = [
                'Chủ nhật',
                'Thứ hai',
                'Thứ ba',
                'Thứ tư',
                'Thứ năm',
                'Thứ sáu',
                'Thứ bảy',
            ];
            const vietnameseMonths = [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
                'Tháng 7',
                'Tháng 8',
                'Tháng 9',
                'Tháng 10',
                'Tháng 11',
                'Tháng 12',
            ];

            const day = String(date.getDate()).padStart(2, '0'); // Ngày với 2 chữ số
            const month = vietnameseMonths[date.getMonth()]; // Tháng theo kiểu Việt Nam
            const year = date.getFullYear(); // Năm
            const weekday = vietnameseWeekdays[date.getDay()]; // Ngày trong tuần theo kiểu Việt Nam
            const hour = String(date.getHours()).padStart(2, '0'); // Giờ với 2 chữ số
            const minute = String(date.getMinutes()).padStart(2, '0'); // Phút với 2 chữ số

            // Định dạng "Thứ X, ngày Y tháng Z năm N, HH:mm"
            return `${weekday}, ngày ${day} ${month} năm ${year}, ${hour}:${minute}`;
        },
    },
    created() {
        // Fetch the book requests when the component is created
        this.$store.dispatch('order/fetchOrders');
    },
};
</script>

<style scoped>
/* Additional styles (if needed) */
</style>
