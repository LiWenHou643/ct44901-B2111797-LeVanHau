<template>
    <div class="book-management">
        <div class="header">
            <div class="d-flex">
                <h2>Quản lý sách</h2>

                <button @click="reloadBooks" class="reload-btn">
                    <i class="fa fa-sync-alt"></i>
                </button>
            </div>
            <router-link :to="{ name: 'books-create' }" class="btn btn-dark">
                <i class="fa fa-plus"></i> Thêm mới
            </router-link>
        </div>

        <BookTable :books="books" @reload-books="reloadBooks" />

        <!-- Reusable Pagination Component -->
        <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            :pageSize="limit"
            @page-changed="handlePageChange"
        />

        <button @click="deleteAllBooks" class="delete-all-btn">
            <i class="fa fa-trash"></i>
        </button>
    </div>
</template>

<script>
import BookTable from '@/components/BookTable.vue'; // Import the BookTable component
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
        BookTable,
        Pagination,
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
        async fetchBooks(page = 1, limit = 8) {
            try {
                // Fetch books from the backend (using bookService)
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

        // Reload books data when the reload icon is clicked
        reloadBooks() {
            this.fetchBooks(this.currentPage); // Call the fetchBooks method to refetch the data
        },

        async deleteAllBooks() {
            // Show a confirmation dialog
            const confirmed = window.confirm(
                'Are you sure you want to delete all books?'
            );

            if (confirmed) {
                try {
                    // If confirmed, delete all books via the BookService
                    await bookService.deleteAll();

                    // Clear the books list in the frontend after deletion
                    this.books = [];
                    alert('All books have been deleted.');
                } catch (error) {
                    console.error('Error deleting books:', error);
                    alert('There was an error deleting all books.');
                }
            } else {
                // If the user cancels the confirmation
                alert('Delete operation was canceled.');
            }
        },
    },
};
</script>

<style scoped>
.book-management {
    margin: 20px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.delete-all-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ff6f61;
    color: white;
    border: none;
    font-size: 24px;
    border-radius: 50%;
    cursor: pointer;
    width: 60px;
    height: 60px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;
}

.delete-all-btn:hover {
    background-color: #d44e43;
}

.delete-all-btn i {
    margin: 0;
}
</style>
