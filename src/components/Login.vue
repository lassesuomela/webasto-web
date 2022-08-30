
<template>

<div class="container col-md-8" id="loginPage">
    <Card>

        <div class="container">
            <h1>Kirjaudu sisään</h1>
        </div>


        <form  @Submit.prevent=AuthenticateUser id="loginForm">
            <InputText
                placeholder="Käyttäjänimi"
                placeholder-color="rgba(63, 114, 175, 0.4)"
                icon-left="light-icon-user"
                type="text"
                required
                name="usernameField"
                class="inputField"
            />

            <InputText
                type="password"
                placeholder="Salasana"
                placeholder-color="rgba(63, 114, 175, 0.4)"
                icon-left="light-icon-lock"
                required
                name="passwordField"
                class="inputField"
            />

            <InputText
                placeholder="OTP"
                placeholder-color="rgba(63, 114, 175, 0.4)"
                maxlength="6"
                icon-left="light-icon-key"
                type="text"
                name="otpField"
                class="inputField"
            />

            <div class="container">
                <Button label="Kirjaudu sisään"
                    type="submit"
                    size="md"
                    icon-right="light-icon-arrow-narrow-right"
                    rounded
                    class="submitButton"
                />
            </div>
        </form>

        <p>{{loginResponse}}</p>
    </Card>
</div>
</template>

<script>
import axios from "../axios";
import InputText from 'lightvue/input';
import Button from 'lightvue/button';
import Card from 'lightvue/card';

import "light-icons/dist/light-icon.css";

export default {
    
    name: 'LoginFormComponent',
    components: {
        InputText,
        Button,
        Card,
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

            if(this.otp.length < 6 && this.otp.length > 0) {
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

                    // refresh instead of redirect
                    this.$router.go();
                }
            }).catch(error => {

                if(error.response.status === 400 && error.response.data.status === "error") {
                    this.loginResponse = error.response.data.message;
                    return;
                }

                if(error.response.status === 429) {
                    this.loginResponse = "Liikaa pyyntöjä liian pienessä ajassa. Kokeile myöhemmin uudestaan.";
                    return;
                }

                if(error.response.status === 400) {
                    this.loginResponse = "Täytä kaikki kentät";
                    return;
                }

                if(error.response.status !== 200) {
                    this.loginResponse = "Virhe palvelimella";
                    return;
                }
            })
        }
    },
    mounted () {
        if(localStorage.getItem('token')){
            this.$router.push({name:"Home"});
        }
    }
}

</script>

<style scoped>

#loginPage {
    padding-top:6rem;
}
#loginForm {
    display:block;
    width:50%;
    margin:0 auto;
    padding: 2rem;
}
.submitButton {
    background-color: #3F72AF; /** normal bg color*/
    --theme-color: #112D4E; /** pressed bg color and hover text color*/
    --theme-color-dark: #3F72AF; /** hover bg color */
}
.inputField {
    background-color: #3F72AF;
}
</style>
