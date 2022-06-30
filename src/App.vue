<template>
  <div id="nav">
    <router-link to="/login">Login</router-link>
    <router-link style="padding-left: 1em" to="/timers">Timers</router-link>
    <router-link style="padding-left: 1em" to="/logs">Logs</router-link>
    <router-link style="padding-left: 1em" to="/logout">Logout</router-link>
  </div>

  <router-view/>
</template>

<script>

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
  margin-top: 60px;
}
</style>
