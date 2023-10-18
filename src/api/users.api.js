import axios from 'axios';
import base from '@/api/base.api';
const namespace = 'users';

export default {
    login: (params) => {
        return axios.post(`${base.baseUrl}/login`, params);
    },
    register: (params) => {
        return axios.post(`${base.baseUrl}/register`, params);
    },
    list: (params) => {
        return axios.post(`${base.baseUrl}/${namespace}/list`, params);
    },
    getById: (params) => {
        return axios.post(`${base.baseUrl}/${namespace}/get-by-id`, params);
    },
    delete: (params) => {
        return axios.post(`${base.baseUrl}/${namespace}/delete`, params);
    },
    update: (params) => {
        return axios.post(`${base.baseUrl}/${namespace}/update`, params);
    },
}
