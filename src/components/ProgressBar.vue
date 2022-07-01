<template>
    <div class="container">
        <h2>Webaston tila</h2>
        <div class="container">
            
            <LvProgressBar :value="value" :showValue="false" color="#198754" />
            
            <div class="container">
                <p>Päälläoloaika: {{currentOnTime}} / {{maxOnTime}} min</p>
            </div>
            <p v-if="status">Webasto on päällä</p>
            <p v-else>Webasto on sammutettu</p>

            <h3 v-if="serverError">Häiriö palvelimella</h3>
        </div>
    </div>
</template>

<script>
import axios from "../axios";

import LvProgressBar from 'lightvue/progress-bar';

export default {
    
    name: 'ProgressBarComponent',
    components: {
        LvProgressBar
    },
    data () {
        return {
            maxOnTime: 0,
            currentOnTime: 0,
            status: null,
            value: null,
            serverError: null,
        }
    },
    methods: {
        async getStatus() {

            axios.get('/status/1').then(response => {
                this.maxOnTime = response.data.onTime;

            }).catch(error => {
                console.log(error.response.data);
                this.serverError = 1;
            });

            axios.get('/status/2').then(response => {
                this.status = response.data.status;
                this.currentOnTime = response.data.onTime;
                
                this.updateProgress();

            }).catch(error => {
                console.log(error.response.data);
                this.serverError = 1;

            });
        },
        updateProgress() {
            this.value = (this.currentOnTime / this.maxOnTime) * 100;
        }
    },
    async mounted () {
        await this.getStatus();
        
    }
}

</script>
