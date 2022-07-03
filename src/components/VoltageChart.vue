<template>
    <div class="container">
        <div class="container">
            <h2>Jännite</h2>
        </div>

        <Line v-if="isLoaded"
            :chart-data="chartData"
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
        }
    },
    methods: {
        getData() {

            axios.get('/api/voltage/hour').then(response => {

                console.log(response.data);
                for (let i = 0; i < response.data.timestamps.length; i++) {
                    this.labelData[i] = response.data.timestamps[i];
                    this.voltageData[i] = response.data.voltages[i];
                }

                for(var i = 0; i < this.labelData.length; i++){

                    const event = new Date(this.labelData[i]);
                    
                    let newTimestamp = event.toLocaleTimeString('fi-FI');

                    this.labelData[i] = newTimestamp;
                }

                this.chartData = {
                    labels: this.labelData,
                    datasets: [
                        {
                            label: 'Jännite',
                            backgroundColor: '#0d6efd',
                            data: this.voltageData.reverse()
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
