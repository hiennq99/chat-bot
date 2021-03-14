import { scripts } from "../../../utils/apis";

const state = {};

const getters = {};

const mutations = {};

const actions = {
    async getListScriptQuestion(ctx, params = {}) {
        try {
            const res = await this.$axios.get(scripts.listSQ, {
                params
            });
            console.log("res", res.data)
            return res.data;
        } catch (error) {
            return null;
        }
    },
    async getListScript(ctx, params = {}) {
        try {
            const res = await this.$axios.get(scripts.list, {
                params
            });
            return res.data;
        } catch (error) {
            return null;
        }
    },
    async create(ctx, data) {
        try {
            const res = await this.$axios.post(scripts.create, data);

            return {
                success: true,
                message: res.message
            };
        } catch (e) {
            return {
                success: false,
                errors: e.errors
            };
        }
    },
    async update(ctx, { id, data }) {
        try {
            console.log(data);
            const res = await this.$axios.post(
                scripts.update.replace(/:id/, id),
                data
            );

            return {
                success: true,
                message: res.message
            };
        } catch (e) {
            return {
                success: false,
                errors: e.errors
            };
        }
    },
    async delete(ctx, id) {
        try {
            const res = await this.$axios.post(
                scripts.delete.replace(/:id/, id)
            );
            console.log(res);
            return {
                success: true,
                message: res.message
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
