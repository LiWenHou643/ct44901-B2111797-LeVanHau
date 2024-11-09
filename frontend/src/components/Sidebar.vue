<template>
    <div class="sidebar">
        <div class="sidebar-header">
            <h3>Quản lý sách</h3>
        </div>

        <ul class="nav-list">
            <li class="nav-item">
                <router-link
                    to="/"
                    class="nav-link"
                    :class="{ active: isActive('dashboard') }"
                >
                    <i class="fa fa-tachometer-alt"></i> Thống kê
                </router-link>
            </li>

            <li class="nav-item">
                <router-link
                    :to="{ name: 'books' }"
                    class="nav-link"
                    :class="{ active: isActive('books') }"
                >
                    <i class="fa fa-book"></i> Sách
                </router-link>
            </li>

            <li class="nav-item">
                <router-link
                    :to="{ name: 'readers' }"
                    class="nav-link"
                    :class="{ active: isActive('readers') }"
                >
                    <i class="fa fa-users"></i> Đọc giả
                </router-link>
            </li>

            <li class="nav-item">
                <router-link
                    :to="{ name: 'borrowings' }"
                    class="sub-nav-link"
                    :class="{ active: isActive('borrowings') }"
                >
                    <i class="fa fa-exchange-alt"></i> Mượn sách
                </router-link>
            </li>

            <li class="nav-item">
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
export default {
    data() {
        return {
            activeMenu: 'dashboard', // Tracks which menu is active
        };
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
            // Handle the logout logic (e.g., clear session, redirect, etc.)
            console.log('Logging out...');
        },
    },
};
</script>

<style scoped>
.sidebar {
    width: 250px;
    height: 100vh;
    background-color: #f3f4f6;
    color: #111827;
    padding: 20px;
    position: fixed;
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
