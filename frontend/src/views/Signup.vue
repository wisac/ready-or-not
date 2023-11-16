<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SignupForm from "../components/SignupForm.vue"
import Welcome from "../components/Welcome.vue";

</script>



<template>
   <div
      class="main w-screen h-screen flex justify-center items-center bg-secondary-dark/95"
   >
      <div
         class="items-center lg:flex-row-reverse flex flex-col justify-center lg:gap-20 xl:gap-40 2xl:gap-60 tv:gap-100 p-5 bg-green-500t w-full h-full"
      >
         <div class="greeting max-w-md bg-black-t">
            <Welcome />
            <div class="text-center my-6">
            </div>
         </div>
         <SignupForm class="max-w-lg shadow-2xl shadow-slate-800" />
      </div>
   </div>
</template>
