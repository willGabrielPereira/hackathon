<template>
    <section ref="fieldBoxOut" @click="focus" :class="['p-1 bg-white rounded-lg ring-1', {'ring-gray-300': !focused, 'ring-apre-focus': focused, 'opacity-75': disabled }]">
        <div v-if="!simple" class="w-full text-12 font-semibold">
            <label :title="strip_tags(label)" v-html="label"></label>
            <span v-if="required" class="text-red-600">*</span>
        </div>
        <div :class="fieldClass" class="w-full">
            <slot></slot>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Field',

    props: {
        label: String,
        simple: Boolean,
        focused: Boolean,
        required: Boolean,
        fieldClass: Object,
        disabled: Boolean,
    },

    methods: {
        focus() {
            const field = this.$el.querySelector('.fieldFocusElement')
            if (this.focused || !field) return

            field.focus()
            this.$emit('update:focused', true)
        },

        strip_tags(string) {
            return string?.replace(/(<([^>]+)>)/gi, "").trim()
        }
    }
}
</script>