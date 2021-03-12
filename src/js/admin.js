import Vue from 'vue';

import View from '@/View.vue';

// vuex
import store from '@/admin/store';

// router
import router from '@/admin/router';

// axios
import axios from '@/utils/axios';
Vue.prototype.$axios = axios;

Vue.prototype.$store = store;
// cookie
import cookie from 'js-cookie';

import 'bootstrap-vue/dist/bootstrap-vue.css'

// bootstrap vue
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

//vee-validate

Vue.prototype.$cookie = cookie;

new Vue({
    router,
    store,
    render: h => h(View)
}).$mount('#admin');
