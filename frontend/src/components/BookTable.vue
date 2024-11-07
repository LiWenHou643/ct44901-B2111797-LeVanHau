<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th @click="sortTable('tensach')">
                        Book Title
                        <span v-if="sortBy === 'tensach'">
                            <i
                                v-if="sortOrder === 'asc'"
                                class="fa fa-arrow-up"
                            ></i>
                            <i v-else class="fa fa-arrow-down"></i>
                        </span>
                    </th>
                    <th @click="sortTable('tacgia')">
                        Author
                        <span v-if="sortBy === 'tacgia'">
                            <i
                                v-if="sortOrder === 'asc'"
                                class="fa fa-arrow-up"
                            ></i>
                            <i v-else class="fa fa-arrow-down"></i>
                        </span>
                    </th>
                    <th @click="sortTable('nxb.tennxb')">
                        Publisher
                        <span v-if="sortBy === 'nxb.tennxb'">
                            <i
                                v-if="sortOrder === 'asc'"
                                class="fa fa-arrow-up"
                            ></i>
                            <i v-else class="fa fa-arrow-down"></i>
                        </span>
                    </th>
                    <th @click="sortTable('dongia')">
                        Price
                        <span v-if="sortBy === 'dongia'">
                            <i
                                v-if="sortOrder === 'asc'"
                                class="fa fa-arrow-up"
                            ></i>
                            <i v-else class="fa fa-arrow-down"></i>
                        </span>
                    </th>
                    <th @click="sortTable('soquyen')">
                        Stock
                        <span v-if="sortBy === 'soquyen'">
                            <i
                                v-if="sortOrder === 'asc'"
                                class="fa fa-arrow-up"
                            ></i>
                            <i v-else class="fa fa-arrow-down"></i>
                        </span>
                    </th>
                    <th @click="sortTable('namxuatban')">
                        Publishing Year
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
    </div>
</template>

<script>
export default {
    name: 'BookTable',
    props: {
        books: Array, // Pass books as a prop from parent component
    },
    data() {
        return {
            sortBy: '', // Field to sort by
            sortOrder: 'asc', // Sort order: 'asc' or 'desc'
        };
    },
    computed: {
        // Computed property to return sorted books
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

<style scoped>
.table {
    border-collapse: separate; /* Prevent collapse of table cell borders */
    border-spacing: 0; /* No spacing between cells */
    width: 100%;
    border-top-left-radius: 20px; /* Adds rounded corners to the entire table */
    border-top-right-radius: 20px; /* Adds rounded corners to the entire table */
    overflow: hidden; /* Ensures content inside is clipped to the rounded corners */
    border: 1px solid #ddd; /* Add a border around the table */
}

.table th,
.table td {
    padding: 10px;
    text-align: left;
}

.table th {
    background-color: #f4f4f4;
    cursor: pointer; /* Make headers clickable */
}

.table th:hover {
    background-color: #ddd;
}

.table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.table tr:hover {
    background-color: #eaeaea;
}

.table td {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

tr:nth-last-child(1) td {
    border-bottom: none; /* Right border for the last column */
}

/* Remove left and right borders from other columns */
td:not(.book-title) {
    border-left: none;
    border-right: none;
    padding: 12px;
}
.fa-arrow-up,
.fa-arrow-down {
    margin-left: 5px;
}
</style>
