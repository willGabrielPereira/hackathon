<template>
    <Field v-bind="$props" v-model:focused="focused">
          <VueDatePicker v-model="date"></VueDatePicker>
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
        }
    }
}
</script>