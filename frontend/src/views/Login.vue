<template>
    <div class="d-flex justify-content-center align-items-center">
        <div class="card p-4 shadow-sm" style="width: 100%; max-width: 400px">
            <h2 class="text-center mb-4">Đăng nhập</h2>
            <div v-if="successMessage" class="alert alert-success">
                {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
            </div>
            <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label for="dienthoai" class="form-label"
                        >Số điện thoại</label
                    >
                    <input
                        type="text"
                        id="dienthoai"
                        class="form-control"
                        v-model="dienthoai"
                        required
                    />
                </div>

                <div class="mb-3">
                    <label for="matkhau" class="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        id="matkhau"
                        class="form-control"
                        v-model="matkhau"
                        required
                    />
                </div>

                <!-- Submit Button -->
                <button
                    type="submit"
                    class="btn btn-primary w-100"
                    :disabled="isSubmitting"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import authService from '@/services/auth.service';
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            dienthoai: '',
            matkhau: '',
            errorMessage: '',
            isSubmitting: false,
        };
    },
    computed: {
        ...mapGetters('auth', ['successMessage']), // Map success and error messages from Vuex
    },
    methods: {
        ...mapActions('auth', ['login']),
        async handleSubmit() {
            this.isSubmitting = true;

            // Call API to login
            try {
                const user = await authService.login({
                    dienthoai: this.dienthoai,
                    matkhau: this.matkhau,
                });

                this.login(user); // Commit the user data to Vuex
                this.dienthoai = '';
                this.matkhau = '';
                this.errorMessage = '';
                if (user._id) {
                    if (user.quyen == 'quanly') {
                        this.$router.push('/admin');
                    } else if (user.quyen == 'nhanvien') {
                        this.$router.push('/staff');
                    } else {
                        this.$router.push('/home');
                    }
                }
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    this.errorMessage = error.response.data.message;
                    this.$store.commit('auth/setSuccessMessage', null);
                } else {
                    this.errorMessage =
                        'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
                }
            } finally {
                this.isSubmitting = false;
            }
        },
    },
};
</script>

<style scoped>
.invalid-feedback {
    font-size: 12px;
}

.alert {
    font-size: 14px;
}
</style>
