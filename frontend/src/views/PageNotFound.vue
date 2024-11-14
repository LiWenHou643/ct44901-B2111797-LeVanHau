<!-- src/views/PageNotFound.vue -->
<template>
    <div class="page-not-found">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <router-link to="/">Go to Home</router-link>
    </div>
</template>

<script>
export default {
    name: 'PageNotFound',
};
</script>

<style scoped>
.page-not-found {
    text-align: center;
    padding: 50px;
}
.page-not-found h1 {
    font-size: 3em;
    color: red;
}
</style>
