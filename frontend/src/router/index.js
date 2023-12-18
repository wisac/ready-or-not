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
      document.body.style.backgroundImage =
         "url(https://asetena.com/file_transferred/2021/02/university-of-ghana.jpg)";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
   } else {
      document.body.style.backgroundColor = "#fff"; //white
   }
   next();
});
export default router;
