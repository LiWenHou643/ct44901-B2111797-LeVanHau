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
                <th @click="sortTable('nxb.diachi')">
                    Địa chỉ NXB
                    <span v-if="sortBy === 'nxb.diachi'">
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
            <tr v-if="sortedBooks.length === 0">
                <td colspan="8" class="text-center">
                    Không có dữ liệu sách nào!
                </td>
            </tr>
            <tr v-for="(book, index) in sortedBooks" :key="book.masach">
                <td>
                    <span v-if="!book.isEditing">{{ book.tensach }}</span>
                    <input v-else v-model="book.tensach" class="editable" />
                </td>
                <td>
                    <span v-if="!book.isEditing">{{ book.tacgia }}</span>
                    <input v-else v-model="book.tacgia" class="editable" />
                </td>
                <td>
                    <span v-if="!book.isEditing">{{
                        formattedPrice(book.dongia)
                    }}</span>
                    <input
                        v-else
                        v-model="book.dongia"
                        type="number"
                        class="editable"
                    />
                </td>
                <td>
                    <span v-if="!book.isEditing">{{ book.soquyen }}</span>
                    <input
                        v-else
                        v-model="book.soquyen"
                        type="number"
                        class="editable"
                    />
                </td>
                <td>
                    <span v-if="!book.isEditing">{{ book.namxuatban }}</span>
                    <input
                        v-else
                        v-model="book.namxuatban"
                        type="number"
                        class="editable"
                    />
                </td>
                <td>
                    <span v-if="!book.isEditing">{{ book.nxb.tennxb }}</span>
                    <input v-else v-model="book.nxb.tennxb" class="editable" />
                </td>
                <td>
                    <span v-if="!book.isEditing">{{ book.nxb.diachi }}</span>
                    <input v-else v-model="book.nxb.diachi" class="editable" />
                </td>
                <td>
                    <button class="btn btn-success" @click="toggleEdit(book)">
                        {{ book.isEditing ? 'Lưu' : 'Sửa' }}
                    </button>
                    <button
                        class="btn btn-secondary"
                        v-if="book.isEditing"
                        @click="cancelEdit(book)"
                    >
                        Hủy
                    </button>
                    <button
                        class="btn btn-danger"
                        v-if="!book.isEditing"
                        @click="deleteBook(book)"
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import bookService from '../services/book.service';
export default {
    name: 'BookTable',
    props: {
        books: Array,
    },
    data() {
        return {
            sortBy: '',
            sortOrder: 'asc',
            editBook: null,
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

        async toggleEdit(book) {
            if (book.isEditing) {
                // Save the changes to the backend using BookService
                try {
                    const editBook = {
                        masach: book.masach,
                        tensach: book.tensach,
                        tacgia: book.tacgia,
                        dongia: book.dongia,
                        soquyen: book.soquyen,
                        namxuatban: book.namxuatban,
                        tennxb: book.nxb.tennxb,
                        diachi: book.nxb.diachi,
                    };
                    await this.saveBook(editBook);
                } catch (error) {
                    console.error('Error saving book', error);
                    alert('Failed to save book data.');
                }
            } else {
                // Store original data before editing
                book.originalData = { ...book };
            }
            // Toggle the editing state
            book.isEditing = !book.isEditing;
        },

        // Save the updated book to the server
        async saveBook(book) {
            try {
                const updatedBook = await bookService.update(book.masach, book);
                alert(
                    `Book information updated for: ${updatedBook.book.tensach}`
                );
            } catch (error) {
                console.error('Error updating book:', error);
                alert(
                    'There was an error updating the book. Please try again.'
                );
            }
        },

        // Cancel the edit and restore original data
        cancelEdit(book) {
            Object.assign(book, book.originalData); // Restore original data
            book.isEditing = false; // Exit editing mode
        },

        // Delete a book from the server
        deleteBook(book) {
            if (confirm(`Xác nhận muốn xóa ${book.tensach}?`)) {
                bookService
                    .delete(book.masach)
                    .then(() => {
                        alert(`Sách ${book.tensach} được xóa thành công!`);
                        this.$emit('reload-books');
                    })
                    .catch((error) => {
                        console.error('Có lỗi khi xóa sách:', error);
                    });
            }
        },
    },
};
</script>
<style scoped>
input {
    width: 100%;
    box-sizing: border-box; /* Include padding and borders in element's width */
    max-width: 100%; /* Prevent input from expanding beyond the cell */
}

button {
    height: 25px;
    padding: 0 10px;
    font-size: 14px;
    margin-right: 5px;
}

.editable {
    border: 1px solid #ccc;
    padding: 4px;
}
</style>
