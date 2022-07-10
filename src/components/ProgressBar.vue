<template>
    <div class="container">

        <div class="container">
            <h2>Päänäkymä</h2>
        </div>

        <div class="container">
            
            <LvProgressBar :value="value" :showValue="false" color="#198754" v-if="status"/>
            
            <div class="container" v-if="status">
                <p>Päälläoloaika: {{currentOnTime}} / {{maxOnTime}} min</p>
            </div>
            <p>Webaston tila: 
                <span v-if="status">Päällä</span>
                <span v-else>Sammutettu</span>
            </p>

            <p>Päivitetty: {{lastUpdate}}</p>
            <h3 v-if="serverError">Häiriö palvelimella</h3>


        </div>
    </div>

    <TemperatureChart/>
    <VoltageChart/>
</template>

<script>
import axios from "../axios";

import LvProgressBar from 'lightvue/progress-bar';
import TemperatureChart from './TemperatureChart.vue';
import VoltageChart from './VoltageChart.vue';

export default {
    
    name: 'ProgressBarComponent',
    components: {
        LvProgressBar,
        TemperatureChart,
        VoltageChart
    },
    data () {
        return {
            maxOnTime: 0,
            currentOnTime: 0,
            status: null,
            value: null,
            serverError: null,
            lastUpdate: '-',
        }
    },
    methods: {
        async getStatus() {

            axios.get('/api/status/1').then(response => {
                this.maxOnTime = response.data.onTime;

            }).catch(error => {
                console.log(error.response.data);
                this.serverError = 1;
            });

            axios.get('/api/status/2').then(response => {
                this.status = response.data.status;
                this.currentOnTime = response.data.onTime;
                this.lastUpdate = response.data.timestamp;
                
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
