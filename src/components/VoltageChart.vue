<template>
    <div class="container">
        <div class="container">
            <h2>Jännite</h2>
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
    
    name: 'VoltageChart',
    components: {
        Line
    },
    data () {
        return {
            chartData: null,
            labelData: [],
            voltageData: [],
            isLoaded: false,
            options: {
                scales: {
                    VoltageAxis: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Jännite (V)',
                            font: {
                                size: 18,
                                style: 'normal',
                                lineHeight: 2
                            }
                        },
                        min: 0,
                        suggestedMax: 14
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Viimeisin tunti',
                            font: {
                                size: 18,
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    }
                }
            }
        }
    },
    methods: {
        getData() {

            axios.get('/api/voltage/hour').then(response => {

                for (let i = 0; i < response.data.timestamps.length; i++) {
                    this.labelData[i] = response.data.timestamps[i];
                    this.voltageData[i] = response.data.voltages[i];
                }

                for(var i = 0; i < this.labelData.length; i++){

                    const event = new Date(this.labelData[i]);
                    
                    let newTimestamp = event.toLocaleTimeString('fi-FI', { timeZone: 'UTC' });

                    this.labelData[i] = newTimestamp;
                }

                this.chartData = {
                    labels: this.labelData.reverse(),
                    datasets: [{
                        label: 'Jännite',
                        backgroundColor: '#3F72AF',
                        data: this.voltageData.reverse(),
                        yAxisID: 'VoltageAxis'
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
