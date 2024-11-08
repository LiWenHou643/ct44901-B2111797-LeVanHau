<template>
    <table class="table">
        <thead>
            <tr>
                <th @click="sortTable('ten')">
                    Họ tên
                    <span v-if="sortBy === 'ten'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('ngaysinh')">
                    Ngày sinh
                    <span v-if="sortBy === 'ngaysinh'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('phai')">
                    Giới tính
                    <span v-if="sortBy === 'phai'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('diachi')">
                    Địa chỉ
                    <span v-if="sortBy === 'diachi'">
                        <i
                            v-if="sortOrder === 'asc'"
                            class="fa fa-arrow-up"
                        ></i>
                        <i v-else class="fa fa-arrow-down"></i>
                    </span>
                </th>
                <th @click="sortTable('dienthoai')">
                    Điện thoại
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
