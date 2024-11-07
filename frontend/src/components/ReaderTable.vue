<template>
    <div class="reader-management">
        <h2>Readers Management</h2>
        <table class="table">
            <thead>
                <tr>
                    <th @click="sortTable('ten')">
                        Full Name
                        <span v-if="sortBy === 'ten'">
                            <i
                                v-if="sortOrder === 'asc'"
                                class="fa fa-arrow-up"
                            ></i>
                            <i v-else class="fa fa-arrow-down"></i>
                        </span>
                    </th>
                    <th @click="sortTable('ngaysinh')">
                        Date of Birth
                        <span v-if="sortBy === 'ngaysinh'">
                            <i
                                v-if="sortOrder === 'asc'"
                                class="fa fa-arrow-up"
                            ></i>
                            <i v-else class="fa fa-arrow-down"></i>
                        </span>
                    </th>
                    <th @click="sortTable('phai')">
                        Gender
                        <span v-if="sortBy === 'phai'">
                            <i
                                v-if="sortOrder === 'asc'"
                                class="fa fa-arrow-up"
                            ></i>
                            <i v-else class="fa fa-arrow-down"></i>
                        </span>
                    </th>
                    <th @click="sortTable('diachi')">
                        Address
                        <span v-if="sortBy === 'diachi'">
                            <i
                                v-if="sortOrder === 'asc'"
                                class="fa fa-arrow-up"
                            ></i>
                            <i v-else class="fa fa-arrow-down"></i>
                        </span>
                    </th>
                    <th @click="sortTable('dienthoai')">
                        Phone Number
                        <span v-if="sortBy === 'dienthoai'">
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
                <tr v-for="reader in sortedReaders" :key="reader.madocgia">
                    <td>{{ reader.holot }} {{ reader.ten }}</td>
                    <td>{{ reader.ngaysinh }}</td>
                    <td>{{ reader.phai }}</td>
                    <td>{{ reader.diachi }}</td>
                    <td>{{ reader.dienthoai }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'ReaderTable',
    props: {
        readers: Array, // Pass readers as a prop from parent component
    },
    data() {
        return {
            sortBy: '', // Field to sort by
            sortOrder: 'asc', // Sort order: 'asc' or 'desc'
        };
    },
    computed: {
        // Computed property to return sorted readers
        sortedReaders() {
            return this.readers.slice().sort((a, b) => {
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
            console.log(field);
            if (this.sortBy === field) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortBy = field;
                this.sortOrder = 'asc'; // Default to ascending order when switching columns
            }
        },
        // Helper method to get nested object values (in case there are nested fields)
        getNestedValue(object, path) {
            return path
                .split('.')
                .reduce((obj, key) => obj && obj[key], object);
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
