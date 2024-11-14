<template>
    <div class="d-flex justify-content-center align-items-center p-3">
        <div class="card p-4 shadow-sm">
            <h2 class="text-center mb-4">Chỉnh sửa thông tin</h2>
            <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="alert alert-success">
                {{ successMessage }}
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

                <button
                    type="submit"
                    class="btn btn-primary w-100"
                    :disabled="isSubmitting"
                >
                    Cập nhật
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import readerService from '@/services/reader.service';
import { ref } from 'vue';
import { mapGetters } from 'vuex';
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
            user: this.$store.state.user,
            errors: {},
            isSubmitting: false,
            errorMessage: '',
        };
    },
    computed: {
        ...mapGetters(['successMessage']), // Map success and error messages from Vuex
    },
    created() {
        this.fetchUser();
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
            });

            try {
                await schema.validate(this.form, { abortEarly: false });
                // If validation passes, proceed with the submission
                this.isSubmitting = true;
                // Simulate an API call
                await readerService.update(this.user._id, this.form);
                // Set the success message in Vuex
                this.$store.dispatch(
                    'setSuccessMessage',
                    'Cập nhật thông tin thành công'
                );
                // Route to the login page
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
                error.inner.forEach((error) => {
                    this.errors[error.path] = error.message;
                });
            } finally {
                this.isSubmitting = false;
            }
        },

        async fetchUser() {
            try {
                const response = await readerService.get(this.user._id);
                this.form = response;
            } catch (error) {
                console.log(error);
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
