<template>
    <div class="reader-management">
        <div class="header">
            <h2>Readers Management</h2>

            <button @click="reloadReaders" class="reload-btn">
                <i class="fa fa-sync-alt"></i>
            </button>
        </div>

        <ReaderTable :readers="readers" />
    </div>
</template>

<script>
import ReaderTable from '@/components/ReaderTable.vue';

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
        fetchReaders() {
            fetch('http://localhost:3000/api/readers/')
                .then((response) => response.json())
                .then((data) => {
                    this.readers = data;
                })
                .catch((error) => {
                    console.error('Error fetching Readers:', error);
                });
        },

        // Reload Readers data when the reload icon is clicked
        reloadReaders() {
            this.fetchReaders(); // Call the fetchReaders method to refetch the data
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
    justify-content: start;
    margin-bottom: 20px;
}
</style>
