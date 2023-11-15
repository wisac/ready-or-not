<script setup>
import { ref } from "vue";

const form = ref({
   email: "",
   password: "",
});
</script>

<template>
   <div
      class="login-container flex flex-col p-8 rounded-2xl w-full mt-5 justify-center items-center bg-primary-dark"
   >
      <img class="w-72" src="../assets/logo.png" alt="" />

      <form action="/home" method="post">
         <div class="form-group">
            <label for="email">Email</label>
            <input
               v-model="form.email"
               type="email"
               name="email"
               id="email"
               placeholder="name@ug.edu.gh"
               class="focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
         </div>
         <div class="form-group">
            <label for="password">Password</label>
            <input
               v-model="form.password"
               type="password"
               name="password"
               id="password"
               placeholder="password"
               class="focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
         </div>
         <button
            type="submit"
            class="w-full rounded-lg h-12 text-xl font-semibold hover:bg-primary-hov bg-accent text-white transition-colors block mx-auto"
         >
            Login
         </button>
      </form>
   </div>
</template>

<style>
.form-group {
   width: 100%;
   background-color: blueviolet;
   margin-bottom: 1.5rem;
}

input[type="email"],
[type="password"] {
   border-radius: 8px;
   padding: 5px;
   outline: solid 1px var(--primary);
   outline-offset: 1px;
   display: block;
   width: 100%;
   height: 3rem;
}

form {
   /* background-color: var(--white-1); */
   background-color: red;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   width: 100%;
}
</style>
