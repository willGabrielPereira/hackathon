<template>
    <VDropdown class="flex items-center" :popperHideTriggers="popperHideTriggers" popperClass="max-w-1/2">
        <Btn @click="showDrop = !showDrop" @blur="showDrop = false" :class="btnClass">
            <span v-if="title" v-html="title"/>
            <slot name="title"></slot>
        </Btn>

        <template #popper>
            <div class="p-1" :class="contentClass">
                <slot></slot>
            </div>
        </template>
    </VDropdown>
</template>

<script>
import Btn from './Btn.vue';
import { Dropdown } from 'floating-vue';
import 'floating-vue/dist/style.css'

export default {
    name: 'DropDownMenuButton',
    components: { Btn, VDropdown: Dropdown },

    props: {
        title: String,
        options: {
            type: [Object, Array]
        },
        btnClass: {
            type: [String, Array, Object]
        },
        contentClass: {
            type: [String, Array, Object]
        },
        popperHideTriggers: {
            type: [String, Function],
            default() {
                return (triggers) => [...triggers, 'click']
            }
        }
    },

    data() {
        return {
            showDrop: false,
        }
    }
}
</script>