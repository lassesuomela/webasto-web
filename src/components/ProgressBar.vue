<template>

    <div class="container">
        <h2>Päänäkymä</h2>
        <br/>
    </div>

    <LoaderTemplate :isLoaded="loaded" />

    <div v-if="loaded">
        <div class="row">

            <div class="col">
                <Card>
                    <div class="row">

                        <p>Webaston tila:</p>

                        <div class="statuSymbol" v-if="status" style="background:#198754"></div>
                        <div class="statuSymbol" v-else style="background:#dc3545"></div>

                        <div class="w-100"></div>
                        <br/>

                        <span v-if="status">Päällä</span>
                        <span v-else>Sammutettu</span>
                        
                    </div>
                </Card>
            </div>
                
            <div class="col">
                
                <Card>
                    <LvProgressBar :value="value" :showValue="false" color="#198754" />
                    <div class="container">
                        <p>Päälläoloaika: {{currentOnTime}} / {{maxOnTime}} min</p>

                        <p>Viimeisin päivitys:</p>
                        <p>{{lastUpdate}}</p>
                        <h3 v-if="serverError">Häiriö palvelimella</h3>
                    </div>
                </Card>
            </div>

        </div>

        <div class="container">
            <Card>
                <TemperatureChart/>
            </Card>
        </div>
    
        <div class="container">
            <Card>
                <VoltageChart/>
            </Card>
        </div>
    </div>
    
</template>

<script>
import axios from "../axios";

import LvProgressBar from 'lightvue/progress-bar';
import TemperatureChart from './TemperatureChart.vue';
import VoltageChart from './VoltageChart.vue';
import LoaderTemplate from './LoaderTemplate.vue';
import Card from 'lightvue/card';

export default {
    
    name: 'ProgressBarComponent',
    components: {
        LvProgressBar,
        TemperatureChart,
        VoltageChart,
        LoaderTemplate,
        Card
    },
    data () {
        return {
            maxOnTime: 0,
            currentOnTime: 0,
            status: null,
            value: null,
            serverError: null,
            lastUpdate: '-',
            loaded: false
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

            this.loaded = true;
        }
    },
    async mounted () {
        await this.getStatus();
        
    }
}

</script>
<style scoped>
body {
    color: #112D4E
}

.statuSymbol {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    margin: 0 auto;
}
</style>