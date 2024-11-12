import AdminLayout from '@/views/AdminLayout.vue';

import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/admin/',
        component: AdminLayout,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/views/Dashboard.vue'),
            },
            { path: 'dashboard', redirect: { name: 'dashboard' } },
            {
                path: 'books',
                name: 'books',
                props: (route) => ({
                    page: parseInt(route.query.page) || 1, // Default to page 1
                    limit: parseInt(route.query.limit) || 10, // Default to 10 items per page
                }),
                component: () => import('@/views/Books.vue'),
            },
            {
                path: 'books/create',
                name: 'books-create',
                component: () => import('@/views/BooksCreate.vue'),
            },
            {
                path: 'readers',
                name: 'readers',
                component: () => import('@/views/Readers.vue'),
            },
            {
                path: 'readers/create',
                name: 'readers-create',
                component: () => import('@/views/ReadersCreate.vue'),
            },
            {
                path: 'borrowings',
                name: 'borrowings',
                component: () => import('@/views/Borrowings.vue'),
            },
            {
                path: 'borrowings/create',
                name: 'borrowings-create',
                component: () => import('@/views/BorrowingsCreate.vue'),
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
                    limit: parseInt(route.query.limit) || 10, // Default to 10 items per page
                }),
                component: () => import('@/views/BooksPublic.vue'),
            },
        ],
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
