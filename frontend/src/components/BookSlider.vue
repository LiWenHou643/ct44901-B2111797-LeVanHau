<template>
    <swiper
        :slides-per-view="6"
        :space-between="10"
        :autoplay="{ delay: 1000, disableOnInteraction: false }"
        :breakpoints="{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
        }"
    >
        <!-- Loop through the books and create a swiper-slide for each one -->
        <swiper-slide v-for="book in books" :key="book.id">
            <BookCard :book="book" />
        </swiper-slide>
    </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import BookCard from '@/components/BookCard.vue';
// Import Swiper styles
import 'swiper/css';

export default {
    name: 'BookSlider',
    components: {
        Swiper,
        SwiperSlide,
        BookCard,
    },
    props: {
        books: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.swiper-container {
    width: 100%;
    padding-bottom: 20px;
}

.book-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    background-color: #fff;
}

.book-cover {
    width: 100%;
    height: auto;
    border-radius: 8px;
}

.book-title {
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 10px;
}

.book-author {
    font-size: 0.9rem;
    color: #777;
}
</style>
