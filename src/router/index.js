import { createWebHistory, createRouter } from "vue-router";
import Login from "@/components/Login.vue";
import Timers from "@/components/Timers.vue";
import Logs from "@/components/Logs.vue";
import Logout from "@/components/Logout.vue";

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
  },
  {
    path: "/logs",
    name: "Logs",
    component: Logs,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
