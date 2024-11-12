<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div
            class="login-form card p-4 shadow-sm"
            style="width: 100%; max-width: 400px"
        >
            <h2 class="text-center mb-4">Login</h2>

            <form @submit.prevent="handleSubmit">
                <!-- Username Field -->
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        class="form-control"
                        v-model="username"
                        :class="{ 'is-invalid': errors.username }"
                        required
                    />
                    <div v-if="errors.username" class="invalid-feedback">
                        {{ errors.username }}
                    </div>
                </div>

                <!-- Password Field -->
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        class="form-control"
                        v-model="password"
                        :class="{ 'is-invalid': errors.password }"
                        required
                    />
                    <div v-if="errors.password" class="invalid-feedback">
                        {{ errors.password }}
                    </div>
                </div>

                <!-- Submit Button -->
                <button
                    type="submit"
                    class="btn btn-primary w-100"
                    :disabled="isSubmitting"
                >
                    Login
                </button>

                <!-- Form Status -->
                <div
                    v-if="formStatus"
                    :class="
                        formStatus.success
                            ? 'alert alert-success'
                            : 'alert alert-danger'
                    "
                    class="mt-3"
                >
                    {{ formStatus.message }}
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            errors: {
                username: '',
                password: '',
            },
            formStatus: null,
            isSubmitting: false,
        };
    },
    methods: {
        handleSubmit() {
            this.errors.username = '';
            this.errors.password = '';
            this.formStatus = null;

            // Basic validation
            if (this.username.trim() === '') {
                this.errors.username = 'Username is required';
            }

            if (this.password.trim() === '') {
                this.errors.password = 'Password is required';
            }

            if (this.errors.username || this.errors.password) {
                return;
            }

            this.isSubmitting = true;

            // Simulate a login request (you can replace this with an actual API call)
            setTimeout(() => {
                this.isSubmitting = false;
                if (this.username === 'user' && this.password === 'password') {
                    this.formStatus = {
                        success: true,
                        message: 'Login successful!',
                    };
                    // Redirect or handle success (e.g., store authentication token)
                } else {
                    this.formStatus = {
                        success: false,
                        message: 'Invalid username or password',
                    };
                }
            }, 1000);
        },
    },
};
</script>

<style scoped>
/* Optionally customize your styles here if needed */
.login-form {
    max-width: 400px;
    width: 100%;
}

.invalid-feedback {
    font-size: 12px;
}

.alert {
    font-size: 14px;
}
</style>
