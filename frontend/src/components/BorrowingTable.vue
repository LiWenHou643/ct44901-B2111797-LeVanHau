<template>
    <table class="table">
        <thead>
            <tr>
                <th @click="sortTable('hotendocgia')">
                    Họ tên đọc giả
                    <span v-if="sortBy === 'hotendocgia'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('tuasacj')">
                    Tựa sách
                    <span v-if="sortBy === 'tuasach'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('hotennv')">
                    Nhân viên
                    <span v-if="sortBy === 'hotennv'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('ngaymuon')">
                    Ngày mượn
                    <span v-if="sortBy === 'ngaymuon'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('ngaytra')">
                    Ngày trả
                    <span v-if="sortBy === 'ngaytra'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="borrowing in sortedBorrowings" :key="borrowing._id">
                <td>{{ borrowing.hotendocgia }}</td>
                <td>{{ borrowing.tensach }}</td>
                <td>{{ borrowing.hotennhanvien }}</td>
                <td>{{ borrowing.ngaymuon }}</td>
                <td>{{ borrowing.ngaytra }}</td>
                <td>
                    <button
                        class="btn btn-success"
                        v-if="!borrowing.ngaytra"
                        @click="submitReturn(borrowing)"
                    >
                        {{ 'Trả' }}
                    </button>
                    <button
                        class="btn btn-danger"
                        v-else
                        @click="deleteBorrow(borrowing)"
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import borrowService from '@/services/borrow.service';
export default {
    name: 'BorrowingTable',
    props: {
        borrowings: Array,
    },
    data() {
        return {
            sortBy: '', // Field to sort by
            sortOrder: 'asc', // Sort order: 'asc' or 'desc'
        };
    },
    computed: {
        sortedBorrowings() {
            return this.borrowings.slice().sort((a, b) => {
                const fieldA = this.getNestedValue(a, this.sortBy);
                const fieldB = this.getNestedValue(b, this.sortBy);

                if (fieldA === fieldB) return 0;

                if (this.sortOrder === 'asc') {
                    return fieldA < fieldB ? -1 : 1;
                } else {
                    return fieldA < fieldB ? 1 : -1;
                }
            });
        },
    },
    methods: {
        // Method to sort the table when clicking on header
        sortTable(field) {
            if (this.sortBy === field) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortBy = field;
                this.sortOrder = 'asc'; // Default to ascending order when switching columns
            }
        },
        getNestedValue(object, path) {
            return path
                .split('.')
                .reduce((obj, key) => obj && obj[key], object);
        },

        // Save the updated borrow to the server
        async submitReturn(borrow) {
            try {
                await borrowService.update(borrow._id, {
                    ngaytra: this.formatDate(new Date()),
                });
                alert(`Trả thành công`);
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    alert(error.response.data.message); // Hiển thị lỗi từ backend
                } else {
                    alert('Có lỗi xảy ra. Vui lòng thử lại.');
                }
            } finally {
                this.$emit('reload-borrowings');
            }
        },

        // Delete a borrow from the server
        deleteBorrow(borrow) {
            if (confirm(`Xác nhận xoá phiếu mượn này?`)) {
                borrowService
                    .delete(borrow._id)
                    .then(() => {
                        alert(`Xoá phiếu mượn thành công!`);
                        this.$emit('reload-borrowings');
                    })
                    .catch((error) => {
                        console.error('Có lỗi khi xoá:', error);
                    });
            }
        },

        formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits (e.g., 01, 02)
            const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so add 1
            const year = date.getFullYear();
            return `${day}/${month}/${year}`; // Return in dd/mm/yyyy format
        },
    },
};
</script>

<style scoped></style>
