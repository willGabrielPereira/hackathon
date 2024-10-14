<template>
    <div>
        <h1 class="flex w-full">Olá {{ name }} aaaaaaa</h1>
        <pre>
            {{ showModal }}
            {{ form }}
        </pre>
        <aInput label="aInput" v-model="form.name"></aInput>
        <br />
        
        <aPhone label="aPhone" v-model="form.phone"></aPhone>
        <br />
        
        <aDate label="aDate" v-model="form.date"></aDate>
        <br />

        <aMoney label="aMoney" v-model="form.money"></aMoney>
        <br />
        
        <aSwitch label="aSiwtch" v-model="form.switch"></aSwitch>
        <br />

        <Btn type="button" class="bg-orange-300" @click="() => showModal = true">Abrir Modal</Btn>
    </div>
    
    <Modal v-model:showModal="showModal">Abrir Modal</Modal>
</template>

<script>
import aInput from '../components/form/aInput.vue'
import aPhone from '../components/form/aPhone.vue'
import aDate from '../components/form/aDate.vue'
import aMoney from '../components/form/aMoney.vue'
import aSwitch from '../components/form/aSwitch.vue'
import Btn from '../components/Btn.vue'
import Modal from '../components/Modal.vue'


export default {
    components: { aInput, aPhone, aDate, aMoney, aSwitch, Btn, Modal },

    data() {
        return {
            showModal: false,
            form: {
                name: 'teste',
                phone: null,
                date: null,
            }
        }
    }
}
</script>