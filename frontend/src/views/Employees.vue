<template>
    <div class="book-management">
        <div class="header">
            <h2>Books Management</h2>

            <button @click="reloadEmployees" class="reload-btn">
                <i class="fa fa-sync-alt"></i>
            </button>
        </div>

        <EmployeeTable :employees="employees" />
    </div>
</template>

<script>
import EmployeeTable from '@/components/EmployeeTable.vue';
export default {
    name: 'Employees',
    components: {
        EmployeeTable, // Register the component
    },
    data() {
        return {
            employees: [], // Array to store books data
        };
    },
    created() {
        this.fetchEmployees(); // Fetch books data when the component is created
    },
    methods: {
        // Fetch books data from the API
        fetchEmployees() {
            fetch('http://localhost:3000/api/employees/')
                .then((response) => response.json())
                .then((data) => {
                    this.employees = data;
                })
                .catch((error) => {
                    console.error('Error fetching books:', error);
                });
        },

        // Reload books data when the reload icon is clicked
        reloadEmployees() {
            this.fetchEmployees(); // Call the fetchEmployees method to refetch the data
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
