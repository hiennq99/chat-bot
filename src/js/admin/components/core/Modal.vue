<template>
    <SlideYUpTransition :duration="animationDuration">
        <b-modal
            class="modal fade"
            ref="app-modal"
            :size="size"
            :hide-header="!$slots.header"
            :modal-class="[{ 'modal-mini': type === 'mini' }, ...modalClasses]"
            @mousedown.self="closeModal"
            tabindex="-1"
            role="dialog"
            centered
            @close="closeModal"
            @hide="closeModal"
            :header-class="headerClasses"
            :footer-class="footerClasses"
            :content-class="modalContentClasses"
            :body-class="bodyClasses"
            :aria-hidden="!show"
            hide-footer
        >
            <template v-slot:modal-header>
                <slot name="header"></slot>
                <slot name="close-button">
                    <button
                        type="button"
                        class="close"
                        v-if="showClose"
                        @click="closeModal"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span :aria-hidden="!show">×</span>
                    </button>
                </slot>
            </template>

            <slot />

            <template v-slot:modal-footer>
                <slot name="footer"></slot>
            </template>
        </b-modal>
    </SlideYUpTransition>
</template>
<script>
import { SlideYUpTransition } from "vue2-transitions";

export default {
    components: {
        SlideYUpTransition
    },
    props: {
        show: Boolean,
        showClose: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: "",
            validator(value) {
                const acceptedValues = ["", "notice", "mini"];
                return acceptedValues.indexOf(value) !== -1;
            }
        },
        modalClasses: {
            type: [Object, String]
        },
        size: {
            type: String,
            validator(value) {
                const acceptedValues = ["", "sm", "md", "lg", "xl"];
                return acceptedValues.indexOf(value) !== -1;
            }
        },
        modalContentClasses: {
            type: [Object, String]
        },
        headerClasses: {
            type: [Object, String]
        },
        bodyClasses: {
            type: [Object, String]
        },
        footerClasses: {
            type: [Object, String]
        },
        animationDuration: {
            type: Number,
            default: 500
        }
    },
    methods: {
        closeModal() {
            this.$emit("update:show", false);
            this.$emit("close");
        }
    },
    watch: {
        show(val) {
            if (val) {
                this.$refs["app-modal"].show();
            } else {
                this.$refs["app-modal"].hide();
            }
        }
    }
};
</script>
<style>
.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.26) !important;
}
</style>
