<template>
    <div class="form-container">
        <div class="form-card">
            <h2 class="form-title">Lập phiếu mượn</h2>

            <form @submit.prevent="openModal" class="form">
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
                    <label for="tensach"> Tựa sách </label>
                    <div class="input-group">
                        <i class="fas fa-book"></i>
                        <input
                            type="text"
                            id="tensach"
                            v-model="input.tensach"
                            placeholder="Nhập tựa sách mượn"
                            @input="onBookNameInputChange"
                            required
                        />
                    </div>
                    <span v-if="errors.tensach" class="error-message">{{
                        errors.tensach
                    }}</span>
                </div>
                <div>
                    <!-- Show the list of books only if the 'books' array is not empty -->
                    <ul v-if="books.length > 0 && selectedBook == null">
                        <li
                            v-for="(book, index) in books"
                            :key="index"
                            class="book-item"
                            @click="selectBook(book)"
                        >
                            {{ book.tensach }} - {{ book.tacgia }} -
                            {{ book.namxuatban }}
                        </li>
                    </ul>

                    <!-- Show the selected reader if one is selected -->
                    <div
                        v-if="selectedBook"
                        class="d-flex justify-content-between align-items-center mb-4"
                    >
                        <span>
                            {{ selectedBook.tensach }} -
                            {{ selectedBook.tacgia }} -
                            {{ selectedBook.namxuatban }}
                        </span>
                        <button
                            @click="cancelBook"
                            class="btn btn-danger fs-6 py-0 px-2"
                        >
                            x
                        </button>
                    </div>
                </div>

                <!-- Button trigger modal -->
                <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    :disabled="
                        !selectedReader || !selectedBook || !input.ngaymuon
                    "
                >
                    Lập phiếu
                </button>

                <!-- Modal -->
                <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1
                                    class="modal-title fs-5"
                                    id="exampleModalLabel"
                                >
                                    Xác nhận thông tin mượn sách
                                </h1>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body">
                                <!-- Invoice-like Structure -->
                                <div class="invoice-header">
                                    <h4 class="invoice-title">
                                        Phiếu Mượn Sách
                                    </h4>
                                    <p class="invoice-date">
                                        Ngày mượn: {{ input?.ngaymuon }}
                                    </p>
                                    <!-- Issuer Information -->
                                    <div class="invoice-section">
                                        <p>
                                            <strong>Người lập phiếu:</strong>
                                            Nguyễn Văn A
                                        </p>
                                    </div>
                                </div>

                                <div class="invoice-body">
                                    <!-- Borrower Information -->
                                    <div class="invoice-section">
                                        <h5 class="section-title">
                                            Thông Tin Người Mượn
                                        </h5>
                                        <p>
                                            <strong>Người mượn:</strong>
                                            {{ selectedReader?.holot }}
                                            {{ selectedReader?.ten }}
                                        </p>
                                        <p>
                                            <strong>Điện thoại:</strong>
                                            {{ selectedReader?.dienthoai }}
                                        </p>
                                    </div>

                                    <!-- Book Information -->
                                    <div class="invoice-section">
                                        <h5 class="section-title">
                                            Thông Tin Sách
                                        </h5>
                                        <p>
                                            <strong>Sách:</strong>
                                            {{ selectedBook?.tensach }}
                                        </p>
                                        <p>
                                            <strong>Tác giả:</strong>
                                            {{ selectedBook?.tacgia }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Đóng
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    @click="submitForm"
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import bookService from '@/services/book.service';
import borrowService from '@/services/borrow.service';
import readerService from '@/services/reader.service';
export default {
    name: 'EmployeeForm',
    data() {
        return {
            input: {
                sdt: '',
                tensach: '',
                ngaymuon: this.formatDate(new Date()),
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
    methods: {
        formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits (e.g., 01, 02)
            const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so add 1
            const year = date.getFullYear();
            return `${day}/${month}/${year}`; // Return in dd/mm/yyyy format
        },
        async onPhoneInputChange() {
            // Gọi API để tìm thông tin người mượn theo số điện thoại
            try {
                const response = await readerService.getByPhone(this.input.sdt);
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
                    this.input.tensach
                );

                this.books = response;

                this.errors.tensach = null; // Xóa lỗi nếu có dữ liệu hợp lệ
            } catch (error) {
                this.errors.tensach = 'Không tìm thấy sách với tựa này'; // Hiển thị lỗi nếu không tìm thấy
            }
        },

        async submitForm() {
            this.isSubmitting = true;
            const borrow = {
                madocgia: this.selectedReader?.madocgia,
                masach: this.selectedBook?.masach,
                msnv: '672c447713130c0774bbdbfe',
                ngaymuon: this.formatDate(new Date()),
            };

            try {
                await borrowService.create(borrow);

                // Wait for the DOM update and then navigate
                this.$nextTick(() => {
                    // Remove the backdrop manually
                    const backdrop = document.querySelector('.modal-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                    this.$router.push('/borrowings');
                });
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    alert(error.response.data.message);
                } else {
                    alert('Có lỗi xảy ra. Vui lòng thử lại sau');
                }
            } finally {
                this.isSubmitting = false;
            }
        },

        selectReader(reader) {
            this.selectedReader = reader;
        },

        selectBook(book) {
            this.selectedBook = book;
        },

        cancelReader() {
            this.selectedReader = null;
        },

        cancelBook() {
            this.selectedBook = null;
        },

        openModal() {
            this.showModal = true;
        },

        cancelSubmit() {
            this.showModal = false;
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
.reader-item,
.book-item {
    cursor: pointer;
}
.reader-item:hover,
.book-item:hover {
    background-color: #d2dcff;
}
/* General styles for the invoice */
.invoice-header {
    text-align: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
}

.invoice-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin: 0;
}

.invoice-date {
    font-size: 1rem;
    color: #555;
    margin-top: 5px;
}

.invoice-body {
    font-family: 'Arial', sans-serif;
    padding: 15px;
    background-color: #f9f9f9;
}

.invoice-section {
    margin-bottom: 20px;
}

.section-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    margin-bottom: 10px;
}

.invoice-body p {
    font-size: 1rem;
    line-height: 1.6;
    margin: 5px 0;
}

.invoice-body strong {
    color: #333;
}

/* Optional: Add a border around the entire modal or modal body */
.modal-body {
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    padding: 20px;
}
</style>
