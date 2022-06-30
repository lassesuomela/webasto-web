<template>
    <table class="table table-bordered table-striped">
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
        <button class="btn"  v-for="index in maxPage" :key="index" @click="getLogs(index)">{{index}}</button>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "../axios";

export default {
    
    name: 'LogsComponent',
    components: {
    },
    data () {
        return {
            logs: [],
            page: 1,
            maxPage: 1
        }
    },
    methods: {
        getLogs(n) {
            axios.get('/logs/' + n).then(response => {

                if(response.data.status === "success"){
                    this.logs = response.data.data;
                    this.maxPage = response.data.maxPageAmount;
                }
                
            })
        }
    },
    mounted () {
        this.getLogs(this.page)
    }
}

</script>
