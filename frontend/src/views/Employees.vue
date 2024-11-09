<template>
    <div class="employee-management">
        <div class="header">
            <div class="d-flex">
                <h2>Quản lý nhân viên</h2>

                <button @click="reloadEmployees" class="reload-btn">
                    <i class="fa fa-sync-alt"></i>
                </button>
            </div>

            <router-link
                :to="{ name: 'employees-create' }"
                class="btn btn-dark"
            >
                <i class="fa fa-plus"></i> Thêm mới
            </router-link>
        </div>

        <EmployeeTable
            :employees="employees"
            @reload-employees="reloadEmployees"
        />

        <button @click="deleteAllEmployees" class="delete-all-btn">
            <i class="fa fa-trash"></i>
        </button>
    </div>
</template>

<script>
import EmployeeTable from '@/components/EmployeeTable.vue';
import employeeService from '@/services/employee.service';
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

        async deleteAllEmployees() {
            // Show a confirmation dialog
            const confirmed = window.confirm(
                'Are you sure you want to delete all employees?'
            );

            if (confirmed) {
                try {
                    // If confirmed, delete all books via the BookService
                    await employeeService.deleteAll();

                    // Clear the books list in the frontend after deletion
                    this.reloadEmployees();
                    alert('All books have been deleted.');
                } catch (error) {
                    console.error('Error deleting books:', error);
                    alert('There was an error deleting all books.');
                }
            } else {
                // If the user cancels the confirmation
                alert('Delete operation was canceled.');
            }
        },
    },
};
</script>

<style scoped>
.employee-management {
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
