<template>
    <div class="pagination">
        <button
            class="pagination__btn"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
        >
            Previous
        </button>

        <span class="pagination__info">
            Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button
            class="pagination__btn"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
        >
            Next
        </button>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        currentPage: {
            type: Number,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        pageSize: {
            type: Number,
            default: 12,
        },
    },
    methods: {
        goToPage(page) {
            // Ensure the page is within valid range
            if (page < 1 || page > this.totalPages) return;

            // Emit event to notify parent component
            this.$emit('page-changed', page);
        },
    },
};
</script>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.pagination__btn {
    padding: 5px 10px;
    margin: 0 10px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 5px;
}

.pagination__btn:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
}

.pagination__info {
    font-size: 16px;
    margin: 0 10px;
}
</style>
