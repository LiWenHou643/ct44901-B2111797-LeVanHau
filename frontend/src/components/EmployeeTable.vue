<template>
    <table class="table">
        <thead>
            <tr>
                <th @click="sortTable('hotennv')">
                    Họ tên
                    <span v-if="sortBy === 'hotennv'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('chucvu')">
                    Chức vụ
                    <span v-if="sortBy === 'chucvu'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('diachi')">
                    Địa chỉ
                    <span v-if="sortBy === 'diachi'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('dienthoai')">
                    Điện thoại
                    <span v-if="sortBy === 'dienthoai'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="sortedEmployees.length === 0">
                <td colspan="5" class="text-center">
                    Không có dữ liệu nhân viên nào!
                </td>
            </tr>
            <tr v-for="employee in sortedEmployees" :key="employee.msnv">
                <td>
                    <!-- Editable field for name -->
                    <span v-if="!employee.isEditing">{{
                        employee.hotennv
                    }}</span>
                    <input v-else v-model="employee.hotennv" class="editable" />
                </td>
                <td>
                    <!-- Editable field for position -->
                    <span v-if="!employee.isEditing">{{
                        employee.chucvu
                    }}</span>
                    <input
                        v-else
                        v-model="employee.chucvu"
                        class="editable"
                        readonly
                    />
                </td>
                <td>
                    <!-- Editable field for address -->
                    <span v-if="!employee.isEditing">{{
                        employee.diachi
                    }}</span>
                    <input v-else v-model="employee.diachi" class="editable" />
                </td>
                <td>
                    <!-- Editable field for phone number -->
                    <span v-if="!employee.isEditing">{{
                        employee.dienthoai
                    }}</span>
                    <input
                        v-else
                        v-model="employee.dienthoai"
                        class="editable"
                    />
                </td>
                <td>
                    <!-- Edit/Save button -->
                    <button
                        class="btn btn-success"
                        @click="toggleEdit(employee)"
                    >
                        {{ employee.isEditing ? 'Lưu' : 'Sửa' }}
                    </button>
                    <!-- Cancel button if in editing mode -->
                    <button
                        class="btn btn-secondary"
                        v-if="employee.isEditing"
                        @click="cancelEdit(employee)"
                    >
                        Hủy
                    </button>

                    <!-- Delete button -->
                    <button
                        class="btn btn-danger"
                        v-if="!employee.isEditing"
                        @click="deleteEmployee(employee)"
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import employeeService from '@/services/employee.service';
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

        async toggleEdit(employee) {
            if (employee.isEditing) {
                try {
                    await this.saveEmployee(employee);
                } catch (error) {
                    console.error('Error saving employee', error);
                    alert('Có lỗi khi thêm mới.');
                }
            } else {
                employee.originalData = { ...employee };
            }
            employee.isEditing = !employee.isEditing;
        },

        async saveEmployee(employee) {
            try {
                const updatedEmployee = await employeeService.update(
                    employee.msnv,
                    employee
                );
                alert(
                    `Cập nhật thông tin thành công cho: ${updatedEmployee.employee.hotennv}`
                );
            } catch (error) {
                console.error('Có lỗi khi cập nhật:', error);
                alert(
                    'There was an error updating the employee. Please try again.'
                );
            }
        },

        cancelEdit(employee) {
            Object.assign(employee, employee.originalData);
            employee.isEditing = false;
        },

        deleteEmployee(employee) {
            if (confirm(`Xác nhận muốn xóa ${employee.hotennv}?`)) {
                employeeService
                    .delete(employee.msnv)
                    .then(() => {
                        alert(
                            `Nhân viên ${employee.hotennv} được xóa thành công!`
                        );
                        this.$emit('reload-employees');
                    })
                    .catch((error) => {
                        console.error('Có lỗi khi xóa nhân viên:', error);
                    });
            }
        },
    },
};
</script>

<style scoped>
input {
    width: 100%;
    box-sizing: border-box; /* Include padding and borders in element's width */
    max-width: 100%; /* Prevent input from expanding beyond the cell */
}

button {
    height: 25px;
    padding: 0 10px;
    font-size: 14px;
    margin-right: 5px;
}

.editable {
    border: 1px solid #ccc;
    padding: 4px;
}
</style>
