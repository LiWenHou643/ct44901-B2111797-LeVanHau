<template>
    <div class="borrow-management">
        <div class="header">
            <h2>Quản lý mượn trả</h2>

            <button @click="reloadBorrowings" class="reload-btn">
                <i class="fa fa-sync-alt"></i>
            </button>
        </div>

        <BorrowingTable :borrowings="borrowings" />
    </div>
</template>

<script>
import BorrowingTable from '@/components/BorrowingTable.vue';

export default {
    name: 'Borrowings',
    components: {
        BorrowingTable, // Register the component
    },
    data() {
        return {
            borrowings: [], // Array to store borrowings data
        };
    },
    created() {
        this.fetchBorrowings(); // Fetch borrowings data when the component is created
    },
    methods: {
        // Fetch borrowings data from the API
        fetchBorrowings() {
            fetch('http://localhost:3000/api/tracks/')
                .then((response) => response.json())
                .then((data) => {
                    this.borrowings = data;
                })
                .catch((error) => {
                    console.error('Error fetching borrowings:', error);
                });
        },

        // Reload borrowings data when the reload icon is clicked
        reloadBorrowings() {
            this.fetchBorrowings(); // Call the fetchBorrowings method to refetch the data
        },
    },
};
</script>

<style scoped>
.borrow-management {
    margin: 20px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: start;
    margin-bottom: 20px;
}
</style>
