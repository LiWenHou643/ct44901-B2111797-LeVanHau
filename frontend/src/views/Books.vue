<template>
    <div class="book-management">
        <div class="header">
            <h2>Books Management</h2>

            <!-- Reload Icon -->
            <button @click="reloadBooks" class="reload-btn">
                <i class="fa fa-sync-alt"></i>
            </button>
        </div>

        <!-- Include the BookTable component and pass books as a prop -->
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

.reload-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 10px;
    transition: color 0.3s;
}

.reload-btn i {
    margin-right: 5px; /* Add some space between the icon and text */
    transition: transform 0.4s ease; /* Ensure smooth rotation */
}

/* Rotate the icon clockwise on hover */
.reload-btn:hover i {
    animation: spinClockwise 1s linear infinite;
}

@keyframes spinClockwise {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
