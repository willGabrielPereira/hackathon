<template>
    <Field v-bind="$props" v-model:focused="focused">
        <input v-bind="$attrs" ref="inputRef" v-model="formattedValue" type="text" :placeholder="placeholder" @focus="focused = true" @blur="focused = false" class="fieldFocusElement w-full px-1 focus-visible:outline-0 focus-visible:ring-0" />
    </Field>
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
import Field from './Field.vue';

export default {
    name: 'aMoney',
    components: { Field },

    props: {
        modelValue: null,
        label: String,
        placeholder: {
            type: String,
            default: 'R$'
        },
        options: {
            type: Object,
            default: () => ({
                locale: "pt-BR",
                currency: "BRL",
                currencyDisplay: "hidden",
                precision: 2,
                autoDecimalDigits: true,
                accountingSign: false
            })
        },
    },

    setup(props) {
        const { inputRef, formattedValue } = useCurrencyInput(props.options)

        return { inputRef, formattedValue }
    },

    data() {
        return {
            focused: false,
        }
    },

}
</script>