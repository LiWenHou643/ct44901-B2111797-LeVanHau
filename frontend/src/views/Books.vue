<template>
    <div class="book-management">
        <div class="header">
            <div class="d-flex">
                <h2>Books Management</h2>

                <button @click="reloadBooks" class="reload-btn">
                    <i class="fa fa-sync-alt"></i>
                </button>
            </div>
            <router-link :to="{ name: 'books-create' }" class="btn btn-dark">
                <i class="fa fa-plus"></i> Add Book
            </router-link>
        </div>

        <BookTable :books="books" />
    </div>
</template>

<script>
import BookTable from '@/components/BookTable.vue'; // Import the BookTable component
import bookService from '@/services/book.service';

export default {
    name: 'Books',
    components: {
        BookTable, // Register the component
    },
    data() {
        return {
            books: [], // Array to store books data
        };
    },
    created() {
        this.fetchBooks(); // Fetch books data when the component is created
    },
    methods: {
        async fetchBooks() {
            try {
                this.books = await bookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        // Reload books data when the reload icon is clicked
        reloadBooks() {
            this.fetchBooks(); // Call the fetchBooks method to refetch the data
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
</style>
