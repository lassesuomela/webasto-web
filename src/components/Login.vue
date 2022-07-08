
<template>

    <div class="container">
        <h2>Kirjaudu sisään</h2>
    </div>

    <div id="loginForm">
        <form @submit.prevent="AuthenticateUser">
            <div class="container">
                <label for="usernameField">Käyttäjänimi</label>
                <input v-model="username" placeholder="Käyttäjänimi" class="form-control" id="usernameField" required>
            </div>
            <div class="container">
                <label for="passwordField">Salasana</label>
                <input v-model="password" placeholder="Salasana" type="password" class="form-control " id="passwordField" required>
            </div>
            <div class="container">
                <label for="otpField">OTP</label>
                <input v-model="otp" placeholder="OTP" type="number" class="form-control " id="otpField" required maxlength="6">
            </div>
            <div id="submitLogin" class="container">
                <input type="submit" value="Kirjaudu sisään" class="btn btn-primary">

                <h5 id="response">{{loginResponse}}</h5>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "../axios";

export default {
    
    name: 'LoginFormComponent',
    components: {
        
    },
    data () {
        return {
            username: '',
            password: '',
            otp: '',
            loginResponse: '',
            isLoggedIn: false
        }
    },
    methods: {
        AuthenticateUser() {
            let data = {
                username: this.username,
                password: this.password,
                otp: this.otp
            }
            axios.post("/api/login", data).then(response => {

                if(response.status === 429) {
                    this.loginResponse = "Liikaa pyyntöjä liian pienessä ajassa. Kokeile myöhemmin uudestaan.";
                    return;
                }

                if(response.status !== 200) {
                    this.loginResponse = "Virhe palvelimella";
                    return;
                }

                this.loginResponse = response.data.message;

                if(response.data.status === "success"){
                    localStorage.removeItem("token");
                    localStorage.setItem("token", response.data.token);

                    this.$router.push({name:"Home"});
                }
            })
        }
    },
    async mounted () {
        
        const response = await axios.get('/api/logs');

        if(response.data.status === "success"){
            this.$router.push({name:"Home"});
        }else{
            localStorage.removeItem("token");
        }
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

#submitLogin {
    margin-top: 1rem;
}

#response {
    margin-top: 1rem;
}

label{
    float:left;
}
</style>