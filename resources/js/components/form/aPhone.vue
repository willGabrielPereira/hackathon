<template>
    <aInput v-bind="$props" v-mask="masks"></aInput>
</template>

<script>
import aInput from '@/components/form/aInput.vue'
import {mask} from 'vue-the-mask'

export default {
    name: 'aPhone',
    directives: { mask },

    components: { aInput },
    emits: ['update:model-value'],

    data() {
        return {
            focused: false,
            masks: ['(##) ####-####', '(##) #####-####']
        }
    },

    props: {
        modelValue: {
            type: [String, Number]
        },
        type: String,
        label: String,
    },

    computed: {
        showValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                return this.$emit('update:model-value', value)
            }
        }, 
    }
}
</script>