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
                    <td colspan="8" class="text-center">Không có dữ liệu</td>
                </tr>
                <tr v-for="borrowing in sortedBorrowings" :key="borrowing._id">
                    <td>{{ borrowing.madocgia }}</td>
                    <td>{{ convertToLocalTime(borrowing.ngayyeucau) }}</td>
                    <td>{{ convertToLocalTime(borrowing.ngaymuon) }}</td>
                    <td>{{ convertToLocalTime(borrowing.ngaytra) }}</td>
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
                        <div>
                            <strong>Mã đọc giả:</strong>
                            {{ selectedBorrowing.madocgia }}
                        </div>
                        <div>
                            <strong>Ngày yêu cầu:</strong>
                            {{ format(selectedBorrowing?.ngayyeucau) }}
                        </div>
                        <div
                            class="d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong>Ngày mượn:</strong>
                                <input
                                    class="p-0"
                                    type="date"
                                    v-model="selectedBorrowing.ngaymuon"
                                    name="ngaymuon"
                                    id="ngaymuon"
                                />
                            </div>
                            <span v-if="selectedBorrowing.ngaymuon">
                                Nhận sách từ:
                                {{ format(selectedBorrowing?.ngaymuon) }}
                                00:00
                            </span>
                        </div>
                        <div
                            class="d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong>Ngày trả:</strong>
                                <input
                                    type="date"
                                    class="p-0"
                                    v-model="selectedBorrowing.ngaytra"
                                    name="ngaytra"
                                    id="ngaytra"
                                    disabled
                                />
                            </div>
                            <span v-if="selectedBorrowing.ngaytra">
                                Trả sách trước:
                                {{ format(selectedBorrowing?.ngaytra) }}
                                23:59
                            </span>
                        </div>
                        <div>
                            <strong>Nhân viên:</strong>
                            {{ user?.hoten }}
                        </div>
                        <div>
                            <strong>Tình trạng:</strong>
                            {{ selectedBorrowing.trangthai }}
                        </div>
                        <div>
                            <strong>Phí mượn:</strong>
                            {{ selectedBorrowing.phimuon }}
                        </div>

                        <strong>Sách mượn:</strong>
                        <ul>
                            <li v-for="book in selectedBorrowing.sach">
                                {{ book.tensach }} x({{ book.soluong }}) -
                                {{ book.dongia }}đ / quyển
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button
                            id="closeModal"
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Đóng
                        </button>
                        <button
                            v-if="selectedBorrowing.trangthai === 'Đã trả'"
                            type="button"
                            class="btn btn-danger"
                            @click="deleteBorrow(selectedBorrowing)"
                        >
                            Xoá
                        </button>
                        <button
                            v-if="
                                selectedBorrowing.trangthai === 'Chờ xác nhận'
                            "
                            type="button"
                            class="btn btn-primary"
                            @click="confirmOrder(selectedBorrowing)"
                        >
                            Xác nhận
                        </button>
                        <button
                            v-if="selectedBorrowing.trangthai === 'Đã xác nhận'"
                            type="button"
                            class="btn btn-success"
                            @click="submitReturn(selectedBorrowing)"
                        >
                            Trả sách
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import orderService from '@/services/order.service';
import moment from 'moment';
import { mapGetters } from 'vuex';

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
                trangthai: '',
                phimuon: '',
            },
        };
    },
    computed: {
        ...mapGetters('auth', ['user', 'isAuthenticated']),
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
        // Delete a borrow from the server
        deleteBorrow(borrow) {
            if (confirm(`Xác nhận xoá phiếu mượn này?`)) {
                orderService
                    .deleteOrder(borrow._id)
                    .then(() => {
                        alert(`Xoá phiếu mượn thành công!`);
                        this.$emit('reload-borrowings');
                    })
                    .catch((error) => {
                        console.error('Có lỗi khi xoá:', error);
                    });
            }
        },

        submitReturn(borrow) {
            if (confirm(`Xác nhận trả sách?`)) {
                orderService
                    .updateOrder(borrow._id, {
                        trangthai: 'Đã trả',
                        ngaymuon: new Date(
                            this.selectedBorrowing.ngaymuon
                        ).toISOString(),
                        ngaytra: new Date(
                            this.selectedBorrowing.ngaytra
                        ).toISOString(),
                        nhanvien: this.user.hoten,
                    })
                    .then(() => {
                        alert(`Trả sách thành công!`);
                        this.$emit('reload-borrowings');
                    })
                    .catch((error) => {
                        console.error('Có lỗi khi trả sách:', error);
                    });
            }
        },

        confirmOrder(borrow) {
            if (!borrow.ngaymuon || !borrow.ngaytra) {
                alert(`Vui lòng chọn ngày mượn và ngày trả!`);
                return;
            }

            console.log('selectedBorrowing:', this.selectedBorrowing);
            if (confirm(`Xác nhận mượn sách?`)) {
                orderService
                    .updateOrder(borrow._id, {
                        trangthai: 'Đã xác nhận',
                        ngaymuon: this.createDateWithTime(
                            this.selectedBorrowing.ngaymuon,
                            0,
                            0,
                            0
                        ), // Set to 00:00
                        ngaytra: this.createDateWithTime(
                            this.selectedBorrowing.ngaytra,
                            23,
                            59,
                            59
                        ), // Set to 23:59
                        nhanvien: this.user.hoten,
                    })
                    .then(() => {
                        alert(`Xác nhận mượn sách thành công!`);
                        this.$emit('reload-borrowings');
                    })
                    .catch((error) => {
                        console.error('Có lỗi khi xác nhận:', error);
                    });
            }
        },

        createDateWithTime(dateString, hours, minutes, seconds) {
            const date = new Date(dateString); // Create a date object from the date string
            date.setHours(hours, minutes, seconds, 0); // Set the time
            return date.toISOString(); // Return the ISO string
        },

        openModal(borrowing) {
            this.selectedBorrowing = { ...borrowing };
            const modalElement = new bootstrap.Modal(
                document.getElementById('detailsModal')
            );
            modalElement.show(); // Show the modal
        },

        closeModal() {
            document.getElementById('close').click();
        },

        format(value, event) {
            return moment(value).format('DD-MM-YYYY');
        },

        convertToLocalTime(utcDateString) {
            if (!utcDateString) return ''; // Return empty string if input is empty
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
    watch: {
        'selectedBorrowing.ngaymuon'(newVal) {
            if (newVal) {
                // Set ngaytra to 7 days after ngaymuon
                this.selectedBorrowing.ngaytra = moment(newVal)
                    .add(7, 'days')
                    .format('YYYY-MM-DD');
            } else {
                // Clear ngaytra if ngaymuon is cleared
                this.selectedBorrowing.ngaytra = '';
            }
        },
    },
};
</script>

<style scoped>
button {
    padding: 0 10px;
}
</style>
