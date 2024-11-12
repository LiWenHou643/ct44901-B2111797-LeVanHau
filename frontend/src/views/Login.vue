<template>
    <div class="d-flex justify-content-center align-items-center">
        <div class="card p-4 shadow-sm" style="width: 100%; max-width: 400px">
            <h2 class="text-center mb-4">Đăng nhập</h2>
            <div v-if="message" class="alert alert-success">{{ message }}</div>
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
                        type="matkhau"
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
import { useRoute } from 'vue-router';
export default {
    data() {
        return {
            dienthoai: '',
            matkhau: '',
            message: '',
            isSubmitting: false,
        };
    },
    setup() {
        const route = useRoute();
        const message = route.query.message || '';
        return { message };
    },
    methods: {
        handleSubmit() {
            this.isSubmitting = true;
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
