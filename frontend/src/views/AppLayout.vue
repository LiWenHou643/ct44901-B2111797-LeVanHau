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
import AppFooter from '@/components/Footer.vue';
import AppHeader from '@/components/Header.vue';

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
    min-height: calc(100vh - 224px);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
