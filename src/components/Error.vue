<template>
    <div class="container">
        <h2>Error:</h2>

        <h4>Liikaa pyyntöjä</h4>

        <br/>

        <router-link :to="{name: 'Login'}">
            <Button
                label="Kirjaudu sisään"
                size="md"
                class="lv--info"
                icon-right="light-icon-arrow-narrow-right"
                rounded
            />
        </router-link>
        
    </div>
</template>

<script>

import Button from 'lightvue/button';

export default {
    
    name: 'ErrorComponent',
    components: {
        Button
    },
    data () {
        return {
        }
    },
    methods: {
        
    }
}

</script>
