
<template>

    <div class="container">
        <h2>Kirjaudu sisään</h2>
    </div>

    <div class="container">

        <form  @Submit.prevent=AuthenticateUser id="loginForm">
            <InputText
                :bottom-bar="true"
                placeholder="Käyttäjänimi"
                placeholder-color="rgba(0, 0, 0, 0.4)"
                icon-left="light-icon-user"
                type="text"
                required
                name="usernameField"
            />

            <InputText
                :bottom-bar="true"
                type="password"
                placeholder="Salasana"
                placeholder-color="rgba(0, 0, 0, 0.4)"
                icon-left="light-icon-lock"
                required
                name="passwordField"
            />

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
            <Button label="Kirjaudu sisään"
                type="submit"
                size="md"
                class="lv--success"
                icon-right="light-icon-arrow-narrow-right"
                rounded
            />
        </form>
        
        <p>{{loginResponse}}</p>
    </div>
</template>

<script>
import axios from "../axios";
import InputText from 'lightvue/input';
import Button from 'lightvue/button';

import "light-icons/dist/light-icon.css";

export default {
    
    name: 'LoginFormComponent',
    components: {
        InputText,
        Button,
    },
    data () {
        return {
            loginResponse: '',
            isLoggedIn: false,
            password: '',
            username: '',
            otp: '',
        }
    },
    methods: {
        AuthenticateUser(event) {
            
            // use names from the forms as vars in this
            const {usernameField, passwordField, otpField} = Object.fromEntries(new FormData(event.target));

            this.username = usernameField;
            this.password = passwordField;
            this.otp = otpField;

            if(this.otp.length !== 6) {
                this.loginResponse = "OTP koodi on liian lyhyt";
                return;
            }

            let data = {
                username: this.username,
                password: this.password,
                otp: this.otp
            }
            
            axios.post("/api/login", data).then(response => {

                this.loginResponse = response.data.message;

                if(response.data.status === "success"){
                    localStorage.removeItem("token");
                    localStorage.setItem("token", response.data.token);

                    this.$router.push({name:"Home"});
                }
            }).catch(error => {

                if(error.response.status === 429) {
                    this.loginResponse = "Liikaa pyyntöjä liian pienessä ajassa. Kokeile myöhemmin uudestaan.";
                    return;
                }

                if(error.response.status === 400) {
                    this.loginResponse = "Väärin täytetyt kentät";
                    return;
                }

                if(error.response.status !== 200) {
                    this.loginResponse = "Virhe palvelimella";
                    return;
                }
            })
        }
    },
    created () {

    }
}

</script>

<style scoped>

#loginForm {
    display:block;
    width:50%;
    margin:0 auto;
    padding: 2rem;
}
</style>
