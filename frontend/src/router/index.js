import AppLayout from '@/views/AppLayout.vue';

import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/views/Dashboard.vue'),
            },
            {
                path: 'books',
                name: 'books',
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
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
