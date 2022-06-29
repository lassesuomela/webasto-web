<template>
    <LvProgressBar :value="value" :showValue="false" color="#38b2ac" />
    
    <p>{{currentOnTime}} / {{maxOnTime}} min</p>
    
    <p v-if="status">Webasto on päällä</p>
    <p v-else>Webasto on sammutettu</p>

    <h3 v-if="serverError">Häiriö palvelimella</h3>

</template>

<script>
import axios from "../axios";

import LvProgressBar from 'lightvue/progress-bar';

export default {
    
    name: 'ProgressBar',
    components: {
        LvProgressBar
    },
    data () {
        return {
            maxOnTime: null,
            currentOnTime: null,
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

            }).catch(error => {
                console.log(error.response.data);
                this.serverError = 1;
            });
        },
        async updateProgress() {
            this.value = (this.currentOnTime / this.maxOnTime) * 100;
        }
    },
    async mounted () {
        await this.getStatus();
        await this.updateProgress();
    }
}

</script>
