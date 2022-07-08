<template>

    <div class="container">
        <h2>Asetukset</h2>
    </div>

    <div class="container">
        <h3>OTP</h3>
    </div>
    

    <div class="container" v-if=!fetchedToken>
        <p>Konfiguroi OTP ensimmäisen kerran:
            <span><button class="btn btn-primary" @click=setupOTP>Setup</button></span>
        </p>
    </div>

    <div class="container" v-if=firstTimeSetup>
        <div>
            <p>QR Code:</p>
            
            <img :src=QRValue>
            <br/>
            <button class="btn btn-success" @click=setupDone>Valmis</button>
        </div>
    </div>

    <div class="container" v-if=fetchedToken>
            <input type="text" placeholder="OTP koodi" v-model="otpForDeletion" required maxlength=6/>

            <div class="container">
                <input type="submit" class="btn btn-danger" @click=removeOTP value="Poista OTP käytöstä"/>
            </div>

            <div class="container" v-if=message>
                <p>{{message}}</p>
            </div>
    </div>
</template>

<script>

import axios from "../axios";

export default {
    
    name: 'SettingsComponent',
    components: {
    },
    data () {
        return {
            firstTimeSetup: false,
            QRValue: "",
            fetchedToken: false,
            otpForDeletion: '',
            message: '',
        }
    },
    methods: {
        setupOTP() {
            axios.post('/api/secret').then(response => {

                this.QRValue = response.data.secret.qr;
                this.firstTimeSetup = true;
            })
        },
        genToken() {
            axios.get('/api/token').then(response => {

                if(response.data.status === "success"){
                    this.fetchedToken = true;
                }
            }).catch(error => {
                console.log(error);
                this.firstTimeSetup = false;
            })
        },
        setupDone() {
            this.firstTimeSetup = false;
            this.genToken();
        },
        removeOTP() {

            let data = {
                otp: this.otpForDeletion,
            }

            axios.post('/api/secret/remove', data).then(response => {
                this.message = response.data.message;
            }).catch(error => {
                this.message = error.response.data.message;
                console.log(error.response.data);
            })
        }
    },
    mounted () {
        this.genToken();
    }
}

</script>
