import {Buffer} from 'buffer'
import store from '@/store/index'
import axios from 'axios';

function _clearSession() {
    localStorage.removeItem('jwt');
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(Buffer.from(base64, "base64").toString("ascii").split("").map(function (c) {
        return `%${(getChartCode(c)).slice(-2)}`;
    }).join(''));

    return JSON.parse(jsonPayload);
}

function getChartCode(c) {
    return `00${c.charCodeAt(0).toString(16)}`;
}


export default async function hasUserSession({ next }) {
   const token = localStorage.getItem('jwt');
    if (token) {
        const jwtPayload = parseJwt(token);
        if (jwtPayload.exp < Date.now() / 1000) {
            _clearSession();
            return next("/signin");
        }
        axios.defaults.headers.common.Authorization = `Bearer ${token.replace(/"/g, "")}`;

        await store.dispatch(`getUser`, {id: jwtPayload.id});

        const user = store.getters[`GET_USER`]

        if (user && user.rol === null) {
            return next('/asignrol');
        } else {
            return next();

        }

    }

    return next('/signin');
}
