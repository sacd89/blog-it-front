import store from '@/store'


export default function hasRolDefined({ next }) {

    const user = store.getters[`GET_USER`]

    if (user && user.rol !== null) {
        return next();
    } else {
        return next('/asignrol');
    }
}
