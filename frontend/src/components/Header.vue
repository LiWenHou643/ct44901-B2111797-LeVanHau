<template>
    <nav class="navbar navbar-expand-lg shadow-sm">
        <div class="container-fluid">
            <!-- Logo/Brand -->
            <router-link class="navbar-brand" to="/"
                >Ứng dụng quản lý mượn sách</router-link
            >

            <!-- Hamburger Menu for small screens -->
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar Links -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :class="{ active: $route.path === '/' }"
                            to="/"
                            aria-current="page"
                        >
                            Trang chủ
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :class="{ active: $route.path === '/books' }"
                            to="/books"
                        >
                            Sách
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :class="{ active: $route.path === '/cart' }"
                            :to="{ name: 'cart' }"
                        >
                            Giỏ mượn {{}}
                        </router-link>
                    </li>
                    <li v-if="!user" class="nav-item">
                        <router-link class="nav-link custom-link" to="/login">
                            Đăng nhập
                        </router-link>
                    </li>
                    <li v-if="!user" class="nav-item">
                        <router-link
                            class="nav-link custom-link"
                            to="/register"
                        >
                            Đăng ký
                        </router-link>
                    </li>

                    <li v-if="user" class="nav-item">
                        <!-- Clickable username to show/hide the menu -->
                        <span @click="toggleMenu" class="user-name">
                            {{ user.hoten }}
                        </span>

                        <!-- User menu (edit profile and logout) -->
                        <div v-if="isMenuVisible" class="user-menu">
                            <ul>
                                <li>
                                    <router-link
                                        class="nav-link custom-link"
                                        to="/edit-profile"
                                        @click="toggleMenu"
                                    >
                                        Chỉnh sửa hồ sơ
                                    </router-link>
                                </li>
                                <li>
                                    <button
                                        @click="logout"
                                        class="nav-link custom-link"
                                    >
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'Header',
    data() {
        return {
            isMenuVisible: false,
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'user']), // Map user and authentication status
    },
    methods: {
        ...mapActions(['logout']), // Map the logout action from Vuex
        toggleMenu() {
            this.isMenuVisible = !this.isMenuVisible;
        },
        // Handle logout action
        logout() {
            // Perform logout logic, such as clearing user data and redirecting
            this.$store.dispatch('logout');
            localStorage.removeItem('cart');
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
/* Optional: Custom Styling for the header if needed */
.navbar {
    padding: 1rem;
    background-color: #ffffff;
}
.navbar-nav .nav-link {
    font-size: 18px;
}

.nav-item {
    display: flex;
    align-items: center;
}

.custom-link {
    border-radius: 5px;
    margin: 4px;
    font-weight: bold;
    border: 1px solid #007bff;
    transition: background-color 0.3s ease;
}

.custom-link:hover {
    background-color: #85c0ffff; /* Darker blue on hover */
}

/* Add styling for the user menu */
.user-name {
    cursor: pointer;
    border: 1px solid #007bff;
    border-radius: 5px;
    padding: 5px;
}

.user-menu {
    position: absolute;
    z-index: 1;
    right: 0;
    top: 80%;
    width: 200px;
    background-color: white;
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 5px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.user-menu li {
    padding: 0px 0;
}

.nav-link.custom-link {
    text-decoration: none;
    color: #333;
    background: none;
    border: none;
    cursor: pointer;
}

.nav-link.custom-link:hover {
    color: #007bff;
}
</style>
