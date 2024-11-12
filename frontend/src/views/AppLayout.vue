<template>
    <div>
        <AppHeader />
        <div class="main">
            <router-view />
        </div>
        <AppFooter />
    </div>
</template>

<script>
import AppHeader from '@/components/Header.vue';
import AppFooter from '@/components/Footer.vue';

export default {
    components: {
        AppHeader,
        AppFooter,
    },
};
</script>

<style scoped>
.main {
    background-color: rgb(241, 241, 241);
}
</style>
