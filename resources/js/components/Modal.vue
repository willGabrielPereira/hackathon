<template>
    <transition 
            enter-active-class="duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0">
        <div class="apreModal fixed top-0 right-0 bottom-0 w-80 flex justify-center items-center bg-apre-900/50" :style="{'z-index': zIndex}" v-if="show" :id="id" @click.self="show = false">
            <div class="w-3/4 flex flex-col bg-white rounded-xl p-5 gap-5 relative shadow-md">
                <div class="absolute top-3 right-3">
                    <div class="hover:text-apre-300 cursor-pointer" @click="show = false">
                        <PhX size="1.25rem" />
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <template v-if="!$slots?.icon">
                        <PhWarningCircle v-if="type == 'info'" weight="thin" size="4rem" class="text-information-200" />
                        <PhWarning v-if="type == 'warning'" weight="thin" size="4rem" class="text-warning-300" />
                        <PhXCircle v-if="type == 'error'" weight="thin" size="4rem" class="text-error-200" />
                    </template>
                    <slot name="icon"></slot>
                </div>
                <div>
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { PhWarning, PhWarningCircle, PhX, PhXCircle } from '@phosphor-icons/vue';
import { uniqid } from '../helpers';

export default {
    name: 'Modal',
    components: { PhWarningCircle, PhWarning, PhXCircle, PhX },
    emits: ['update:showModal'],

    props: {
        showModal: Boolean,
        type: {
            type: String,
            default: 'info'
        }
    },

    data() {
        return {
            show: this.showModal,
            zIndex: 50,
            id: uniqid('modal_')
        }
    },

    watch: {
        showModal(value) {
            this.show = value
        },

        show(value) {
            this.$emit('update:showModal', value)
            
            if (value)
                this.opened()
            else
                this.closed()
        }
    },

    mounted() {
        document.addEventListener('keyup', event => {
            if (event.key == 'Escape')
                this.show = false
        })
    },

    methods: {
        opened() {
            document.querySelector('#app > div').classList.add('overflow-y-hidden')
            this.zIndex += document.querySelectorAll(`#app .apreModal:not(#${this.id})`).length
        },

        closed() {
            if (!document.querySelectorAll(`#app .apreModal:not(#${this.id})`).length)
                document.querySelector('#app > div').classList.remove('overflow-y-hidden')
        }
    }
}
</script>