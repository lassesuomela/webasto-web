<template>

    <div class="container">
        <h2>Historia</h2>
    </div>

    <div v-if=!loaded class="container">
        <Loader type="ball-pulse" :scale="1.5"/>
    </div>

    <table class="table table-bordered table-striped" v-if="loaded">
        <thead>
            <tr>
                <th>Id</th>
                <th>Aloitusaika</th>
                <th>Lopetusaika</th>
                <th>Lämmitysaika (min)</th>
                <th>Aikaleima</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="log in logs" :key="log">
                <td>{{log.id}}</td>
                <td>{{log.startTime}}</td>
                <td>{{log.endTime}}</td>
                <td>{{log.onTime}}</td>
                <td>{{log.timestamp}}</td>
            </tr>
        </tbody>
        
    </table>
    <div v-if="maxPage > 1">
        <button class="btn" v-for="index in maxPage" :key="index" @click="getLogs(index)">{{index}}</button>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from 'lightvue/loaders';

import axios from "../axios";

export default {
    
    name: 'LogsComponent',
    components: {
        Loader
    },
    data () {
        return {
            logs: [],
            page: 1,
            maxPage: 1,
            loaded: false
        }
    },
    methods: {
        getLogs(n) {
            axios.get('/api/logs/' + n).then(response => {

                if(response.data.status === "success"){
                    this.logs = response.data.data;
                    this.maxPage = response.data.maxPageAmount;

                    for(var i = 0; i < this.logs.length; i++){

                        const event = new Date(this.logs[i].timestamp);
                        
                        let newTimestamp = event.toLocaleString('fi-FI');

                        this.logs[i].timestamp = newTimestamp;
                    }
                }
                
                this.loaded = true;
            })
        }
    },
    mounted () {
        this.getLogs(this.page)
    }
}

</script>
