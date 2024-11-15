<template>
    <div class="borrow-management">
        <div class="header">
            <div class="d-flex">
                <h2>Quản lý mượn trả</h2>

                <button @click="reloadBorrowings" class="reload-btn">
                    <i class="fa fa-sync-alt"></i>
                </button>
            </div>
        </div>

        <BorrowingTable
            :borrowings="borrowings"
            @reload-borrowings="reloadBorrowings"
        />
    </div>
</template>

<script>
import BorrowingTable from '@/components/BorrowingTable.vue';
import borrowService from '@/services/borrow.service';

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
        async fetchBorrowings() {
            try {
                const response = await borrowService.getAll();
                this.borrowings = response;
            } catch (error) {
                console.error(error);
            }
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
    justify-content: space-between;
    margin-bottom: 20px;
}
</style>
