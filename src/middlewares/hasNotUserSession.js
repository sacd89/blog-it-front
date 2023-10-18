import { Buffer } from 'buffer';

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

export default function hasNotUserSession({ next }) {
    const token = localStorage.getItem('jwt');
    if(!token) {
       return next();
    }
    const jwtPayload = parseJwt(token);
    if (jwtPayload.exp < Date.now() / 1000) {
        // token expired
        _clearSession();
        return next();
    }
    return next('/home');
}
