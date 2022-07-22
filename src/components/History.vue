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
                        <th>User-Agent</th>
                        <th>IP osoite</th>
                        <th>Aikaleima</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="record in history" :key="record">
                        <td>{{record.action}}</td>
                        <td>{{record.userAgent}}</td>
                        <td>{{record.ip}}</td>
                        <td>{{record.timestamp}}</td>
                    </tr>
                </tbody>
                
            </table>
            <div v-if="maxPage > 1 && maxPage < 5">
                <button class="btn" v-for="index in maxPage" :key="index" @click="getHistory(index)">{{index}}</button>
            </div>
            <div v-else>

                <button v-if="page != 1" class="btn" @click="getHistory(page - 1)">{{page - 1}}</button>
                <button class="btn" @click="getHistory(page)" style="font-weight:bold">{{page}}</button>
                <button v-if="page !== maxPage" class="btn" @click="getHistory(page + 1)">{{page + 1}}</button>
                <button v-if="page !== maxPage && page < 2" class="btn" @click="getHistory(page + 2)">{{page + 2}}</button>
                <span v-if="page !== maxPage">...</span>

                <button v-if="page !== maxPage" class="btn" @click="getHistory(maxPage)">{{maxPage}}</button>
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

            this.page = n;

            axios.get('/api/history/' + n).then(response => {

                if(response.data.status === "success"){
                    this.history = response.data.data;
                    this.maxPage = response.data.maxPageAmount;

                    for(var i = 0; i < this.history.length; i++){

                        const event = new Date(this.history[i].timestamp).toUTCString();

                        this.history[i].timestamp = event;

                        if(this.history[i].userAgent){
                            if(this.history[i].userAgent.length > 30){
                                this.history[i].userAgent = this.history[i].userAgent.substring(0,35) + '...';
                            }
                        }
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
