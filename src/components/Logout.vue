<script>

import router from "../router/index"

export default {
    
    name: 'LogoutComponent',
    components: {
        
    },
    data () {
        return {
        }
    },
    methods: {
        LogOut() {
            // remove token from local storage
            localStorage.removeItem("token");

            // and redirect to login page
            router.push({name:"Login"});
        }
    },
    mounted () {
        this.LogOut();
    }
}

</script>
