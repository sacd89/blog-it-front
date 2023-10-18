import store from '@/store/index'


export default function hasRolUndefined({ next }) {

    const user = store.getters[`GET_USER`]

    if (user && user.rol === null) {
        return next();
    }


    return next('/home');
}
