<template>
    <div class="container">
        <div class="container">
            <h2>Lämpötila ja kosteus</h2>
        </div>

        <Line v-if="isLoaded"
            :chart-data="this.chartData"
            :height="32"
            :width="128"
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
            isLoaded: false
        }
    },
    methods: {
        getData() {

            axios.get('/api/temp/hour').then(response => {

                console.log(response.data);
                for (let i = 0; i < response.data.timestamps.length; i++) {
                    this.labelData[i] = response.data.timestamps[i];
                    this.tempData[i] = response.data.temperatures[i];
                    this.humiData[i] = response.data.humidities[i];
                }

                this.chartData = {
                    labels: this.labelData.reverse(),
                    datasets: [
                        {
                            label: 'Lämpötila',
                            backgroundColor: '#ffc107',
                            data: this.tempData.reverse()
                        },
                        {
                            label: 'Kosteus',
                            backgroundColor: '#0dcaf0',
                            data: this.humiData.reverse()
                        }
                    ]
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
