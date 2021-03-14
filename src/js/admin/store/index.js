import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/utils/axios';
import cookie from 'js-cookie';
import authenticate from './modules/authenticate';

import display from './modules/display';
import questions from './modules/questions'
import answers from './modules/answers'
import scripts from './modules/script'

Vue.use(Vuex);
Vuex.Store.prototype.$axios = axios;
Vuex.Store.prototype.$cookie = cookie;

const store = new Vuex.Store({
    strict: true,
    modules: {
        authenticate,
        display,
        questions,
        answers,
        scripts
    }
});

const accessToken = cookie.get('ltt-gate') || null;
if (accessToken) {
    store.commit('authenticate/setAccessToken', accessToken);
}
export default store;
