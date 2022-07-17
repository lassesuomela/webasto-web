<template>

    <div class="container">
        <h2>Asetukset</h2>
        <br/>
    </div>

    <LoaderTemplate :isLoaded="loaded"/>

    <Card v-if="loaded">
        <h3>OTP</h3>

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

        <div v-if=fetchedToken>
            <form  @Submit.prevent=removeOTP id="removeOTPForm">
                <InputText
                    :bottom-bar="true"
                    placeholder="OTP"
                    placeholder-color="rgba(0, 0, 0, 0.4)"
                    maxlength="6"
                    icon-left="light-icon-key"
                    type="text"
                    required
                    name="otpField"
                />

                <br/>
                <Button label="Poista OTP käytöstä"
                    type="submit"
                    size="md"
                    class="lv--danger"
                    icon-right="light-icon-arrow-narrow-right"
                    rounded
                />

                <div class="container" v-if=message>
                    <p>{{message}}</p>
                </div>
            </form>
        </div>
    </Card>
</template>

<script>

import axios from "../axios";
import InputText from 'lightvue/input';
import Button from 'lightvue/button';
import LoaderTemplate from './LoaderTemplate.vue';
import Card from 'lightvue/card';

export default {
    
    name: 'SettingsComponent',
    components: {
        InputText,
        Button,
        LoaderTemplate,
        Card
    },
    data () {
        return {
            firstTimeSetup: false,
            QRValue: "",
            fetchedToken: false,
            otpForDeletion: '',
            message: '',
            loaded: false
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

                this.loaded = true;
            }).catch(error => {
                console.log(error);
                this.firstTimeSetup = false;

                this.loaded = true;
            })
        },
        setupDone() {
            this.firstTimeSetup = false;
            this.$router.push({name:"Logout"});
        },
        removeOTP(event) {

            const {otpField} = Object.fromEntries(new FormData(event.target));

            this.otpForDeletion = otpField;

            if(this.otpForDeletion.length !== 6) {
                this.message = "OTP koodi on liian lyhyt";
                return;
            }

            let data = {
                otp: this.otpForDeletion,
            }

            axios.post('/api/secret/remove', data).then(response => {
                this.message = response.data.message;

                this.$router.go();
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

<style scoped>

#removeOTPForm {
    display:block;
    width:50%;
    margin:0 auto;
    padding: 2rem;
}
</style>
