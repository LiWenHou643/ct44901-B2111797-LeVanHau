<template>
    <div class="p-5 container">
        <!-- Search Input -->
        <div class="row mb-4">
            <div class="col-12">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Nhập tên sách muốn tìm kiếm..."
                    v-model="searchQuery"
                    @input="onSearchInput"
                />
            </div>
        </div>

        <!-- Books List -->
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
            searchQuery: '',
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
        searchQuery(newQuery) {
            this.fetchBooks(this.page, this.limit, newQuery); // Fetch books based on search query
        },
    },
    methods: {
        async fetchBooks(page = 1, limit = 12, search = '') {
            try {
                const response = await bookService.getAll({
                    page: page,
                    limit: limit,
                    search: search, // Pass search query to the API
                });

                console.log('Books:', response);

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
            // Update the URL with the new page number, preserving the limit and search query
            this.$router.push({
                query: {
                    ...this.$route.query,
                    page: page,
                    search: this.searchQuery, // Preserve search query in the URL
                },
            });
        },

        // Trigger search when the input changes
        onSearchInput() {
            // Reset to the first page when searching
            this.currentPage = 1;
            this.fetchBooks(this.currentPage, this.limit, this.searchQuery);
        },
    },
};
</script>

<style scoped></style>
