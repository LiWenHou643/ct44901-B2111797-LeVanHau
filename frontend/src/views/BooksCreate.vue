<template>
    <div class="form-container">
        <div class="form-card">
            <h2 class="form-title">Thêm sách mới</h2>

            <form @submit.prevent="submitForm" class="form">
                <div class="form-group">
                    <label for="tensach">Tựa sách</label>
                    <div class="input-group">
                        <i class="fa fa-book" aria-hidden="true"></i>
                        <input
                            type="text"
                            id="tensach"
                            v-model="book.tensach"
                            required
                            placeholder="Nhập tựa sách"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label for="tacgia">Tác giả</label>
                    <div class="input-group">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <input
                            type="text"
                            id="tacgia"
                            v-model="book.tacgia"
                            required
                            placeholder="Nhập tên tác giả"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label for="dongia">Đơn giá</label>
                    <div class="input-group">
                        <i class="fa fa-dollar-sign" aria-hidden="true"></i>
                        <input
                            type="number"
                            id="dongia"
                            v-model.number="book.dongia"
                            required
                            min="0"
                            placeholder="Nhập đơn giá"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label for="soquyen">Số lượng</label>
                    <div class="input-group">
                        <i class="fa fa-cogs" aria-hidden="true"></i>
                        <input
                            type="number"
                            id="soquyen"
                            v-model.number="book.soquyen"
                            required
                            min="1"
                            placeholder="Nhập số lượng"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label for="namxuatban">Năm xuất bản</label>
                    <div class="input-group">
                        <i class="fa fa-calendar" aria-hidden="true"></i>
                        <input
                            type="number"
                            id="namxuatban"
                            v-model.number="book.namxuatban"
                            required
                            min="1000"
                            max="9999"
                            placeholder="Nhập năm xuất bản"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label for="manxb">Nhà xuất bản</label>
                    <div class="input-group">
                        <i class="fa fa-building" aria-hidden="true"></i>

                        <!-- Dropdown for Existing Publishers (on its own row) -->
                        <select
                            v-model="selectedPublisher"
                            class="form-select border-0"
                        >
                            <option value="">Chọn nhà xuất bản</option>
                            <option
                                v-for="publisher in publishers"
                                :key="publisher.manxb"
                                :value="publisher.manxb"
                            >
                                {{ publisher.tennxb }}
                            </option>
                        </select>
                    </div>
                </div>

                <div v-if="!selectedPublisher" class="form-group">
                    <label for="newPublisher">Nhà xuất bản mới</label>
                    <div class="input-group">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>

                        <input
                            type="text"
                            class="col-5 border-end-1"
                            v-model="newPublisher.tennxb"
                            placeholder="Nhập tên nhà xuất bản mới"
                            required
                        />
                        <input
                            type="text"
                            v-model="newPublisher.diachi"
                            placeholder="Nhập địa chỉ nhà xuất bản mới"
                            required
                        />
                    </div>
                </div>

                <button type="submit" class="submit-btn">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import bookService from '@/services/book.service';
export default {
    name: 'BookForm',
    data() {
        return {
            book: {
                tensach: '',
                tacgia: '',
                dongia: null,
                soquyen: null,
                namxuatban: null,
                manxb: null,
            },
            selectedPublisher: '', // For selecting an existing publisher
            newPublisher: { tennxb: '', diachi: '' }, // For creating a new publisher
            publishers: [],
        };
    },
    methods: {
        async submitForm() {
            // If no existing publisher is selected, create a new publisher
            if (!this.selectedPublisher) {
                this.book.tennxb = this.newPublisher.tennxb;
                this.book.diachi = this.newPublisher.diachi;
            } else {
                this.book.nxb = this.selectedPublisher; // Use existing publisherId
            }

            try {
                await bookService.create(this.book);
                alert('Sách được thêm thành công.');
                this.$router.push({ name: 'books' });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped></style>
