<template>
    <li class="nav-item mt-1">
        <router-link
            :to="item.url || '#'"
            :event="!hasChildren ? 'click' : ''"
            :class="[
                'flex-center justify-content-between transition-03-ease text-decoration-none',
                {
                    'drop-nav-active': isVisible && hasChildren
                }
            ]"
            @click.native="isVisible = !isVisible"
        >
            <div class="d-flex align-items-center">
                <span :class="item.icon"></span>
                <span class="menu-title px-2">{{ item.label }}</span>
            </div>
            <span v-if="hasChildren" class="icon-ctrl rotate-down-180"> </span>
        </router-link>
        <b-collapse v-if="hasChildren" v-model="isVisible">
            <ul class="menu-content">
                <nav-item
                    v-for="(child, index) in item.children"
                    :key="index"
                    :item="child"
                ></nav-item>
            </ul>
        </b-collapse>
    </li>
</template>

<script>
export default {
    name: 'nav-item',
    props: {
        item: Object
    },
    data() {
        return {
            hasChildren: false,
            isVisible: false
        };
    },
    created() {
        this.hasChildren = this.item.children && this.item.children.length;
        this.isVisible = this.setVisible();
    },
    methods: {
        setVisible() {
            if (this.item.children) {
                for (let child of this.item.children) {
                    if (child.url === this.$route.path) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
};
</script>
