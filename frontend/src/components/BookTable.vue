<template>
    <table class="table">
        <thead>
            <tr>
                <th @click="sortTable('tensach')">
                    Tên sách
                    <span v-if="sortBy === 'tensach'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('tacgia')">
                    Tác giả
                    <span v-if="sortBy === 'tacgia'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('nxb.tennxb')">
                    Nhà xuất bản
                    <span v-if="sortBy === 'nxb.tennxb'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('dongia')">
                    Đơn giá
                    <span v-if="sortBy === 'dongia'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('soquyen')">
                    Số quyển
                    <span v-if="sortBy === 'soquyen'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('namxuatban')">
                    Năm xuất bản
                    <span v-if="sortBy === 'namxuatban'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('nxb.diachi')">
                    Publisher Address
                    <span v-if="sortBy === 'nxb.diachi'">
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
            <tr v-for="book in sortedBooks" :key="book.masach">
                <td>{{ book.tensach }}</td>
                <td>{{ book.tacgia }}</td>
                <td>{{ book.nxb.tennxb }}</td>
                <td>{{ formattedPrice(book.dongia) }}</td>
                <td>{{ book.soquyen }}</td>
                <td>{{ book.namxuatban }}</td>
                <td>{{ book.nxb.diachi }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'BookTable',
    props: {
        books: Array,
    },
    data() {
        return {
            sortBy: '',
            sortOrder: 'asc',
        };
    },
    computed: {
        sortedBooks() {
            return this.books.slice().sort((a, b) => {
                const fieldA = this.getNestedValue(a, this.sortBy);
                const fieldB = this.getNestedValue(b, this.sortBy);

                if (fieldA === fieldB) return 0;
                console.log(this.sortOrder);

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
            // Toggle the sort order if clicking on the same column again
            if (this.sortBy === field) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortBy = field;
                this.sortOrder = 'asc'; // Default to ascending order when switching columns
            }
        },
        // Helper method to get nested object values, e.g., 'nxb.tennxb'
        getNestedValue(object, path) {
            return path
                .split('.')
                .reduce((obj, key) => obj && obj[key], object);
        },
        // Format price as currency
        formattedPrice(price) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'VND', // Change this to USD or other currency if needed
            }).format(price);
        },
    },
};
</script>
