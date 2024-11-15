<template>
    <div>
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
                    <th @click="sortTable('tuasacj')">
                        Ngày yêu cầu
                        <span v-if="sortBy === 'tuasach'">
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
                    <th @click="sortTable('nhanvien')">
                        Nhân viên
                        <span v-if="sortBy === 'nhanvien'">
                            <i
                                v-if="sortOrder === 'asc'"
                                class="fa fa-arrow-up"
                            ></i>
                            <i v-else class="fa fa-arrow-down"></i>
                        </span>
                    </th>
                    <th @click="sortTable('tinhtrang')">
                        Tình trạng
                        <span v-if="sortBy === 'tinhtrang'">
                            <i
                                v-if="sortOrder === 'asc'"
                                class="fa fa-arrow-up"
                            ></i>
                            <i v-else class="fa fa-arrow-down"></i>
                        </span>
                    </th>
                    <th @click="sortTable('phimuon')">
                        Phí mượn
                        <span v-if="sortBy === 'phimuon'">
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
                <tr v-if="!sortedBorrowings.length">
                    <td colspan="6" class="text-center">Không có dữ liệu</td>
                </tr>
                <tr v-for="borrowing in sortedBorrowings" :key="borrowing._id">
                    <td>{{ borrowing.madocgia }}</td>
                    <td>{{ convertToLocalTime(borrowing.ngayyeucau) }}</td>
                    <td>{{ borrowing.ngaymuon }}</td>
                    <td>{{ borrowing.ngaytra }}</td>
                    <td>{{ borrowing.nhanvien }}</td>
                    <td
                        class="d-flex justify-content-center align-items-center"
                    >
                        <strong
                            :class="[
                                'badge text-black p-2',
                                borrowing.trangthai === 'Chờ xác nhận'
                                    ? 'bg-warning'
                                    : 'bg-success',
                            ]"
                        >
                            {{ borrowing.trangthai }}
                        </strong>
                    </td>
                    <td>{{ borrowing.phimuon }}</td>

                    <td>
                        <button
                            class="btn btn-success"
                            @click="openModal(borrowing)"
                        >
                            Chi tiết
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <div
            class="modal fade"
            id="detailsModal"
            tabindex="-1"
            aria-labelledby="detailsModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="detailsModalLabel">
                            Chi tiết mượn sách
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div v-if="selectedBorrowing" class="modal-body">
                        <p>
                            <strong>Mã đọc giả:</strong>
                            {{ selectedBorrowing.madocgia }}
                        </p>
                        <p>
                            <strong>Ngày yêu cầu:</strong>
                            {{
                                convertToLocalTime(selectedBorrowing.ngayyeucau)
                            }}
                        </p>
                        <p>
                            <strong>Ngày mượn:</strong>
                            {{ selectedBorrowing.ngaymuon }}
                            <input
                                type="date"
                                v-model="selectedBorrowing.ngaymuon"
                                name="ngaymuon"
                                id="ngaymuon"
                            />
                        </p>
                        <p>
                            <strong>Ngày trả:</strong>
                            {{ selectedBorrowing.ngaytra }}
                            <input type="date" name="ngaytra" id="ngaytra" />
                        </p>
                        <p>
                            <strong>Nhân viên:</strong>
                            {{ selectedBorrowing.nhanvien }}
                        </p>
                        <p>
                            <strong>Tình trạng:</strong>
                            {{ selectedBorrowing.trangthai }}
                        </p>
                        <p>
                            <strong>Phí mượn:</strong>
                            {{ selectedBorrowing.phimuon }}
                        </p>
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
                            class="btn btn-danger"
                            @click="deleteBorrow(selectedBorrowing)"
                        >
                            Xoá
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
            selectedBorrowing: {
                madocgia: '',
                ngayyeucau: '',
                ngaymuon: '',
                ngaytra: '',
                nhanvien: '',
                trangthai: '',
                phimuon: '',
            },
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

        openModal(borrowing) {
            this.selectedBorrowing = { ...borrowing };
            const modalElement = new bootstrap.Modal(
                document.getElementById('detailsModal')
            );
            modalElement.show(); // Show the modal
        },

        format(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        },

        convertToLocalTime(utcDateString) {
            const utcDate = new Date(utcDateString); // Create a date object from the UTC string
            const options = {
                timeZone: 'Asia/Ho_Chi_Minh', // Time zone for Vietnam
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false, // Use 24-hour format
            };
            const localDateString = utcDate.toLocaleDateString(
                'en-GB',
                options
            ); // Convert to local date string in dd/mm/yyyy format

            return `${localDateString}`; // Combine date and time
        },
    },
};
</script>

<style scoped>
button {
    height: 25px;
    padding: 0 10px;
    font-size: 14px;
    margin-right: 5px;
}
</style>
