import { questions } from "../../../utils/apis";

const state = {};

const getters = {};

const mutations = {};

const actions = {
    async getListQuestion(ctx, params = {}) {
        try {
            const res = await this.$axios.get(questions.list, {
                params
            });
            console.log(res);
            return res.data;
        } catch (error) {
            return null;
        }
    },
    async createQuestion(ctx, data) {
        try {
            const res = await this.$axios.post(questions.create, data);

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
    async updateQuestion(ctx, { id, data }) {
        try {
            console.log(data);
            const res = await this.$axios.post(
                questions.update.replace(/:id/, id),
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
    async deleteQuestion(ctx, id) {
        try {
            const res = await this.$axios.post(
                questions.delete.replace(/:id/, id)
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
