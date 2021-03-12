<template>
    <ul class="navigation-main">
        <nav-item
            v-for="(item, index) in data"
            :key="index"
            :item="item"
        ></nav-item>
    </ul>
</template>

<script>
import NavItem from './NavItem';
export default {
    props: {
        data: { type: Array }
    },
    components: {
        NavItem
    }
};
</script>
