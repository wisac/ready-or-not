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

//set background color for login and signup pages
router.beforeEach((to, from, next) => {
   if (to.name === "Login" || to.name === "Signup") {
      document.body.style.backgroundColor = "#1F384C"; //dark-bg
   }
   else {
      document.body.style.backgroundColor = ""; //white
   }
   next();
});
export default router;
