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
                    <th @click="sortTable('tuasach')">
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
                    <td
                        class="d-flex justify-content-center align-items-center"
                    >
                        <strong
                            :class="[
                                'badge p-2',
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
                        <div>
                            <div
                                class="d-flex justify-content-between align-items-center"
                                v-if="
                                    selectedBorrowing.trangthai ===
                                    'Chờ xác nhận'
                                "
                            >
                                <strong>Ngày hẹn mượn:</strong>
                                <input
                                    class="p-0"
                                    type="date"
                                    v-model="selectedBorrowing.henmuon"
                                    name="henmuon"
                                    id="henmuon"
                                />
                                <span v-if="selectedBorrowing.henmuon">
                                    Nhận sách từ:
                                    {{ format(selectedBorrowing?.henmuon) }}
                                    00:00:00
                                </span>
                            </div>
                            <div v-else>
                                <span v-if="selectedBorrowing.henmuon">
                                    <strong> Ngày hẹn nhận sách: </strong>
                                    {{ format(selectedBorrowing?.henmuon) }}
                                    00:00:00
                                </span>
                            </div>
                        </div>
                        <div>
                            <div
                                class="d-flex justify-content-between align-items-center"
                                v-if="
                                    selectedBorrowing.trangthai ===
                                    'Chờ xác nhận'
                                "
                            >
                                <strong>Ngày hẹn trả:</strong>
                                <input
                                    type="date"
                                    class="p-0"
                                    v-model="selectedBorrowing.hentra"
                                    name="hentra"
                                    id="hentra"
                                    disabled
                                />
                                <span v-if="selectedBorrowing.hentra">
                                    Trả sách trước:
                                    {{ format(selectedBorrowing?.hentra) }}
                                    23:59:59
                                </span>
                            </div>
                            <div v-else>
                                <span v-if="selectedBorrowing.hentra">
                                    <strong>Ngày hẹn trả: </strong>
                                    {{ format(selectedBorrowing?.hentra) }}
                                    23:59:59
                                </span>
                            </div>
                        </div>
                        <div>
                            <strong>Ngày mượn:</strong>
                            {{
                                convertToLocalTime(selectedBorrowing?.ngaymuon)
                            }}
                        </div>
                        <div>
                            <strong>Nhân viên duyệt yêu cầu:</strong>
                            {{ selectedBorrowing?.nvduyet }}
                        </div>
                        <div>
                            <strong>Nhân viên đưa sách:</strong>
                            {{ selectedBorrowing?.nvnhan }}
                        </div>
                        <div>
                            <strong>Nhân viên nhận trả sách:</strong>
                            {{ selectedBorrowing?.nvtra }}
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
                            @click="confirmCustomerReceived(selectedBorrowing)"
                        >
                            Xác nhận khách nhận sách
                        </button>
                        <button
                            v-if="
                                selectedBorrowing.trangthai === 'Đã nhận sách'
                            "
                            type="button"
                            class="btn btn-success"
                            @click="submitReturn(selectedBorrowing)"
                        >
                            Xác nhận trả sách
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
            selectedBorrowing: {},
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
                    })
                    .finally(() => {
                        this.closeModal();
                    });
            }
        },

        submitReturn(borrow) {
            if (confirm(`Xác nhận khách hàng trả sách?`)) {
                orderService
                    .updateOrder(borrow._id, {
                        trangthai: 'Đã trả',
                        ngaytra: new Date().toISOString(),
                        nvtra: this.user.hoten,
                    })
                    .then((res) => {
                        alert(`Trả sách thành công!`);
                        this.selectedBorrowing = res;
                        this.$emit('reload-borrowings');
                    })
                    .catch((error) => {
                        console.error('Có lỗi khi trả sách:', error);
                    });
            }
        },

        confirmOrder(borrow) {
            if (!borrow.henmuon || !borrow.hentra) {
                alert(`Vui lòng chọn ngày hẹn nhận và ngày hẹn trả!`);
                return;
            }

            if (confirm(`Xác nhận duyệt yêu cầu mượn sách này?`)) {
                orderService
                    .updateOrder(borrow._id, {
                        trangthai: 'Đã xác nhận',
                        henmuon: this.createDateWithTime(
                            this.selectedBorrowing.henmuon,
                            0,
                            0,
                            0
                        ), // Set to 00:00
                        hentra: this.createDateWithTime(
                            this.selectedBorrowing.hentra,
                            23,
                            59,
                            59
                        ), // Set to 23:59
                        nvduyet: this.user.hoten,
                    })
                    .then((res) => {
                        alert(`Đã duyệt phiếu thành công!`);
                        this.selectedBorrowing = res;
                        this.$emit('reload-borrowings');
                    })
                    .catch((error) => {
                        console.error('Có lỗi khi duyệt:', error);
                    });
            }
        },

        confirmCustomerReceived(borrow) {
            if (confirm(`Xác nhận khách nhận sách?`)) {
                orderService
                    .updateOrder(borrow._id, {
                        trangthai: 'Đã nhận sách',
                        nvnhan: this.user.hoten,
                        ngaymuon: new Date().toISOString(),
                    })
                    .then((res) => {
                        alert(`Khách đã nhận sách!`);
                        this.selectedBorrowing = res;
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
            document.getElementById('closeModal').click();
        },

        format(value, event) {
            return moment(value).format('DD/MM/YYYY');
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
        'selectedBorrowing.henmuon'(newVal) {
            if (newVal) {
                // Set hentra to 14 days after ngaymuon
                this.selectedBorrowing.hentra = moment(newVal)
                    .add(14, 'days')
                    .format('YYYY-MM-DD');
            } else {
                // Clear hentra if ngaymuon is cleared
                this.selectedBorrowing.hentra = '';
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
