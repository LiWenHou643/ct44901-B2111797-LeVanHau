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
                name: 'admin-books',
                props: (route) => ({
                    page: parseInt(route.query.page) || 1, // Default to page 1
                    limit: parseInt(route.query.limit) || 8, // Default to 10 items per page
                }),
                component: () => import('@/views/AdminBook.vue'),
            },
            { path: 'books', redirect: { name: 'admin-books' } },
            {
                path: '/books/create', // Route to create a new book
                name: 'create-book',
                component: () => import('@/views/BooksEdit.vue'), // Use the same BookForm component for creating
                props: false, // Pass no params, since this is for creating
            },
            {
                path: '/books/:id/edit', // Route to edit an existing book
                name: 'edit-book',
                component: () => import('@/views/BooksEdit.vue'), // Reuse the same BookForm component for editing
                props: true, // Pass the `id` as a prop to the component
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
        path: '/staff/',
        component: AdminLayout,
        meta: { requiresStaff: true },
        children: [
            {
                path: 'orders',
                name: 'admin-orders',
                component: () => import('@/views/AdminOrder.vue'),
            },
            {
                path: '',
                redirect: { name: 'admin-orders' },
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
                path: 'books/:id',
                name: 'book-detail',
                component: () => import('@/views/BookDetail.vue'),
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
    {
        path: '/forbidden',
        name: 'forbidden',
        component: () => import('@/views/Forbidden.vue'), // Path to your 403 component
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated'];
    const userRole = store.getters['auth/user']?.quyen;
    // Check if the route requires authentication
    if (
        (to.meta.requiresAuth && !isAuthenticated) ||
        (to.meta.requiresAdmin && !isAuthenticated)
    ) {
        return next({ name: 'login' }); // Redirect to login if not authenticated
    }

    // Check if the route requires admin access
    if (to.meta.requiresAdmin && userRole !== 'quanly') {
        next({ name: 'forbidden' });
    }

    // Check if the route requires staff access
    if (to.meta.requiresStaff && userRole !== 'nhanvien') {
        next({ name: 'forbidden' });
    }

    next(); // Allow navigation if all checks pass
});

export default router;
