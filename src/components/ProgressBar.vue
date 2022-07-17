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

                        <div class="statusSymbol" v-if="status" style="background:#198754"></div>
                        <div class="statusSymbol" v-else style="background:#dc3545"></div>

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

        <br/>

        <div class="row">
            <div class="col">
                
                <Card>
                    <p id="icon" class="material-icons">device_thermostat</p>
                    <p style="font-size:2rem">{{currentTemperature}}°C</p>
                </Card>
            </div>
            <div class="col">
                
                <Card>
                    <div class="row">
                        <p id="icon" class="material-icons">water_drop</p>
                        <p style="font-size:2rem">{{currentHumidity}}%</p>
                    </div>
                </Card>
            </div>
            <div class="col">
                
                <Card>
                    <p id="signalIcon" class="material-symbols-outlined" v-if="signal===4">signal_cellular_4_bar</p>
                    <p id="signalIcon" class="material-symbols-outlined" v-if="signal===3">signal_cellular_3_bar</p>
                    <p id="signalIcon" class="material-symbols-outlined" v-if="signal===2">signal_cellular_2_bar</p>
                    <p id="signalIcon" class="material-symbols-outlined" v-if="signal===1">signal_cellular_1_bar</p>
                    <p id="signalIcon" class="material-symbols-outlined" v-if="signal===0">signal_cellular_0_bar</p>
                    <p id="signalIcon" class="material-symbols-outlined" v-if="signal===-1">signal_cellular_connected_no_internet_4_bar</p>
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
            loaded: false,
            signal: -1,
            currentTemperature: null,
            currentHumidity: null,
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
                if(response.data.rssi < 5){
                    this.signal = response.data.rssi;
                }

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
        },
        async getTempData() {
            axios.get('/api/temp').then(response => {
                this.currentTemperature = response.data.temperature;
                this.currentHumidity = response.data.humidity;

            }).catch(error => {
                console.log(error.response.data);
                this.serverError = 1;
            });
        }
    },
    async mounted () {
        await this.getStatus();
        await this.getTempData();
    }
}

</script>
<style scoped>
body {
    color: #112D4E
}

.statusSymbol {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    margin: 0 auto;
}
#icon {
    font-size: 5rem;
}
#signalIcon {
    font-size: 8rem;
}

</style>