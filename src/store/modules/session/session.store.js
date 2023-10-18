import {
    SET_USER, GET_USER,
} from "@/store/modules/session/session.types";
import UsersApi from "@/api/users.api";

const state = {
    user: {},
    
};

const getters = {
    [GET_USER]: (state) => state.user
};

const mutations = {
    [SET_USER]: (state, payload) => {
        state.user = payload;
    }
};


const actions = {
    async getUser({commit}, params) {
        const response = await UsersApi.getById(params).catch(() => {
            return false;
        });
        if (response.status === 200) {
            commit(SET_USER, response.data.object); 
            return true
        }
        return false;
    },
    
};

export default {
    namespaced: true,
    state: {
        ...state
    },
    getters: {
        ...getters
    },
    actions: {
        ...actions
    },
    mutations: {
        ...mutations
    }
};
