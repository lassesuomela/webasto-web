<template>

    <div class="container">
        <h2>Tapahtuma historia</h2>
        <br/>
    </div>

    <LoaderTemplate :isLoaded="loaded"/>

    <Card v-if="loaded">
        <div class="container">
            <table class="table table-bordered table-striped" v-if="loaded">
                <thead>
                    <tr>
                        <th>Tapahtuma</th>
                        <th>IP osoite</th>
                        <th>Aikaleima</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="record in history" :key="record">
                        <td>{{record.action}}</td>
                        <td>{{record.ip}}</td>
                        <td>{{record.timestamp}}</td>
                    </tr>
                </tbody>
                
            </table>
            <div v-if="maxPage > 1">
                <button class="btn" v-for="index in maxPage" :key="index" @click="getHistory(index)">{{index}}</button>
            </div>
        </div>
    </Card>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import LoaderTemplate from './LoaderTemplate.vue';
import Card from 'lightvue/card';

import axios from "../axios";

export default {
    
    name: 'HistoryComponent',
    components: {
        LoaderTemplate,
        Card
    },
    data () {
        return {
            history: [],
            page: 1,
            maxPage: 1,
            loaded: false
        }
    },
    methods: {
        getHistory(n) {
            axios.get('/api/history/' + n).then(response => {

                if(response.data.status === "success"){
                    this.history = response.data.data;
                    this.maxPage = response.data.maxPageAmount;

                    for(var i = 0; i < this.history.length; i++){

                        const event = new Date(this.history[i].timestamp);
                        
                        let newTimestamp = event.toLocaleString('fi-FI');

                        this.history[i].timestamp = newTimestamp;
                    }
                }
                
                this.loaded = true;
            })
        }
    },
    mounted () {
        this.getHistory(this.page)
    }
}

</script>
