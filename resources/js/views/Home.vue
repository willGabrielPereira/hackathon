<template>
    <h1 class="flex w-full">Olá {{ name }} aaaaaaa</h1>

    <aInput label="aInput"></aInput>
    <br />
    
    <aPhone label="aPhone"></aPhone>
    <aDate label="aDate"></aDate>
</template>

<script>
import aInput from '../components/form/aInput.vue'
import aPhone from '../components/form/aPhone.vue'
import aDate from '../components/form/aDate.vue'


export default {
    components: { aInput, aPhone, aDate },

    data() {
        return {
            name: 'teste'
        }
    }
}
</script>