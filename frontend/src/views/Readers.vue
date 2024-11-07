<template>
    <div class="reader-management">
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
