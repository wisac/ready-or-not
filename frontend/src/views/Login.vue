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
   <div class="main w-screen h-screen flex justify-center items-center bg-red-500t">
      <div
         class="items-center lg:flex-row-reverse lg:gap-24  flex flex-col justify-center p-3 bg-green-500t w-full h-full"
      >
         <div class="greeting max-w-md bg-black-t">
            <Welcome  />
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
      <!-- <div class="absolute">
         <div class="star w-48 h-48 bottom-10"></div>
         <div class="star w-48 h-48 translate-x-96 translate-y-48"></div>
         <div class="star w-48 h-48 bottom-5 right-10"></div>
         <div class="star w-32 h-32 bottom-72 right-2"></div>
         <div class="star w-48 h-48 left-40"></div>
         <div class="star w-28 h-28"></div>
         <div class="star w-56 h-56 right-10"></div>
         <div class="star w-36 h-36 right-1/3 bottom-1/2"></div>
      </div> -->
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
}
</style>
