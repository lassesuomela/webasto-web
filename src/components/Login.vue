
<template>
    <div id="loginForm">
        <form @submit.prevent="AuthenticateUser">
            <input v-model="username" placeholder="Username">
            <input v-model="password" placeholder="Password" type="password">

            <h5>{{loginResponse}}</h5>
            <br/>
            <input type="submit" value="log in">
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
            loginResponse: ''
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
                }
            })
        }
    }
}

</script>
