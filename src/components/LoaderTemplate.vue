<template>

    <div v-if=!isLoaded class="container">
        <Loader type="ball-pulse" :scale="1.5"/>
    </div>

</template>

<script>

import Loader from 'lightvue/loaders';

export default {
    
    name: 'LoaderComponent',
    props: ['isLoaded'],
    components: {
        Loader
    },
    data () {
        return {
        }
    }
}

</script>
