<template>
    <table class="table">
        <thead>
            <tr>
                <th @click="sortTable('madocgia')">
                    Mã đọc giả
                    <span v-if="sortBy === 'madocgia'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('masach')">
                    Mã sách
                    <span v-if="sortBy === 'masach'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('msnv')">
                    Mã nhân viên
                    <span v-if="sortBy === 'msnv'">
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
            </tr>
        </thead>
        <tbody>
            <tr v-for="borrowing in sortedBorrowings" :key="borrowing._id">
                <td>{{ borrowing.madocgia }}</td>
                <td>{{ borrowing.masach }}</td>
                <td>{{ borrowing.msnv }}</td>
                <td>{{ borrowing.ngaymuon }}</td>
                <td>{{ borrowing.ngaytra }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
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
    },
};
</script>

<style scoped></style>
