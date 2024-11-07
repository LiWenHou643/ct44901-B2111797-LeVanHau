a
<template>
    <table class="table">
        <thead>
            <tr>
                <th @click="sortTable('hotennv')">
                    Full Name
                    <span v-if="sortBy === 'hotennv'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('chucvu')">
                    Position
                    <span v-if="sortBy === 'chucvu'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('diachi')">
                    Address
                    <span v-if="sortBy === 'diachi'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('dienthoai')">
                    Phone Number
                    <span v-if="sortBy === 'dienthoai'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(employee, index) in sortedEmployees"
                :key="employee.msnv"
            >
                <td>{{ employee.hotennv }}</td>
                <td>{{ employee.chucvu }}</td>
                <td>{{ employee.diachi }}</td>
                <td>{{ employee.dienthoai }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'EmployeeTable',
    props: {
        employees: Array, // Pass employees as a prop from parent component
    },
    data() {
        return {
            sortBy: '', // Field to sort by
            sortOrder: 'asc', // Sort order: 'asc' or 'desc'
        };
    },
    computed: {
        // Computed property to return sorted employees
        sortedEmployees() {
            return this.employees.slice().sort((a, b) => {
                const fieldA = this.getNestedValue(a, this.sortBy);
                const fieldB = this.getNestedValue(b, this.sortBy);

                if (fieldA === fieldB) return 0;

                if (this.sortOrder === 'asc') {
                    return fieldA < fieldB ? -1 : 1;
                } else {
                    return fieldA < fieldB ? 1 : -1;
                }
            });
        },
    },
    methods: {
        // Method to sort the table when clicking on header
        sortTable(field) {
            if (this.sortBy === field) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortBy = field;
                this.sortOrder = 'asc'; // Default to ascending order when switching columns
            }
        },
        // Helper method to get nested object values (e.g., 'nxb.tennxb')
        getNestedValue(object, path) {
            return path
                .split('.')
                .reduce((obj, key) => obj && obj[key], object);
        },
    },
};
</script>
