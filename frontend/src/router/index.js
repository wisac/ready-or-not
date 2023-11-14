import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";

const routes = [
   {
      path: "/",
      name: "Login",
      component: Login,
   },
   {
      path: "/signup",
      name: "Signup",
      component: Signup,
   },
   // other routes...
];

const router = createRouter({
   history: createWebHistory("/"),
   routes,
});

export default router;
