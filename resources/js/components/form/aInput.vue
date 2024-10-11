<template>
    <Field v-bind="$props" v-model:focused="focused">
        <input v-bind="$attrs" v-model="showValue" @focus="focused = true" @blur="focused = false" :type="type" class="fieldFocusElement w-full px-1 focus-visible:outline-0 focus-visible:ring-0" />
    </Field>
</template>

<script>
import Field from '@/components/form/Field.vue'

export default {
    name: 'aInput',
    components: { Field },
    emits: ['update:model-value'],

    data() {
        return {
            focused: false,
        }
    },

    props: {
        modelValue: {
            type: [String, Number]
        },
        type: String,
        label: String,
        mask: {
            type: [String, Array],
            default: []
        }
    },

    computed: {
        showValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                return this.$emit('update:model-value', value)
            }
        }
    }
}
</script>