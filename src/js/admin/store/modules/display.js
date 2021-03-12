const state = {
    breadCrumbs: null
};

const getters = {};

const actions = {};

const mutations = {
    setBreadCrumbs(state, data) {
        state.breadCrumbs = data;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
