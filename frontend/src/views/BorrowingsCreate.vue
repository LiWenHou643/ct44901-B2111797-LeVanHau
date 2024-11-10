<template>
    <div class="form-container">
        <div class="form-card">
            <h2 class="form-title">Lập phiếu mượn</h2>

            <form @submit.prevent="submitForm" class="form">
                <div class="form-group">
                    <label for="sdt"> Số điện thoại </label>
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input
                            type="text"
                            id="sdt"
                            v-model="input.sdt"
                            placeholder="Nhập số điện thoại người mượn"
                            @input="onPhoneInputChange"
                            required
                        />
                    </div>
                    <span v-if="errors.sdt" class="error-message">{{
                        errors.sdt
                    }}</span>
                </div>

                <div>
                    <!-- Show the list of readers only if the 'readers' array is not empty -->
                    <ul v-if="readers.length > 0 && selectedReader == null">
                        <li
                            v-for="(reader, index) in readers"
                            :key="index"
                            class="reader-item"
                            @click="selectReader(reader)"
                        >
                            {{ reader.holot }} {{ reader.ten }} -
                            {{ reader.dienthoai }}
                        </li>
                    </ul>

                    <!-- Show the selected reader if one is selected -->
                    <div
                        v-if="selectedReader"
                        class="d-flex justify-content-between align-items-center mb-4"
                    >
                        <span>
                            {{ selectedReader.holot }}
                            {{ selectedReader.ten }} -
                            {{ selectedReader.dienthoai }}
                        </span>
                        <button
                            @click="cancelReader"
                            class="btn btn-danger fs-6 py-0 px-2"
                        >
                            x
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="bookName"> Tựa sách </label>
                    <div class="input-group">
                        <i class="fas fa-book"></i>
                        <input
                            type="text"
                            id="bookName"
                            v-model="input.bookName"
                            placeholder="Nhập tựa sách mượn"
                            @input="onBookNameInputChange"
                            required
                        />
                    </div>
                    <span v-if="errors.bookName" class="error-message">{{
                        errors.bookName
                    }}</span>
                </div>

                <!-- Submit Button -->
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!isValid"
                >
                    <i class="fas fa-save"></i> Xem trước
                </button>
            </form>
        </div>
    </div>

    <div>
        <div class="col-6">
            <!-- Card hiển thị người mượn và sách đã chọn -->
            <div v-if="selectedReader || selectedBook" class="card">
                <div class="card-body">
                    <h5 class="card-title">Thông tin đã chọn:</h5>
                    <p v-if="selectedReader" class="m-0">
                        Người mượn: {{ selectedReader.holot }}
                        {{ selectedReader.ten }}
                    </p>
                    <p v-if="selectedReader" class="m-0">
                        Điện thoại: {{ selectedReader.dienthoai }}
                    </p>
                    <p v-if="selectedBook">Sách: {{ selectedBook.title }}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3">
        <div class="col-6">
            <!-- Danh sách người mượn -->
            <h4>Danh sách người mượn</h4>
            <ul class="list-group">
                <li
                    v-for="reader in readers"
                    :key="reader.id"
                    class="list-group-item"
                    @click="selectReader(reader)"
                >
                    {{ reader.name }}
                </li>
            </ul>
        </div>

        <div class="col-6">
            <!-- Danh sách sách -->
            <h4>Danh sách sách</h4>
            <ul class="list-group">
                <li
                    v-for="book in books"
                    :key="book.id"
                    class="list-group-item"
                    @click="selectBook(book)"
                >
                    {{ book.title }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import bookService from '@/services/book.service';
import readerService from '@/services/reader.service';

export default {
    name: 'EmployeeForm',
    data() {
        return {
            input: {
                sdt: '',
                bookName: '',
                date: '',
            },
            borrow: {
                madocgia: '',
                masach: '',
                msnv: '',
                ngaymuon: '',
            },
            errors: {},
            isSubmitting: false,
            isValid: false,
            readers: [],
            books: [],
            selectedReader: null,
            selectedBook: null,
        };
    },
    computed: {},
    methods: {
        validateField(field) {
            if (this.input[field].length === 0) {
                this.errors[field] = 'Vui lòng nhập trường này';
            } else {
                this.errors[field] = '';
            }

            this.validateForm();
        },
        validateForm() {
            this.isValid = Object.values(this.errors).every(
                (error) => error.length === 0
            );
        },

        async onPhoneInputChange() {
            // Gọi API để tìm thông tin người mượn theo số điện thoại
            try {
                const response = await readerService.getByPhone(this.input.sdt);
                console.log(response);
                this.readers = response;
                this.errors.sdt = null; // Xóa lỗi nếu có dữ liệu hợp lệ
            } catch (error) {
                this.errors.sdt =
                    'Không tìm thấy người mượn với số điện thoại này'; // Hiển thị lỗi nếu không tìm thấy
            }
        },

        // Hàm gọi API khi thay đổi tên sách
        async onBookNameInputChange() {
            // Gọi API để tìm sách theo tên
            try {
                const response = await bookService.getBookByTitle(
                    this.input.bookName
                );
                this.books = response;

                this.errors.bookName = null; // Xóa lỗi nếu có dữ liệu hợp lệ
            } catch (error) {
                this.errors.bookName = 'Không tìm thấy sách với tựa này'; // Hiển thị lỗi nếu không tìm thấy
            }
        },

        async submitForm() {
            this.isSubmitting = true;
        },

        selectReader(reader) {
            console.log(reader);
            this.selectedReader = reader;
            this.borrow.madocgia = reader.madocgia;
        },

        cancelReader() {
            this.selectedReader = null;
            this.borrow.madocgia = '';
        },
    },
};
</script>

<style scoped>
.error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}
.reader-item {
    cursor: pointer;
}
.reader-item:hover {
    background-color: #d2dcff;
}
</style>
