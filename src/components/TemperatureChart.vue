<template>
    <div class="container">
        <div class="container">
            <h2>Lämpötila ja kosteus</h2>
        </div>

        <Line v-if="isLoaded"
            :chart-data="chartData"
            :height="32"
            :width="128"
            :chart-options="options"
        />
    </div>
</template>

<script>
import axios from "../axios";

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
)

export default {
    
    name: 'TemperatureHumidityChart',
    components: {
        Line
    },
    data () {
        return {
            chartData: null,
            labelData: [],
            tempData: [],
            humiData: [],
            isLoaded: false,
            options: {
                scales: {
                    TemperatureAxis: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Lämpötila (°C)',
                            font: {
                                size: 18,
                                style: 'normal',
                                lineHeight: 2
                            },
                        },
                        suggestedMax: 30,
                        suggestedMin: 0
                    },
                    HumidityAxis: {
                        type: 'linear',
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Kosteus (%)',
                            font: {
                                size: 18,
                                style: 'normal',
                                lineHeight: 2
                            },
                        },
                        max:100,
                        min: 0
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Viimeiset 24 tuntia',
                            font: {
                                size: 18,
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        }
    },
    methods: {
        getData() {

            axios.get('/api/temp/hour').then(response => {

                for (let i = 0; i < response.data.timestamps.length; i++) {
                    this.labelData[i] = response.data.timestamps[i];
                    this.tempData[i] = response.data.temperatures[i];
                    this.humiData[i] = response.data.humidities[i];
                }

                for(var i = 0; i < this.labelData.length; i++){

                    const event = new Date(this.labelData[i]);
                    
                    let newTimestamp = event.toLocaleTimeString('fi-FI', { timeZone: 'UTC' });

                    this.labelData[i] = newTimestamp;
                }

                this.chartData = {
                    labels: this.labelData.reverse(),
                    datasets: [{
                        label: 'Lämpötila',
                        data: this.tempData.reverse(),
                        yAxisID: 'TemperatureAxis',
                        backgroundColor: '#ffc107',
                        borderColor: '#ffc107'
                    },
                    {
                        label: 'Kosteus',
                        data: this.humiData.reverse(),
                        yAxisID: 'HumidityAxis',
                        backgroundColor: '#0dcaf0',
                        borderColor: '#0dcaf0'
                    }]
                }   
                this.isLoaded = true;


            }).catch(error =>{
                console.log(error);
            })
        }
    },
    async mounted() {
        this.getData();
    }
}

</script>
