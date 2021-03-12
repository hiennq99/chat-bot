import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/admin/store';

import Default from '@/admin/layouts/default';
import A01 from '@/admin/pages/a01';
import Login from '@/admin/pages/login';
import Questions from '@/admin/pages/question/listQuestion';
import Answers from '@/admin/pages/answer/listAnswer';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        component: Default,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: A01
            },

            {
                path: '/questions',
                name: 'questions',
                component: Questions
            },
            {
                path: '/answers',
                name: 'answers',
                component: Answers
            },
            {
                path: '/contents',
                name: 'contents',
                component: A01
            },

        ]
    }
];

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: ''
});

// router.beforeEach((to, from, next) => {
//     const {
//         authenticate: { accessToken }
//     } = store.state;

//     if (!accessToken && to.name !== 'login') {
//         return next('/login');
//     }
//     if (accessToken && to.name == 'login') {
//         return next('/');
//     }

//     next();
// });
router.afterEach(to => {
    store.commit('display/setBreadCrumbs', to.meta.breadcrumbs || []);
});

export default router;
