<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";
import Welcome from "../components/Welcome.vue";
import LoginForm from "../components/LoginForm.vue";

const router = useRouter();
const goToSignup = () => router.push("/signup");



onMounted(() => {
   //when mounted
});
onBeforeUnmount(() => {
   //before mounting
});
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
               <button
                  @click="goToSignup"
                  class="w-48 rounded-lg h-12 text-xl font-semibold hover:bg-accent-hover bg-accent text-white transition-colors"
               >
                  Get Started
               </button>
            </div>
         </div>
         <LoginForm class="max-w-lg shadow-2xl shadow-slate-800" />
      </div>
   </div>
</template>

<style scoped>
.star {
   clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
   );
   background-color: rgba(87, 101, 190, 0.363);
   position: absolute;
   rotate: 45deg;
   z-index: -1;
}
</style>
