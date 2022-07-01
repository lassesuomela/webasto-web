
<template>
    <div id="loginForm">
        <form @submit.prevent="AuthenticateUser">
            <div class="form-group">
                <label for="usernameField">Username</label>
                <input v-model="username" placeholder="Username" class="form-control" id="usernameField">
            </div>
            <div class="form-group">
                <label for="passwordField">Password</label>
                <input v-model="password" placeholder="Password" type="password" class="form-control " id="passwordField">
            </div>
            <div id="submitLogin" class="form-group">
                <input type="submit" value="Log in" class="btn btn-primary">

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
            loginResponse: '',
            isLoggedIn: false
        }
    },
    methods: {
        AuthenticateUser() {
            let data = {
                username: this.username,
                password: this.password
            }
            axios.post("/login", data).then(response => {
                this.loginResponse = response.data.message;

                if(response.data.status === "success"){
                    localStorage.removeItem("token");
                    localStorage.setItem("token", response.data.token);

                    this.$router.push({name:"Timers"});
                }
            })
        }
    },
    async mounted () {
        
        const response = await axios.get('/logs');

        if(response.data.status === "success"){
            this.$router.push({name:"Timers"});
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