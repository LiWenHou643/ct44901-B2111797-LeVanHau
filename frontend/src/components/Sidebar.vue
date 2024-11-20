<template>
    <div class="sidebar">
        <div class="sidebar-header">
            <h3>Quản lý sách</h3>
        </div>

        <ul class="nav-list">
            <li v-if="role === 'quanly'" class="nav-item">
                <router-link
                    :to="{ name: 'admin-books' }"
                    class="nav-link"
                    :class="{ active: isActive('admin-books') }"
                >
                    <i class="fa fa-book"></i> Sách
                </router-link>
            </li>

            <li v-if="role === 'nhanvien'" class="nav-item">
                <router-link
                    :to="{ name: 'admin-orders' }"
                    class="sub-nav-link"
                    :class="{ active: isActive('admin-orders') }"
                >
                    <i class="fa fa-exchange-alt"></i> Mượn sách
                </router-link>
            </li>

            <li v-if="role === 'quanly'" class="nav-item">
                <router-link
                    :to="{ name: 'employees' }"
                    class="sub-nav-link"
                    :class="{ active: isActive('employees') }"
                >
                    <i class="fa fa-id-badge"></i> Nhân viên
                </router-link>
            </li>

            <li class="nav-item logout">
                <a href="#" @click="logout" class="nav-link">
                    <i class="fa fa-sign-out-alt"></i> Logout
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapActions } from 'vuex'; // Import mapActions from Vuex
export default {
    data() {
        return {
            activeMenu: 'dashboard', // Tracks which menu is active
        };
    },
    computed: {
        user() {
            return this.$store.getters['auth/user'];
        },
        role() {
            return this.user?.quyen;
        },
    },
    methods: {
        toggleMenu(menu) {
            console.log('Current activeMenu:', this.activeMenu);
            this.activeMenu = this.activeMenu === menu ? null : menu; // Toggle active menu
        },
        isActive(menu) {
            // Check if the current route is the one related to the menu
            return (
                this.$route.name === menu ||
                (menu === 'dashboard' && this.$route.path === '/')
            );
        },
        logout() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.sidebar {
    width: 200px;
    height: 100vh;
    background-color: #f3f4f6;
    color: #111827;
    padding: 20px;
    position: fixed;
    z-index: 100;
}

.sidebar-header h3 {
    text-align: center;
    font-size: 24px;
    border-bottom: 1px solid #bebebe;
    padding: 5px 0 10px;
    margin-bottom: 30px;
}

.nav-list {
    list-style: none;
    padding: 0;
}

.nav-item {
    margin: 10px 0;
}

.nav-item a {
    color: #374151;
    text-decoration: none;
    font-weight: bold;
    display: block;
    padding: 10px;
    border-radius: 10px;
}

.nav-item a:hover,
.nav-item a.active {
    background-color: #212529;
    color: #f3f4f6;
}

.nav-item.logout {
    position: absolute;
    bottom: 10px; /* Push the logout button to the bottom */
    left: 50%;
    transform: translateX(-50%);
    width: 80%; /* Make the logout button take up full width */
    background-color: #a80b00; /* Red color for logout button */
    border-radius: 10px;
    transition: background-color 0.3s;
}

.nav-item.logout a {
    color: #f3f4f6;
}

.nav-item.logout a:hover {
    background-color: #d80e00; /* Darker red color on hover */
}

.nav-item a i {
    padding: 0 10px;
    width: 40px;
}

.sub-nav {
    list-style: none;
    padding-left: 20px;
}

.sub-nav li {
    margin: 5px 0;
}

.sub-nav li a {
    padding: 8px;
}

.sub-nav li a:hover {
    background-color: #555;
}
</style>
