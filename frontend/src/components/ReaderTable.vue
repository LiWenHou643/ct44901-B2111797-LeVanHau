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
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="sortedReaders.length === 0">
                <td colspan="6" class="text-center">
                    Không có dữ liệu đọc giả nào!
                </td>
            </tr>
            <tr v-for="reader in sortedReaders" :key="reader.madocgia">
                <td>
                    <span v-if="!reader.isEditing"
                        >{{ reader.holot }} {{ reader.ten }}</span
                    >
                    <div v-else class="d-flex">
                        <input v-model="reader.holot" class="editable" />
                        <input v-model="reader.ten" class="editable" />
                    </div>
                </td>
                <td>
                    <span v-if="!reader.isEditing">{{ reader.ngaysinh }}</span>
                    <input v-else v-model="reader.ngaysinh" class="editable" />
                </td>
                <td>
                    <span v-if="!reader.isEditing">{{ reader.phai }}</span>
                    <select v-else v-model="reader.phai" class="editable">
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </td>
                <td>
                    <span v-if="!reader.isEditing">{{ reader.diachi }}</span>
                    <input v-else v-model="reader.diachi" class="editable" />
                </td>
                <td>
                    <span v-if="!reader.isEditing">{{ reader.dienthoai }}</span>
                    <input v-else v-model="reader.dienthoai" class="editable" />
                </td>
                <td>
                    <!-- Edit/Save button -->
                    <button class="btn btn-success" @click="toggleEdit(reader)">
                        {{ reader.isEditing ? 'Lưu' : 'Sửa' }}
                    </button>
                    <!-- Cancel button if in editing mode -->
                    <button
                        class="btn btn-secondary"
                        v-if="reader.isEditing"
                        @click="cancelEdit(reader)"
                    >
                        Hủy
                    </button>

                    <!-- Delete button -->
                    <button
                        class="btn btn-danger"
                        v-if="!reader.isEditing"
                        @click="deleteReader(reader)"
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import readerService from '@/services/reader.service';
import * as Yup from 'yup';

function isValidDate(dateString) {
    const dateParts = dateString.split('/');
    if (dateParts.length !== 3) return false; // Kiểm tra định dạng dd/mm/yyyy

    const [day, month, year] = dateParts.map((part) => parseInt(part, 10));

    // Kiểm tra nếu ngày, tháng, năm là số hợp lệ
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

    // Kiểm tra nếu năm hợp lệ
    if (year < 1000 || year > 9999) return false;

    // Kiểm tra nếu tháng hợp lệ (1-12)
    if (month < 1 || month > 12) return false;

    // Kiểm tra số ngày trong tháng
    const daysInMonth = new Date(year, month, 0).getDate(); // Lấy số ngày trong tháng (ví dụ, tháng 2 có thể có 28 hoặc 29 ngày)

    if (day < 1 || day > daysInMonth) return false; // Kiểm tra nếu ngày nằm trong phạm vi hợp lệ của tháng

    return true;
}

// Định nghĩa schema Yup cho payload
const getValidationSchema = () => {
    return Yup.object({
        holot: Yup.string().required('Họ lót không được để trống'),
        ten: Yup.string().required('Tên không được để trống'),
        ngaysinh: Yup.string()
            .matches(
                /^\d{2}\/\d{2}\/\d{4}$/,
                'Ngày sinh không hợp lệ (định dạng dd/mm/yyyy)'
            )
            .test(
                'is-valid-date',
                'Ngày sinh không hợp lệ (ngày tháng không tồn tại)',
                isValidDate
            ) // Kiểm tra tính hợp lệ của ngày
            .required('Ngày sinh không được để trống'),
        phai: Yup.string().required('Giới tính không được để trống'),
        diachi: Yup.string().required('Địa chỉ không được để trống'),
        dienthoai: Yup.string()
            .matches(/^\d{10}$/, 'Số điện thoại phải có 10 chữ số')
            .required('Số điện thoại không được để trống'),
    });
};
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

        async toggleEdit(reader) {
            if (reader.isEditing) {
                try {
                    await this.save(reader);
                } catch (error) {
                    alert('Có lỗi khi thêm mới.');
                }
            } else {
                reader.originalData = { ...reader };
            }
            reader.isEditing = !reader.isEditing;
        },

        async save(reader) {
            try {
                await getValidationSchema().validate(reader, {
                    abortEarly: false,
                });
                const updatedReader = await readerService.update(
                    reader.madocgia,
                    reader
                );
                alert(
                    `Cập nhật thông tin thành công cho: ${updatedReader.reader.holot} ${updatedReader.reader.ten}`
                );
            } catch (error) {
                this.$emit('reload-readers');
                if (error.name === 'ValidationError') {
                    const errorMessages = error.errors.join('\n'); // Lấy tất cả các lỗi từ Yup
                    alert(`Có lỗi xảy ra trong dữ liệu:\n${errorMessages}`);
                } else {
                    // Nếu là lỗi từ API hoặc các lỗi khác
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) {
                        alert(error.response.data.message); // Hiển thị lỗi từ backend
                    } else {
                        alert('Có lỗi xảy ra. Vui lòng thử lại.');
                    }
                }
                this.$emit('reload-readers');
            }
        },

        cancelEdit(reader) {
            Object.assign(reader, reader.originalData);
            reader.isEditing = false;
        },

        deleteReader(reader) {
            if (confirm(`Xác nhận muốn xóa ${reader.holot} ${reader.ten}?`)) {
                readerService
                    .delete(reader.madocgia)
                    .then(() => {
                        alert(
                            `Đọc giả ${reader.holot} ${reader.ten} được xóa thành công!`
                        );
                        this.$emit('reload-readers');
                    })
                    .catch((error) => {
                        console.error('Có lỗi khi xóa đọc giả:', error);
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
