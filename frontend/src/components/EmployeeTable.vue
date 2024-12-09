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
                <th>Mật khẩu</th>
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
                    <!-- Editable field for passwork -->
                    <span v-if="!employee.isEditing">{{
                        employee.matkhau
                    }}</span>
                    <input v-else v-model="employee.matkhau" class="editable" />
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
import * as Yup from 'yup';
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

        getValidationSchema() {
            return Yup.object({
                hotennv: Yup.string().required('Họ tên không được để trống'),
                chucvu: Yup.string().required('Chức vụ không được để trống'),
                diachi: Yup.string().required('Địa chỉ không được để trống'),
                dienthoai: Yup.string()
                    .matches(/^\d{10}$/, 'Số điện thoại phải có 10 chữ số')
                    .required('Số điện thoại không được để trống'),
            });
        },

        async saveEmployee(employee) {
            try {
                await this.getValidationSchema().validate(employee, {
                    abortEarly: false,
                });
                const updatedEmployee = await employeeService.update(
                    employee.msnv,
                    employee
                );
                alert(
                    `Cập nhật thông tin thành công cho: ${updatedEmployee.employee.hotennv}`
                );
            } catch (error) {
                if (error.name === 'ValidationError') {
                    const errorMessages = error.errors.join('\n'); // Lấy tất cả các lỗi từ Yup
                    alert(`Có lỗi xảy ra trong dữ liệu:\n${errorMessages}`);
                } else {
                    // Nếu là lỗi từ API hoặc các lỗi khác
                    this.$emit('reload-employees');
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) {
                        alert(error.response.data.message); // Hiển thị lỗi từ backend
                    } else {
                        alert('Có lỗi xảy ra. Vui lòng thử lại.');
                    }
                }
                this.$emit('reload-employees');
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
