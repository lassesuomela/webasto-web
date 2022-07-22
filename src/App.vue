<template>

  <nav class="navbar navbar-expand navbar-dark">

      <ul class="navbar-nav">

        <p class="navbar-brand">Webasto - Dashboard</p>

          <router-link v-if="hasToken" :to="{name: 'Home'}" class="nav-link">Päänäkymä</router-link>
          <router-link v-if="hasToken" :to="{name: 'Timers'}" class="nav-link">Ajastimet</router-link>
          <router-link v-if="hasToken" :to="{name: 'Logs'}" class="nav-link">Historia</router-link>
          <router-link v-if="hasToken" :to="{name: 'History'}" class="nav-link">Tapahtuma historia</router-link>
          <router-link v-if="hasToken" :to="{name: 'Uptime'}" class="nav-link">Uptime</router-link>
          <router-link v-if="hasToken" :to="{name: 'Upload'}" class="nav-link">OTA</router-link>
          <router-link v-if="hasToken" :to="{name: 'Settings'}" class="nav-link">Asetukset</router-link>
          <router-link v-if="hasToken" :to="{name: 'Logout'}" class="nav-link">Kirjaudu ulos</router-link>
      </ul>
  </nav>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>

import "bootstrap/dist/css/bootstrap.css";

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      hasToken: false,
    }
  },
  beforeMount () {
    if(localStorage.getItem('token')){
      this.hasToken = true;

      this.$router.push({name:"Home"});
    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

#app {
  font-family: 'Roboto Condensed';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #112D4E;
}
nav {
  background-color: #3F72AF;
}
.container {
  margin-top: 2rem;
}
.navbar-nav{
  margin: 1rem 0 0 2rem;
}
.exact-active-link {
  font-weight: bold;
}
</style>
