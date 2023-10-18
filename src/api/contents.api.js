import axios from 'axios';
import base from '@/api/base.api';
const namespace = 'contents';

export default {
    create: (params) => {
        return axios.post(`${base.baseUrl}/${namespace}/create`, params);
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
