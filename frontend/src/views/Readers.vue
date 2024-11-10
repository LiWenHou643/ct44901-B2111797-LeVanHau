<template>
    <div class="reader-management">
        <div class="header">
            <div class="d-flex">
                <h2>Quản lý đọc giả</h2>

                <button @click="reloadReaders" class="reload-btn">
                    <i class="fa fa-sync-alt"></i>
                </button>
            </div>

            <router-link :to="{ name: 'readers-create' }" class="btn btn-dark">
                <i class="fa fa-plus"></i> Thêm mới
            </router-link>
        </div>

        <ReaderTable :readers="readers" @reload-readers="reloadReaders" />

        <button @click="deleteAllReaders" class="delete-all-btn">
            <i class="fa fa-trash"></i>
        </button>
    </div>
</template>

<script>
import ReaderTable from '@/components/ReaderTable.vue';
import readerService from '@/services/reader.service';

export default {
    name: 'Readers',
    components: {
        ReaderTable,
    },
    data() {
        return {
            readers: [],
        };
    },
    created() {
        this.fetchReaders(); // Fetch Readers data when the component is created
    },
    methods: {
        // Fetch Readers data from the API
        async fetchReaders() {
            try {
                const response = await readerService.getAll();
                this.readers = response;
            } catch (error) {
                console.error('Error fetching readers:', error);
            }
        },

        // Reload Readers data when the reload icon is clicked
        reloadReaders() {
            this.fetchReaders(); // Call the fetchReaders method to refetch the data
        },

        // Delete all Readers
        async deleteAllReaders() {
            try {
                await readerService.deleteAll();
                this.reloadReaders(); // Reload Readers data after deleting all Readers
            } catch (error) {
                console.error('Error deleting all readers:', error);
            }
        },
    },
};
</script>

<style scoped>
.reader-management {
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
