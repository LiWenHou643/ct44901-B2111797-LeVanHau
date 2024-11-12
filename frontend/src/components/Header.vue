<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
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
                            class="nav-link active"
                            to="/"
                            aria-current="page"
                        >
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/books">
                            Books
                        </router-link>
                    </li>
                    <!-- Login/Register Links -->
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">
                            Login
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/register">
                            Register
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
}
.navbar-nav .nav-link {
    font-size: 16px;
}

.navbar-light .navbar-toggler-icon {
    background-color: #000;
}
</style>
