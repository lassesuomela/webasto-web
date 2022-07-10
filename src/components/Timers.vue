<template>

    <div class="container">
        <h2>Ajastimet</h2>
    </div>

    <div v-if=!loaded class="container">
        <Loader type="ball-pulse" :scale="1.5"/>
    </div>

    <table class="table table-bordered table-striped" v-if=loaded>
        <thead>
            <tr>
                <th>Viikonpäivä</th>
                <th>1. Aloitusaika</th>
                <th>2. Aloitusaika</th>
                <th>1. Aktivoitu</th>
                <th>2. Aktivoitu</th>
                <th>Lämmitysaika (min)</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(timer, index) in timers" :key="timer">

                <td>{{weekdays[index]}}</td>
                <td>{{timer.time}}</td>
                <td>{{timer.time2}}</td>
                <td>{{timer.enabled}}</td>
                <td>{{timer.enabled2}}</td>
                <td>{{timer.onTime}}</td>
            </tr>
        </tbody>
        
    </table>
</template>

<script>

import axios from "../axios";
import Loader from 'lightvue/loaders';

export default {
    
    
    name: 'TimersComponent',
    components: {
        Loader
    },
    data () {
        return {
            timers: [],
            weekdays: ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai"],
            loaded: false
        }
    },
    methods: {
        getTimers() {
            axios.get('/api/timers/all').then(response => {

                this.timers = response.data;

                // more visually pleasing dispay of activated and deactivated timers
                for(let i = 0; i < this.timers.length; i++){
                    if(this.timers[i].enabled === 0){
                        this.timers[i].enabled = 'Ei';
                    }else{
                        this.timers[i].enabled = 'Kyllä';
                    }

                    if(this.timers[i].enabled2 === 0){
                        this.timers[i].enabled2 = 'Ei';
                    }else{
                        this.timers[i].enabled2 = 'Kyllä';
                    }
                }

                this.loaded = true;
            })
        }
    },
    mounted () {
        this.getTimers()
    }
}

</script>
