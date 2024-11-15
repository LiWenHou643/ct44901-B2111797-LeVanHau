<template>
    <div class="container">
        <h1 class="mb-4 text-center">Yêu cầu mượn sách</h1>

        <!-- Displaying the list of book requests -->
        <div v-if="bookRequests.length > 0">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Book Requests</h5>
                    <ul class="list-group list-group-flush">
                        <li
                            v-for="(book, index) in bookRequests"
                            :key="index"
                            class="list-group-item"
                        >
                            <strong>{{ book.title }}</strong> by
                            {{ book.author }}
                            <span
                                :class="[
                                    'badge',
                                    book.status === 'Pending'
                                        ? 'bg-warning'
                                        : 'bg-success',
                                ]"
                            >
                                {{ book.status }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- If no book requests have been sent yet -->
        <div v-else class="alert alert-info text-center mt-4" role="alert">
            Bạn chưa mượn quyển sách nào.
            <router-link to="/books" class="alert-link"
                >Bắt đầu mượn ngay</router-link
            >
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Array to hold the book requests sent by the user
            bookRequests: [],
        };
    },
    methods: {
        // This method simulates sending a book request
        sendBookRequest() {
            const newBookRequest = {
                title: 'The Pragmatic Programmer',
                author: 'Andrew Hunt, David Thomas',
                status: 'Pending', // Status can be 'Pending' or 'Approved'
            };

            // Add the new book request to the list
            this.bookRequests.push(newBookRequest);
        },
    },
};
</script>

<style scoped>
/* Additional styles (if needed) */
</style>
