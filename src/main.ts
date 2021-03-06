import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = 'http://localhost:8000/api/ambassador';
axios.defaults.withCredentials = true;

createApp(App).use(store).use(router).mount('#app');
