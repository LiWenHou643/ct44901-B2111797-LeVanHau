<template>
    <div class="book-management">
        <div class="header">
            <h2>Books Management</h2>

            <button @click="reloadBooks" class="reload-btn">
                <i class="fa fa-sync-alt"></i>
            </button>
        </div>

        <BookTable :books="books" />
    </div>
</template>

<script>
import BookTable from '@/components/BookTable.vue'; // Import the BookTable component

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
        // Fetch books data from the API
        fetchBooks() {
            fetch('http://localhost:3000/api/books/')
                .then((response) => response.json())
                .then((data) => {
                    this.books = data;
                })
                .catch((error) => {
                    console.error('Error fetching books:', error);
                });
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
    justify-content: start;
    margin-bottom: 20px;
}
</style>
