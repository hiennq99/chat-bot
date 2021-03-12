<template>
    <ul v-if="breadCrumbLength" class="breadcrumb border-bottom">
        <li>
            <router-link to="/" class="breadcrumb-link">Home</router-link
            ><span v-if="breadCrumbLength" class="px-2">></span>
        </li>
        <li
            v-for="(item, index) in breadCrumbs"
            :key="index"
            :class="{
                'breadcrumb-item-active': index === breadCrumbLength - 1
            }"
        >
            <template v-if="item.link">
                <router-link :to="item.link" class="breadcrumb-link">
                    {{ item.text }} </router-link
                ><span class="px-2">></span>
            </template>
            <span v-else>{{ item.text }}</span>
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'bread-crumb',
    computed: {
        ...mapState({
            breadCrumbs: state => state.display.breadCrumbs
        }),
        breadCrumbLength() {
            return (this.breadCrumbs && this.breadCrumbs.length) || null;
        }
    }
};
</script>
