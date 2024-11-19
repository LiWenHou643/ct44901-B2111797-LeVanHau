<template>
    <div class="layout">
        <Sidebar />
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
    components: {
        Sidebar,
    },
};
</script>

<style scoped>
.layout {
    display: flex;
}

.content {
    margin-left: 190px; /* Same width as the sidebar */
    padding: 20px;
    flex-grow: 1;
}
</style>
