<template>
    <div class="card px-5 pt-4 pb-5 my-5">
        <div class="d-flex justify-content-start mb-3">
            <button class="btn btn-outline-dark" @click="goBack">
                << Trở lại
            </button>
        </div>
        <div class="row">
            <!-- Left side: Book Cover Image -->
            <div class="col-md-4 d-flex justify-content-center">
                <img
                    :src="book.anhbia"
                    alt="Book Cover"
                    class="img-fluid rounded shadow-sm"
                    style="object-fit: cover; height: 320px"
                />
            </div>

            <!-- Right side: Book Info -->
            <div class="col-md-8">
                <div class="d-flex flex-column h-100">
                    <!-- Book Title and Author -->
                    <h1 class="h3 mb-2">{{ book.tensach }}</h1>
                    <h4 class="text-muted mb-3">by {{ book.tacgia }}</h4>

                    <!-- Price -->
                    <h5 class="text-primary mb-4">đ{{ book.dongia }}</h5>

                    <!-- Publisher Information -->
                    <div>
                        <p>
                            <strong>Nhà xuất bản:</strong> {{ book.nxb.tennxb }}
                        </p>
                        <p><strong>Địa chỉ:</strong> {{ book.nxb.diachi }}</p>
                    </div>

                    <!-- Additional Book Info -->
                    <div>
                        <p>
                            <strong>Xuất bản năm:</strong> {{ book.namxuatban }}
                        </p>
                        <p>
                            <strong>Số lượng:</strong>
                            {{ book.soquyen }}
                        </p>
                    </div>

                    <!-- Action Buttons -->
                    <div class="d-flex justify-content-start">
                        <button
                            class="btn btn-primary"
                            @click="addBookToCart(book)"
                        >
                            Thêm vào giỏ mượn
                        </button>
                    </div>

                    <!-- Social Sharing Section -->
                    <div class="mt-4">
                        <button class="btn btn-outline-primary me-2">
                            <i class="bi bi-facebook"></i> Chia sẻ trên Facebook
                        </button>
                        <button class="btn btn-outline-info">
                            <i class="bi bi-twitter"></i> Chia sẻ trên Twitter
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Description Section -->
        <div class="mt-5">
            <h5 class="mb-2">Mô tả</h5>
            <p v-if="book.mota">{{ book.mota }}</p>
            <p v-else>Chưa có mô tả nào cho quyển sách này.</p>
        </div>

        <!-- Reviews Section -->
        <div class="mt-3 d-flex justify-content-between gap-5">
            <div class="flex-fill">
                <h5 class="mb-4">Bình luận đánh giá từ người đọc</h5>

                <!-- Display existing comments -->
                <div v-if="book.binhluan && book.binhluan.length > 0">
                    <div
                        v-for="(comment, index) in book.binhluan"
                        :key="index"
                        class="mb-3 border-bottom"
                    >
                        <p>
                            <strong>{{ comment.customer }}</strong> -
                            <span class="text-muted">{{ comment.date }}</span>
                        </p>
                        <p>{{ comment.comment }}</p>
                    </div>
                </div>
                <p v-else>Chưa có bình luận đánh giá nào cho quyển sách này.</p>
            </div>

            <!-- Comment Form -->
            <div class="flex-fill">
                <form @submit.prevent="submitComment">
                    <div class="mb-3">
                        <label for="commentText" class="form-label"
                            >Bình luận của bạn</label
                        >
                        <textarea
                            id="commentText"
                            v-model="newComment.comment"
                            class="form-control"
                            rows="4"
                            placeholder="Chia sẻ cảm nhận của bạn về quyển sách này"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Gửi bình luận
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import bookService from '@/services/book.service';
import { mapGetters } from 'vuex';

export default {
    name: 'BookDetail',
    data() {
        return {
            book: {
                tensach: '',
                tacgia: '',
                dongia: 0,
                soquyen: 0,
                anhbia: '',
                nxb: {
                    tennxb: '',
                    diachi: '',
                },
            },
            newComment: {
                comment: '',
                date: new Date().toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true, // 12-hour format with AM/PM
                }),
            },
        };
    },
    created() {
        this.getBook();
    },
    computed: {
        ...mapGetters('auth', ['user', 'isAuthenticated']),
    },
    methods: {
        goBack() {
            this.$router.go(-1); // Takes the user back to the previous page
        },
        async getBook() {
            const id = this.$route.params.id;
            const book = await bookService.get(id);
            this.book = book;
        },

        async submitComment() {
            if (!this.newComment.comment) {
                return;
            }
            console.log(this.user);
            if (!this.isAuthenticated) {
                this.$router.push('/login');
                return;
            }

            const id = this.$route.params.id;

            if (!this.book.binhluan) {
                this.book.binhluan = [];
            }

            await bookService.update(id, {
                ...this.book,
                binhluan: [
                    ...this.book.binhluan,
                    {
                        customer: this.user.hoten,
                        comment: this.newComment.comment,
                        date: this.newComment.date,
                    },
                ],
            });
            this.newComment.comment = '';
            this.getBook();
        },

        addBookToCart(book) {
            this.$store.dispatch('cart/addToCart', {
                product: book,
                quantity: 1,
            });
        },
    },
};
</script>

<style scoped>
.card {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
}
</style>
