<template>
    <!-- Book Card -->
    <div class="card shadow-sm" :title="book.tensach">
        <!-- Book Cover Image -->
        <img
            :src="book.anhbia"
            class="card-img-top img-fluid fixed-img"
            alt="Book Cover"
        />

        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">{{ book.tensach }}</h5>
            <div class="d-flex flex-column justify-content-between">
                <p class="card-text text-muted mb-0">
                    {{ book.tacgia }}
                </p>
                <h5 class="card-text text-primary">đ{{ book.dongia }}</h5>

                <!-- Add to Cart Button -->
                <button class="btn btn-primary w-100" @click="addToCart">
                    Thêm
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookCard',
    props: {
        book: {
            type: Object,
            required: true,
        },
    },
    methods: {
        addToCart() {
            // Handle adding book to cart
            this.$cartStore.dispatch('addToCart', this.book);
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    border-radius: 10px;
    transition: transform 0.2s ease-in-out;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-img-top {
    max-height: 300px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid rgba(104, 104, 104, 0.1);
}

.card-body {
    padding: 1rem;
}

.card-title {
    font-size: 1rem;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.5rem;
}

.card-text {
    font-size: 1rem;
}

.card-text.text-truncate {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    -webkit-line-clamp: 3; /* Show 3 lines of text */
    overflow: hidden;
}

.fixed-img {
    height: 200px; /* Set a fixed height */
    object-fit: fill; /* Maintain aspect ratio while covering the area */
    width: 100%; /* Ensure the image stretches to fill the width */
}
</style>
