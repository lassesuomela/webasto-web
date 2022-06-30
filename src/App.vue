<template>
  <ProgressBar/>
  <LoginForm/>
  <Logs/>
  <TimersComponent/>
  <BarChart/>
</template>

<script>
import LoginForm from "./components/Login.vue"
import ProgressBar from "./components/ProgressBar.vue"
import Logs from "./components/Logs.vue"
import TimersComponent from "./components/Timers.vue"
import BarChart from "./components/BarChart.vue"

export default {
  name: 'App',
  components: {
    LoginForm,
    ProgressBar,
    Logs,
    TimersComponent,
    BarChart
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
