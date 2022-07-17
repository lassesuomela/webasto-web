<template>

    <div class="container">
        <h2>Uptime</h2>
        <br/>
    </div>

    <LoaderTemplate :isLoaded="loaded"/>

    <Card v-if="loaded">
        <div class="container">
            <Bar v-if="loaded"
                :chart-data="this.chartData"
                :height="32"
                :width="64"
                :chart-options="options"
            />
        </div>
    </Card>
</template>

<script>
import axios from "../axios";
import LoaderTemplate from './LoaderTemplate.vue';
import Card from 'lightvue/card';

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    
    name: 'BarChartComponent',
    components: {
        Bar,
        LoaderTemplate,
        Card
    },
    data () {
        return {
            data: [],
            loaded:false,
            chartData: null,
            days: [],
            uptimes : [],
            downtimes : [],
            options: {
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                    }
                }
            }
        }
    },
    methods: {
        async getUptime() {
            axios.get('/api/uptime').then(response => {

                if(response.data.status === "success") {
                    this.data = response.data.data;

                    for (let i = 0; i < this.data.length; i++) {
                        this.days.push(this.data[i].date);
                    }

                    for (let i = 0; i < this.data.length; i++) {
                        this.uptimes.push(this.data[i].uptime);

                        this.downtimes.push(100 - this.data[i].uptime);
                    }

                    this.chartData = {
                        labels: this.days.reverse(),
                        datasets: [{
                            data: this.uptimes.reverse(),
                            backgroundColor: '#198754',
                            label: 'Uptime'
                        },
                        {
                            data: this.downtimes.reverse(),
                            backgroundColor: '#dc3545',
                            label: 'Downtime'
                        }
                        ]
                    }
                    this.loaded = true;

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
