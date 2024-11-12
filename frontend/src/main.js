import './assets/main.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import App from './App.vue';

import router from './router';

const app = createApp(App);
app.component('VueDatePicker', VueDatePicker).use(router).mount('#app');
