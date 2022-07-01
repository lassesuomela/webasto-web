<template>

    <Bar v-if="isLoaded"
        :chart-data="this.chartData"
        :height="32"
        :width="64"
    />
</template>

<script>
import axios from "../axios";

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    
    name: 'BarChartComponent',
    components: {
        Bar
    },
    data () {
        return {
            data: [],
            isLoaded:false,
            chartData: null,
            days: [],
            uptimes : [],
        }
    },
    methods: {
        async getUptime() {
            axios.get('/uptime').then(response => {

                if(response.data.status === "success") {
                    this.data = response.data.data;

                    for (let i = 0; i < this.data.length; i++) {
                        this.days.push(this.data[i].date);
                    }

                    for (let i = 0; i < this.data.length; i++) {
                        this.uptimes.push(this.data[i].uptime);
                    }

                    this.chartData = {
                        labels: this.days,
                        datasets: [{
                            data: this.uptimes,
                            backgroundColor: '#198754',
                            label: 'Uptime'
                        }]
                    }
                    this.isLoaded = true;

                }
            }).catch(err => {
                console.log(err);
            })
        }
        
    },
    async mounted () {
        await this.getUptime();
    }
}

</script>
