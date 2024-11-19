<template>
    <div>
        <h1>403 - Forbidden</h1>
        <p>Không có quyền truy cập trang này.</p>

        <!-- Nút Trở lại -->
        <button @click="goBack">Trở lại</button>
    </div>
</template>

<script>
export default {
    name: 'Forbidden',
    methods: {
        goBack() {
            // Sử dụng window.history.back() để quay lại trang trước đó
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Nếu không có lịch sử (hoặc là trang đầu tiên), điều hướng về trang chính
                this.$router.push({ name: 'Home' });
            }
        },
    },
};
</script>

<style scoped>
/* Thêm style nếu cần */
button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
