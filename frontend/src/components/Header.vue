<template>
    <nav class="navbar navbar-expand-lg shadow-sm">
        <div class="container-fluid">
            <!-- Logo/Brand -->
            <a class="navbar-brand" href="#">MyApp</a>

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
                    <!-- Login/Register Links -->
                    <li class="nav-item">
                        <router-link class="nav-link custom-link" to="/login">
                            Đăng nhập
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link custom-link"
                            to="/register"
                        >
                            Đăng ký
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Header',
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
</style>
