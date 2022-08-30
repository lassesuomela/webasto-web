<script>

export default {
    
    name: 'LogoutComponent',
    components: {
        
    },
    data () {
        return {
        }
    },
    methods: {
        Logout() {

            if(localStorage.getItem("token")){
                // remove token from local storage
                localStorage.removeItem("token");
                // and redirect to login page
                this.$router.go();
            }else{
                this.$router.push({name:"Login"});
            }
            
        }
    },
    mounted () {
        this.Logout();
    }
}

</script>
