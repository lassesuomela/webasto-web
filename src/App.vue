<template>

  <nav class="navbar navbar-expand navbar-dark bg-dark">

      <ul class="navbar-nav">

        <p class="navbar-brand">Webaston ohjain</p>

        <router-link :to="{name: 'Login'}" class="nav-link">Kirjaudu sisään</router-link>

        <router-link :to="{name: 'Dashboard'}" class="nav-link">Hallintapaneeli</router-link>

        <router-link :to="{name: 'Timers'}" class="nav-link">Ajastimet</router-link>

        <router-link :to="{name: 'Logs'}" class="nav-link">Historia</router-link>

        <router-link :to="{name: 'Uptime'}" class="nav-link">Uptime</router-link>

        <router-link :to="{name: 'Logout'}" class="nav-link">Kirjaudu ulos</router-link>

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
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  margin-top: 2rem;
}

.navbar-nav{
  margin: 1rem 0 0 1rem;
}

.exact-active-link {
  font-weight: bold;
}
</style>
