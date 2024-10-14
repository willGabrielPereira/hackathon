<template>
    <Field v-bind="$props" v-model:focused="focused">
        <VueDatePicker v-model="showValue" 
            auto-apply
            hide-input-icon
            text-input
            :placeholder="placeholder"
            :enable-time-picker="false"
            :range="range"
            :format="format"
            :ui="{ input: ['!border-none', '!py-0', '!pl-1']}" 
            >
        </VueDatePicker>
    </Field>
</template>

<script>
import Field from '@/components/form/Field.vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    name: 'aInput',
    components: { Field, VueDatePicker },
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
        format: {
            type: [String, Array],
            default: 'MM/dd/yyyy'
        },
        placeholder: {
            type: String,
            default: '__/__/____'
        },
        type: String,
        label: String,
        range: Boolean,
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

        dateFormat(value) {

        }
    }
}
</script>