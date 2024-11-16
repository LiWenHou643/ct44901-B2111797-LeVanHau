import store from '@/store'; // Import your store

import AdminLayout from '@/views/AdminLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/admin/',
        component: AdminLayout,
        meta: { requiresAdmin: true },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/views/Dashboard.vue'),
            },
            { path: 'dashboard', redirect: { name: 'dashboard' } },
            {
                path: 'books',
                name: 'admin-books',
                props: (route) => ({
                    page: parseInt(route.query.page) || 1, // Default to page 1
                    limit: parseInt(route.query.limit) || 8, // Default to 10 items per page
                }),
                component: () => import('@/views/AdminBook.vue'),
            },
            {
                path: 'books/create',
                name: 'books-create',
                component: () => import('@/views/BooksCreate.vue'),
            },
            {
                path: 'orders',
                name: 'admin-orders',
                component: () => import('@/views/AdminOrder.vue'),
            },
            {
                path: 'employees',
                name: 'employees',
                component: () => import('@/views/Employees.vue'),
            },
            {
                path: 'employees/create',
                name: 'employees-create',
                component: () => import('@/views/EmployeesCreate.vue'),
            },
        ],
    },
    {
        path: '/',
        component: () => import('@/views/AppLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/Home.vue'),
            },
            {
                path: 'home',
                redirect: { name: 'home' },
            },
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/Login.vue'),
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/Register.vue'),
            },
            {
                path: 'books',
                name: 'books-public',
                props: (route) => ({
                    page: parseInt(route.query.page) || 1, // Default to page 1
                    limit: parseInt(route.query.limit) || 12, // Default to 10 items per page
                }),
                component: () => import('@/views/Book.vue'),
            },
            {
                path: '/cart',
                name: 'cart',
                component: () => import('@/views/Cart.vue'),
            },
            {
                path: '/order',
                name: 'order',
                component: () => import('@/views/Order.vue'), // Your order page component
                meta: { requiresAuth: true }, // Mark this route as requiring authentication
            },
            {
                path: '/edit-profile',
                name: 'edit-profile',
                component: () => import('@/views/EditProfile.vue'), // Your profile page component
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*', // This matches any route not defined above
        name: 'PageNotFound',
        component: () => import('@/views/PageNotFound.vue'), // Path to your 404 component
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated'];
    const userRole = store.getters['auth/user']?.loai;
    // Check if the route requires authentication
    if (
        (to.meta.requiresAuth && !isAuthenticated) ||
        (to.meta.requiresAdmin && !isAuthenticated)
    ) {
        return next({ name: 'login' }); // Redirect to login if not authenticated
    }

    // Check if the route requires admin access
    if (to.meta.requiresAdmin && userRole !== 'nhanvien') {
        return next({ name: 'home' }); // Redirect to home if not an admin
    }

    next(); // Allow navigation if all checks pass
});

export default router;
