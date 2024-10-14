<template>
    <label :class="['relative inline-flex items-center', {'cursor-pointer': !disabled, 'opacity-50': disabled}]" v-bind="{...$props, ...$attrs}">
      <input type="checkbox" :value="value" class="sr-only peer" v-model="checked" v-bind="{ ...$props, ...$attrs }">
      <div class="relative w-7 h-4 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
      <span class="ml-1 text-sm" v-html="label" />
    </label>
</template>

<script>
export default {
    name: 'aSwitch',
    emits: ['update:model-value'],

    props: {
        modelValue: null,
        value: {
            default: true
        },

        label: String,
        disabled: Boolean
    },

    computed: {
        checked: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:model-value', value)
            }
        }
    }
}
</script>