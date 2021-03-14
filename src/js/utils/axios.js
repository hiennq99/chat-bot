import axios from 'axios';
// import store from '@/admin/store';
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.APP_URL + '/api/v1',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    }
});

instance.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
instance.defaults.headers.get['Content-Type'] = 'application/json';

// instance.interceptors.request.use(conf => {
//     const {
//         authenticate: { accessToken }
//     } = store.state;
//     if (accessToken) {
//         conf.headers.common['Authorization'] = `Bearer ${accessToken}`;
//     }
//     return conf;
// });

function onResponse(response) {
    return response.data;
}

function onError(error) {
    return Promise.reject(error);
}

instance.interceptors.response.use(onResponse, onError);

export default instance;
