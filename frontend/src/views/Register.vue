<template>
    <div class="d-flex justify-content-center align-items-center p-3">
        <div class="card p-4 shadow-sm">
            <h2 class="text-center mb-4">Đăng ký tài khoản</h2>
            <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
            </div>
            <form @submit.prevent="handleSubmit">
                <div class="row mb-3">
                    <div class="col">
                        <label for="holot" class="form-label">Họ lót</label>
                        <input
                            type="text"
                            id="holot"
                            class="form-control"
                            v-model="form.holot"
                        />
                        <div v-if="errors.holot" class="text-danger">
                            {{ errors.holot }}
                        </div>
                    </div>
                    <div class="col">
                        <label for="ten" class="form-label">Tên</label>
                        <input
                            type="text"
                            id="ten"
                            class="form-control"
                            v-model="form.ten"
                        />
                        <div v-if="errors.ten" class="text-danger">
                            {{ errors.ten }}
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col">
                        <label for="ngaysinh" class="form-label"
                            >Ngày sinh</label
                        >
                        <VueDatePicker
                            v-model="form.ngaysinh"
                            :format="format"
                            placeholder="dd/mm/yyyy"
                        ></VueDatePicker>
                        <div v-if="errors.ngaysinh" class="text-danger">
                            {{ errors.ngaysinh }}
                        </div>
                    </div>
                    <div class="col">
                        <label for="phai" class="form-label">Giới tính</label>
                        <select
                            id="phai"
                            class="form-select"
                            v-model="form.phai"
                        >
                            <option value="" disabled selected>
                                Chọn giới tính
                            </option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                        <div v-if="errors.phai" class="text-danger">
                            {{ errors.phai }}
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col">
                        <label for="dienthoai" class="form-label"
                            >Số điện thoại</label
                        >
                        <input
                            type="text"
                            id="dienthoai"
                            class="form-control"
                            v-model="form.dienthoai"
                        />
                        <div v-if="errors.dienthoai" class="text-danger">
                            {{ errors.dienthoai }}
                        </div>
                    </div>
                    <div class="col">
                        <label for="diachi" class="form-label">Địa chỉ</label>
                        <input
                            type="text"
                            id="diachi"
                            class="form-control"
                            v-model="form.diachi"
                        />
                        <div v-if="errors.diachi" class="text-danger">
                            {{ errors.diachi }}
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col">
                        <label for="matkhau" class="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            id="matkhau"
                            class="form-control"
                            v-model="form.matkhau"
                        />
                        <div v-if="errors.matkhau" class="text-danger">
                            {{ errors.matkhau }}
                        </div>
                    </div>
                    <div class="col">
                        <label for="xacnhanmatkhau" class="form-label"
                            >Xác nhận mật khẩu</label
                        >
                        <input
                            type="password"
                            id="xacnhanmatkhau"
                            class="form-control"
                            v-model="form.xacnhanmatkhau"
                        />
                        <div v-if="errors.xacnhanmatkhau" class="text-danger">
                            {{ errors.xacnhanmatkhau }}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    class="btn btn-primary w-100"
                    :disabled="isSubmitting"
                >
                    Đăng ký
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import readerService from '@/services/reader.service';
import { ref } from 'vue';
import * as Yup from 'yup';

export default {
    data() {
        return {
            form: {
                holot: '',
                ten: '',
                ngaysinh: ref(null),
                phai: '',
                dienthoai: '',
                diachi: '',
                matkhau: '',
                xacnhanmatkhau: '',
            },
            errors: {},
            isSubmitting: false,
            errorMessage: '',
        };
    },
    methods: {
        format(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        },
        async handleSubmit() {
            this.errors = {}; // Clear previous errors
            const schema = Yup.object().shape({
                holot: Yup.string().required('Họ lót bạn không được để trống'),
                ten: Yup.string().required('Tên bạn không được để trống'),
                ngaysinh: Yup.date()
                    .required('Ngày sinh không được để trống')
                    .transform((value) => (value === '' ? null : value))
                    .typeError('Ngày sinh không được để trống'),
                phai: Yup.string().required('Giới tính không được để trống'),
                dienthoai: Yup.string()
                    .matches(/^\d+$/, 'Số điện thoại phải là số  hợp lệ')
                    .required('Số điện thoại không được để trống'),
                diachi: Yup.string().required('Địa chỉ không được để trống'),
                matkhau: Yup.string()
                    .min(6, 'Mật khẩu tối thiểu 6 kí tự')
                    .required('Mật khẩu không được để trống'),
                xacnhanmatkhau: Yup.string()
                    .oneOf(
                        [Yup.ref('matkhau'), null],
                        'Xác nhận mật khẩu không khớp'
                    )
                    .required('Xác nhận mật khẩu không được để trống'),
            });

            try {
                await schema.validate(this.form, { abortEarly: false });
                // If validation passes, proceed with the submission
                this.isSubmitting = true;
                // Simulate an API call
                await readerService.create(this.form);
                // Set the success message in Vuex
                this.$store.dispatch(
                    'auth/setSuccessMessage',
                    'Đăng ký thành công'
                );
                // Route to the login page
                this.$router.push('/login');
            } catch (error) {
                console.log(error);

                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    // If the backend sends an error message, display it
                    this.errorMessage = error.response.data.message; // Show the error message returned by the backend
                }

                // If validation fails, store errors
                error?.inner?.forEach((error) => {
                    this.errors[error.path] = error.message;
                });
            } finally {
                this.isSubmitting = false;
            }
        },
    },
};
</script>

<style scoped>
.text-danger {
    font-size: 0.875rem;
    color: red;
}
</style>
