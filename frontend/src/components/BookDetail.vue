<template>
    <div class="book">
        <h3>{{ book.tensach }}</h3>
        <!-- Book Title -->
        <p><strong>Author:</strong> {{ book.tacgia }}</p>
        <!-- Author -->
        <p><strong>Publisher:</strong> {{ book.nxb.tennxb }}</p>
        <!-- Publisher -->
        <p><strong>Publishing Year:</strong> {{ book.namxuatban }}</p>
        <!-- Year of Publication -->
        <p><strong>Price:</strong> {{ formattedPrice }}</p>
        <!-- Price (formatted) -->
        <p><strong>Stock:</strong> {{ book.soquyen }} copies</p>
        <!-- Available stock -->
        <p><strong>Publisher Address:</strong> {{ book.nxb.diachi }}</p>
        <!-- Publisher Address -->
    </div>
</template>

<script>
export default {
    name: 'BookDetail',
    props: {
        book: {
            type: Object,
            required: true,
        },
    },
    computed: {
        // Format the price as currency (you can adjust the locale or currency symbol if needed)
        formattedPrice() {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'VND', // Use your currency code here, for example 'USD', 'VND', etc.
            }).format(this.book.dongia);
        },
    },
};
</script>

<style scoped>
.book {
    border: 1px solid #ddd;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.book h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
}

.book p {
    font-size: 1rem;
    color: #555;
    margin: 5px 0;
}

.book p strong {
    color: #000;
}
</style>
