<template>
    <div>
        <!-- Hero Section -->
        <section class="hero text-center bg-light py-5">
            <div class="container">
                <h1 class="display-4">
                    Chào mừng đến với hệ thống mượn sách online
                </h1>
                <p class="lead">
                    Tại đây cung cấp nhiều thể loại sách kinh điển với giá cho
                    mượn siêu ưu đãi. Chúng tôi phục vụ tận tình và chu đáo. Hứa
                    cung cấp một dịch vụ cho thuê mượn sách tốt nhất đến khách
                    hàng. Hãy đến với chúng tôi để trải nghiệm những cuốn sách
                    tuyệt vời nhất. Chúng tôi luôn sẵn lòng phục vụ bạn.
                </p>
                <button class="btn btn-primary btn-lg mt-4">
                    Khám phá ngay
                </button>
            </div>
        </section>

        <!-- Book Slider Section -->
        <section class="book-slider py-5">
            <div class="container">
                <h2 class="text-center mb-4">Đặc sắc</h2>
                <BookSlider :books="featuredBooks" />
            </div>
        </section>

        <!-- Book Slider Section -->
        <section class="book-slider py-5">
            <div class="container">
                <h2 class="text-center mb-4">Mọi người đều đọc</h2>
                <BookSlider :books="bestSellers" />
            </div>
        </section>

        <!-- Phần Đánh Giá -->
        <section class="testimonials py-5">
            <div class="container">
                <h2 class="text-center mb-4">Khách Hàng Nói Gì Về Chúng Tôi</h2>
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <p class="card-text">
                                    "Nhà sách tuyệt vời nhất! Một địa điểm phải
                                    đến đối với bất kỳ ai yêu thích sách."
                                </p>
                                <footer class="blockquote-footer">
                                    Nguyễn Thị Lan
                                </footer>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <p class="card-text">
                                    "Tôi đã tìm thấy chính xác những gì mình
                                    cần! Giá cả hợp lý và dịch vụ tuyệt vời."
                                </p>
                                <footer class="blockquote-footer">
                                    Trần Văn Minh
                                </footer>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <p class="card-text">
                                    "Sự đa dạng về sách ở đây thật tuyệt vời!
                                    Chắc chắn tôi sẽ quay lại. Chúc thư viện
                                    phát triển."
                                </p>
                                <footer class="blockquote-footer">
                                    Lê Thị Hương
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call-to-Action Section -->
        <section class="cta text-white py-5">
            <div class="container text-center">
                <h2 class="display-4">
                    Tham gia Cộng đồng Đọc Sách của Chúng Tôi
                </h2>
                <p class="lead">
                    Cập nhật những thông tin mới nhất về các cuốn sách phát
                    hành, ưu đãi và nhiều hơn nữa.
                </p>
                <button class="btn btn-light btn-lg mt-4">Đăng kí ngay</button>
            </div>
        </section>
    </div>
</template>

<script>
// Import BookCard component
import BookCard from '@/components/BookCard.vue';
import BookSlider from '@/components/BookSlider.vue';
export default {
    name: 'Home',
    components: {
        BookCard,
        BookSlider,
    },
    data() {
        return {
            featuredBooks: [
                {
                    id: 1,
                    anhbia: 'Potato-800x800.jpg',
                    dongia: 10000,
                    tensach: 'The Great Adventure',
                    tacgia: 'John Doe',
                },
                {
                    id: 2,
                    anhbia: 'Potato-800x800.jpg',
                    dongia: 10000,
                    tensach: 'Mystery in the Dark',
                    tacgia: 'Jane Smith',
                },
                {
                    id: 3,
                    anhbia: 'Potato-800x800.jpg',
                    dongia: 10000,
                    tensach: 'A Journey Beyond',
                    tacgia: 'Mark Johnson',
                },
                {
                    id: 4,
                    anhbia: 'Potato-800x800.jpg',
                    dongia: 10000,
                    tensach: 'The Last Kingdom',
                    tacgia: 'Emily Davis',
                },
                {
                    id: 5,
                    anhbia: 'Potato-800x800.jpg',
                    dongia: 10000,
                    tensach: 'Secrets Unveiled',
                    tacgia: 'Michael Brown',
                },
                {
                    id: 6,
                    anhbia: 'Potato-800x800.jpg',
                    dongia: 10000,
                    tensach: 'Whispers in the Wind',
                    tacgia: 'Olivia White',
                },
                {
                    id: 7,
                    anhbia: 'Potato-800x800.jpg',
                    dongia: 10000,
                    tensach: 'The Silent Path',
                    tacgia: 'Daniel Green',
                },
                {
                    id: 8,
                    anhbia: 'Potato-800x800.jpg',
                    dongia: 10000,
                    tensach: 'Beneath the Stars',
                    tacgia: 'Sophia Black',
                },
                {
                    id: 9,
                    anhbia: 'Potato-800x800.jpg',
                    dongia: 10000,
                    tensach: 'Into the Abyss',
                    tacgia: 'Lucas Gray',
                },
                {
                    id: 10,
                    anhbia: 'Potato-800x800.jpg',
                    dongia: 10000,
                    tensach: 'The Forgotten Realm',
                    tacgia: 'Chloe Adams',
                },
            ],

            bestSellers: [
                {
                    id: 4,
                    title: 'Mastering JavaScript',
                    author: 'Bob Marley',
                    price: 39.99,
                    coverImage: 'Mastering-JS.jpg',
                    description: 'Deep dive into JavaScript concepts.',
                },
                {
                    id: 5,
                    title: 'Design Patterns',
                    author: 'Eve White',
                    price: 49.99,
                    coverImage: 'Design-Patterns.jpg',
                    description:
                        'Learn common design patterns in software development.',
                },
                {
                    id: 6,
                    title: 'The Pragmatic Programmer',
                    author: 'Sam Green',
                    price: 29.99,
                    coverImage: 'Pragmatic-Programmer.jpg',
                    description: "A programmer's guide to career development.",
                },
            ],
        };
    },
    methods: {
        handleAddToCart(book) {
            console.log(`${book.title} has been added to the cart.`);
            // Add your cart logic here (like using Vuex to manage the cart)
        },
    },
};
</script>

<style scoped>
/* Hero Section */
.hero {
    background-color: #f8f9fa;
    border-bottom: 2px solid #ddd;
}

.hero h1 {
    font-size: 3rem;
    font-weight: 700;
}

.hero p {
    font-size: 1.25rem;
    color: #6c757d;
}

/* Featured Books Section */
.books-list {
    background-color: #fafafa;
}

.books-list h2 {
    font-size: 2rem;
    font-weight: 600;
}

/* Best Sellers Section */
.best-sellers {
    background-color: #f0f0f0;
}

.best-sellers h2 {
    font-size: 2rem;
    font-weight: 600;
}

/* Testimonials Section */
.testimonials {
    background-color: #ffffff;
}

.testimonials .card {
    border-radius: 10px;
}

.testimonials .card-body {
    padding: 1.5rem;
}

.testimonials .card-text {
    font-size: 1.1rem;
    font-style: italic;
}

.testimonials footer {
    font-size: 1rem;
    color: #ffffff;
}

/* Call-to-Action Section */
.cta {
    background-color: #5188ffff;
}

.cta h2 {
    font-size: 3rem;
    font-weight: 700;
}

.cta p {
    font-size: 1.25rem;
    color: #f8f9fa;
}

/* Footer Section */
footer {
    background-color: #343a40;
    color: white;
}

footer a {
    color: #f8f9fa;
    text-decoration: none;
    margin: 0 10px;
}

footer a:hover {
    text-decoration: underline;
}
</style>
