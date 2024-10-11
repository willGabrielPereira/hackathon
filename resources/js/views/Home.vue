<template>
    <h1 class="flex w-full">Olá {{ name }} aaaaaaa</h1>

    <aInput label="aInput"></aInput>
    <br />
    
    <aPhone label="aPhone"></aPhone>
</template>

<script>
import aInput from '../components/form/aInput.vue'
import aPhone from '../components/form/aPhone.vue'


export default {
    components: { aInput, aPhone },

    data() {
        return {
            name: 'teste'
        }
    }
}
</script>