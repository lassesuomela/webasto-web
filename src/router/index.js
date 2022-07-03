import { createWebHistory, createRouter } from "vue-router";
import Login from "@/components/Login.vue";
import Timers from "@/components/Timers.vue";
import Logs from "@/components/Logs.vue";
import Logout from "@/components/Logout.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import BarChart from "@/components/BarChart.vue";
import FileUpload from "@/components/FileUpload.vue";

import axios from "../axios"

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/timers",
    name: "Timers",
    component: Timers,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/logs",
    name: "Logs",
    component: Logs,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/",
    name: "Home",
    component: ProgressBar,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/uptime",
    name:"Uptime",
    component: BarChart,
    meta: {
      requireAuth: true
    }
  },
  {
    path:"/upload",
    name:"Upload",
    component: FileUpload,
    meta: {
      requireAuth: true
    }
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',
});

router.beforeEach((to, next) => {

  if(to.meta.requireAuth) {

    axios.get('/api/voltage').then(response => {
      if(response.data.status){
        console.log("Key is good");
        next();
      }
    }).catch(error => {
      if(error.response.status === 401 || error.response.status === 403){
        // key expired
        console.log("Key is bad");
        
        return router.push({name:"Login"});
      }
    })
  }
})

export default router;
