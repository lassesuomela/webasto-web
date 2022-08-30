import { createWebHistory, createRouter } from "vue-router";
import Login from "@/components/Login.vue";
import Timers from "@/components/Timers.vue";
import Logs from "@/components/Logs.vue";
import Logout from "@/components/Logout.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import BarChart from "@/components/BarChart.vue";
import FileUpload from "@/components/FileUpload.vue";
import Settings from "@/components/Settings.vue";
import Error from "@/components/Error.vue";
import History from "@/components/History.vue";

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
  },
  {
    path:"/settings",
    name:"Settings",
    component: Settings,
    meta: {
      requireAuth: true
    }
  },
  {
    path:"/tooManyRequests",
    name:"Error429",
    component: Error,
  },
  {
    path:"/history",
    name:"History",
    component: History,
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

  document.title = 'Webasto - ' + to.name;

  if(to.meta.requireAuth) {

    // api call is used to determine if the jwt token is still valid
    axios.get('/api/voltage').then(response => {
      if(response.data.status){
        // valid key
        next();
      }
    }).catch(error => {
      localStorage.removeItem("token");

      if(error.response.status === 401 || error.response.status === 403){
        // key expired
        return router.push({name:"Login"});
      }

      if(error.response.status === 429){
        // too many requests
        return router.push({name:"Error429"});
      }
    })
  }
})

export default router;
