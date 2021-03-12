<template>
    <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="pageCount"
        :pills="pills"
        :align="align"
        use-router
        append
    >
        <template #page="{ page, active }">
            <div v-if="active" class="bg-primary">{{ page }}</div>
            <span v-else>{{ page }}</span>
        </template>
    </b-pagination-nav>
</template>

<script>
export default {
    props: {
        align: {
            type: String,
            default: "right",
            description: "left | center | right"
        },
        pageCount: [Number, String],
        pills: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        linkGen(pageNum) {
            return pageNum === 1 ? "?" : `?page=${pageNum}`;
        }
    }
};
</script>
