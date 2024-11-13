<template>
    <div class="p-5 container">
        <div class="row">
            <div
                class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4"
                v-for="book in books"
                :key="book.masach"
                :book="book"
            >
                <BookCard :key="book.masach" :book="book" />
            </div>
        </div>
        <!-- Reusable Pagination Component -->
        <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            :pageSize="limit"
            @page-changed="handlePageChange"
        />
    </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue';
import Pagination from '@/components/Pagination.vue';
import bookService from '@/services/book.service';
export default {
    name: 'Books',
    props: {
        page: {
            type: Number,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
        },
    },
    components: {
        Pagination,
        BookCard,
    },
    created() {
        this.fetchBooks(this.page, this.limit); // Initial fetch on component creation
    },
    data() {
        return {
            books: [],
            currentPage: this.page, // Use the page prop from the route
            totalPages: 1,
        };
    },
    watch: {
        // Watch for changes in page or limit and re-fetch books accordingly
        page(newPage) {
            this.fetchBooks(newPage, this.limit);
        },
        limit(newLimit) {
            this.fetchBooks(this.page, newLimit);
        },
    },
    methods: {
        async fetchBooks(page = 1, limit = 12) {
            try {
                const response = await bookService.getAll({
                    page: page,
                    limit: limit,
                });

                this.books = response.books;
                this.totalPages = response.pagination.totalPages;
                this.currentPage = page;
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        },

        // Handle page change via pagination component
        handlePageChange(page) {
            // Update the route query parameter for page and limit
            this.updateRoute(page);
        },

        updateRoute(page) {
            // Update the URL with the new page number, preserving the limit
            this.$router.push({
                query: {
                    ...this.$route.query,
                    page: page,
                },
            });
        },
    },
};
</script>

<style scoped></style>
