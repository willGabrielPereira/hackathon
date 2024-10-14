<template>
    <button :class="['p-2 bg-apre-300 text-white rounded-xl font-semibold duration-300 text-left', hoverClass, focusClass]" @click="href ? clicked() : null">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'Btn',

    props: {
        hoverClass: {
            type: [String, Object, Array],
            default: 'hover:bg-apre-200'
        },

        focusClass: {
            type: [String, Object, Array],
            default: 'focus:bg-apre-200'
        },

        href: {
            type: [String, Object]
        },

        target: {
            type: String,
            default: '_blank'
        }
    },

    methods: {
        clicked() {
            if (typeof this.href == "string")
                return open(this.href, this.blank)

            else this.$router.push(this.href)
        },
    }
}
</script>