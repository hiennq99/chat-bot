import { authenticate } from '@/utils/apis';
const state = {
    accessToken: null
};
const getters = {};
const mutations = {
    setAccessToken(state, data) {
        state.accessToken = data;
    }
};
const actions = {
    async login(ctx, params) {
        try {
            const response = await this.$axios.post(authenticate.login, params);
            ctx.commit('setAccessToken', response.data?.access_token || null);
            return {
                success: true,
                message: response.message
            };
        } catch (e) {
            return {
                success: false,
                errors: e.errors
            };
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
