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
        LogOut() {
            // remove token from local storage
            localStorage.removeItem("token");

            // and redirect to login page
            this.$router.push({name:'Login'});
        }
    },
    beforeMount () {
        this.LogOut();
    }
}

</script>
