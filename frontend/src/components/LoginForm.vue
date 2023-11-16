<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const user = ref({
    email: "",
    password: "",
});

const error = ref("");

const router = useRouter();



</script>

<template>
   <div
      class="login-container flex flex-col p-8 rounded-2xl w-full justify-center items-center bg-neutral-lighter"
   >
   <img class="w-56 " src="../assets/logo.png" alt="logo" />
   <h2 class="text-2xl font-bold my-6" >Login to your account</h2>

      <form action="/home" method="post">
         <div class="input-group">
            <label class="font-medium" for="email">Email</label>
            <input
               v-model="user.email"
               type="email"
               name="email"
               required
               id="email"
               placeholder="name@ug.edu.gh"
               class="focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
         </div>
         <div class="input-group">
            <label class="font-medium" for="password">Password</label>
            <input
               v-model="user.password"
               type="password"
               required
               name="password"
               id="password"
               placeholder="password"
               class="focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
         </div>
         <button
            type="submit"
            class="w-full rounded-lg mb-6 h-12 text-xl font-semibold hover:bg-primary-hover bg-primary-dark drop-shadow-md text-white transition-colors block mx-auto" 
         >
            Login
         </button>
         <p class="text-secondary/40 w-64 mobile:w-full text-center">Don’t have an account? <router-link class="text-primary-dark" to="/signup">Sign up here</router-link></p>
         
      </form>
   </div>
</template>

<style scoped>
.input-group {
   width: 100%;
   margin-bottom: 1.5rem;
}

input[type="email"],
[type="password"] {
   border-radius: 8px;
   padding: 5px;
   outline: solid 1px var(--primary-light);
   outline-offset: 1px;
   display: block;
   width: 100%;
   height: 3rem;
}

form {
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   width: 100%;
}
</style>
