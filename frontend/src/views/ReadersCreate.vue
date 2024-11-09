<template>
    <div class="form-container">
        <div class="form-card">
            <h2 class="form-title">Thêm Đ</h2>

            <form @submit.prevent="submitForm" class="form">
                <div class="form-group">
                    <label for="holot"> Họ </label>
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input
                            type="text"
                            id="holot"
                            v-model="reader.holot"
                            placeholder="Nhập họ"
                            @input="validateField('holot')"
                            required
                        />
                    </div>
                    <span v-if="errors.holot" class="error-message">{{
                        errors.holot
                    }}</span>
                </div>

                <div class="form-group">
                    <label for="ten"> Tên </label>
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input
                            type="password"
                            id="ten"
                            v-model="reader.ten"
                            placeholder="Nhập tên"
                            @input="validateField('ten')"
                            required
                        />
                    </div>
                    <span v-if="errors.ten" class="error-message">{{
                        errors.ten
                    }}</span>
                </div>

                <div class="form-group">
                    <label for="ngaysinh"> Ngày sinh </label>
                    <div class="input-group">
                        <i class="fas fa-calendar-alt"></i>
                        <input
                            type="text"
                            id="ngaysinh"
                            v-model="reader.ngaysinh"
                            @input="validateField('ngaysinh')"
                            placeholder="dd/mm/yyyy"
                            maxlength="10"
                            required
                            ref="ngaysinh"
                        />
                    </div>
                    <span v-if="errors.ngaysinh" class="error-message">{{
                        errors.ngaysinh
                    }}</span>
                </div>

                <div class="form-group">
                    <label for="phai"> Giới tính </label>
                    <div class="input-group">
                        <i class="fas fa-venus"></i>
                        <input
                            type="text"
                            id="phai"
                            v-model="reader.phai"
                            placeholder="Chọn giới tính"
                            required
                            readonly
                        />
                    </div>
                    <span v-if="errors.phai" class="error-message">{{
                        errors.phai
                    }}</span>
                </div>

                <div class="form-group">
                    <label for="diachi"> Địa chỉ </label>
                    <div class="input-group">
                        <i class="fas fa-map-marker-alt"></i>
                        <input
                            type="text"
                            id="diachi"
                            v-model="reader.diachi"
                            placeholder="Nhập địa chỉ"
                            @input="validateField('diachi')"
                            required
                        />
                    </div>
                    <span v-if="errors.diachi" class="error-message">{{
                        errors.diachi
                    }}</span>
                </div>

                <div class="form-group">
                    <label for="dienthoai"> Điện thoại </label>
                    <div class="input-group">
                        <i class="fas fa-phone-alt"></i>
                        <input
                            type="text"
                            id="dienthoai"
                            v-model="reader.dienthoai"
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
                    <i class="fas fa-save"></i> Lưu đọc giả
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import * as Yup from 'yup';
export default {
    name: 'EmployeeForm',
    data() {
        return {
            reader: {
                holot: '',
                ten: '',
                ngaysinh: '',
                phai: '',
                diachi: '',
                dienthoai: '',
            },
            errors: {},
            isSubmitting: false,
            isValid: false,
        };
    },
    computed: {
        validationSchema() {
            return Yup.object({
                holot: Yup.string().required('Họ là bắt buộc'),
                ten: Yup.string().required('Tên là bắt buộc'),
                ngaysinh: Yup.string()
                    .matches(
                        /^\d{2}\/\d{2}\/\d{4}$/,
                        'Ngày sinh phải theo định dạng dd/mm/yyyy'
                    ) // Ensure the format is dd/mm/yyyy
                    .test(
                        'is-valid-date',
                        'Ngày sinh không hợp lệ',
                        (value) => {
                            // Check if the date is valid
                            if (!value) return true; // Skip validation if value is empty

                            const [day, month, year] = value
                                .split('/')
                                .map(Number);
                            const date = new Date(year, month - 1, day); // month is 0-based in JS Date
                            return (
                                date.getFullYear() === year &&
                                date.getMonth() === month - 1 &&
                                date.getDate() === day
                            ); // Validate that the date is valid
                        }
                    )
                    .required('Ngày sinh là bắt buộc'),
                phai: Yup.string().required('Giới tính là bắt buộc'),
                diachi: Yup.string().required('Địa chỉ là bắt buộc'),
                dienthoai: Yup.string()
                    .matches(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số')
                    .required('Điện thoại là bắt buộc'),
            });
        },
    },
    methods: {
        async validateField(field) {
            try {
                // Validate the specific field
                await this.validationSchema.validateAt(field, this.reader);

                // Instead of using this.$set, directly assign to errors
                this.errors[field] = null; // Clear error if valid
            } catch (err) {
                // Update errors directly
                this.errors[field] = err.message; // Set error message
            }
            this.validateForm(); // Validate the entire form
        },
        validateForm() {
            // Ensure form is valid
            this.isValid = Object.values(this.errors).every(
                (error) => error === null
            );
        },
        async submitForm() {
            try {
                // Submit the form after validating all fields
                await this.validationSchema.validate(this.reader, {
                    abortEarly: false,
                });
                alert('Form Submitted!');
            } catch (err) {
                console.error(err);
            }
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
