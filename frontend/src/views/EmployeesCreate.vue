<template>
    <div class="form-container">
        <div class="form-card">
            <h2 class="form-title">Thêm Nhân Viên</h2>

            <form @submit.prevent="submitForm" ref="form" class="form">
                <!-- Full Name -->
                <div class="form-group">
                    <label for="hotennv"> Họ và tên </label>
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input
                            type="text"
                            id="hotennv"
                            v-model="employee.hotennv"
                            placeholder="Nhập họ và tên"
                            @input="validateField('hotennv')"
                            required
                        />
                    </div>
                    <span v-if="errors.hotennv" class="error-message">{{
                        errors.hotennv
                    }}</span>
                </div>

                <!-- Position -->
                <div class="form-group">
                    <label for="chucvu"> Chức vụ </label>
                    <div class="input-group">
                        <i class="fas fa-briefcase"></i>
                        <input
                            type="text"
                            id="chucvu"
                            v-model="employee.chucvu"
                            placeholder="Chọn chức vụ"
                            required
                            readonly
                        />
                    </div>
                    <span v-if="errors.chucvu" class="error-message">{{
                        errors.chucvu
                    }}</span>
                </div>

                <!-- Address -->
                <div class="form-group">
                    <label for="diachi"> Địa chỉ </label>
                    <div class="input-group">
                        <i class="fas fa-map-marker-alt"></i>
                        <input
                            type="text"
                            id="diachi"
                            v-model="employee.diachi"
                            placeholder="Nhập địa chỉ"
                            @input="validateField('diachi')"
                            required
                        />
                    </div>
                    <span v-if="errors.diachi" class="error-message">{{
                        errors.diachi
                    }}</span>
                </div>

                <!-- Phone -->
                <div class="form-group">
                    <label for="dienthoai"> Điện thoại </label>
                    <div class="input-group">
                        <i class="fas fa-phone-alt"></i>
                        <input
                            type="text"
                            id="dienthoai"
                            v-model="employee.dienthoai"
                            placeholder="Nhập số điện thoại"
                            @input="validateField('dienthoai')"
                            required
                        />
                    </div>
                    <span v-if="errors.dienthoai" class="error-message">{{
                        errors.dienthoai
                    }}</span>
                </div>

                <!-- Submit Button -->
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!isValid"
                >
                    <i class="fas fa-save"></i> Lưu Nhân Viên
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import employeeService from '@/services/employee.service';
import * as yup from 'yup';

export default {
    name: 'EmployeeForm',
    data() {
        return {
            employee: {
                hotennv: '',
                chucvu: 'Nhân viên',
                diachi: '',
                dienthoai: '',
            },
            errors: {},
            isSubmitting: false,
            isValid: false,
        };
    },
    watch: {
        // Watch for changes in the employee object and validate on change
        employee: {
            handler() {
                this.isValid = this.validateForm(); // Revalidate when the employee data changes
            },
            deep: true, // Watch for changes in nested objects like employee
        },
    },
    methods: {
        // Handle form submission
        async submitForm() {
            // First, validate the form
            if (!this.isValid) return;

            this.isSubmitting = true;
            try {
                await employeeService.create({
                    ...this.employee,
                    matkhau: this.generateRandomPassword(),
                });
                alert('Nhân viên được thêm thành công.');
                this.$router.push({ name: 'employees' });
            } catch (error) {
                // Handle the error response from the backend
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    // If the backend sends an error message, display it
                    alert(error.response.data.message); // Show the error message returned by the backend
                } else {
                    // Generic error message if no specific error response is received
                    alert('Có lỗi xảy ra. Vui lòng thử lại.');
                }
            } finally {
                this.isSubmitting = false;
            }
        },

        generateRandomPassword() {
            // Generate a random number between 100000 and 999999
            const randomNumber = Math.floor(100000 + Math.random() * 900000);
            return randomNumber.toString();
        },

        // Validate the form using yup
        validateForm() {
            this.errors = {}; // Clear existing errors
            let isValid = true;

            // Validation schema using Yup
            const schema = yup.object({
                hotennv: yup
                    .string()
                    .min(3, 'Họ và tên phải có ít nhất 3 ký tự')
                    .required('Họ và tên là bắt buộc'),
                chucvu: yup.string().required('Chức vụ là bắt buộc'),
                dienthoai: yup
                    .string()
                    .matches(/^(\+84|0)\d{9}$/, 'Số điện thoại không hợp lệ'),
                diachi: yup
                    .string()
                    .min(10, 'Địa chỉ phải có ít nhất 10 ký tự')
                    .required('Địa chỉ là bắt buộc'),
            });

            try {
                // Try to validate the form data with Yup schema
                schema.validateSync(this.employee, { abortEarly: false });
            } catch (err) {
                // If validation fails, loop through the errors and add them to errors object
                err.inner.forEach((error) => {
                    this.errors[error.path] = error.message;
                    isValid = false;
                });
            }

            return isValid;
        },
    },
};
</script>

<style scoped>
.error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}
</style>
