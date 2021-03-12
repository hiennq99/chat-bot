import { answers } from "../../../utils/apis";

const state = {};

const getters = {};

const mutations = {};

const actions = {
    async getListAnswer(ctx, params = {}) {
        try {
            const res = await this.$axios.get(answers.list, {
                params
            });
            return res.data;
        } catch (error) {
            return null;
        }
    },
    async createAnswer(ctx, data) {
        try {
            const res = await this.$axios.post(answers.create, data);

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
    async updateAnswer(ctx, { id, data }) {
        try {
            console.log(data);
            const res = await this.$axios.post(
                answers.update.replace(/:id/, id),
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
    async deleteAnswer(ctx, id) {
        try {
            const res = await this.$axios.post(
                answers.delete.replace(/:id/, id)
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
