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
      <div class="star w-32 h-32 top-24 right-[1rem]"></div>
      <div class="star w-20 h-20 top-48 right-80 lg:top-96 lg:right-104"></div>
      <div class="star w-28 h-28 top-5 right-60"></div>
      
      <div class="star w-28 h-28 -left-0"></div>
      <div class="star w-48 h-48 bottom-10 left-10 md:top-20 lg:top-96 md:left-20 lg:left-96"></div>
      <div class="star w-40 h-40 bottom-20 lg:top-10 lg:left-48"></div>
      
      <div class="star w-48 h-48 lg:w-28 lg:h-28 md:w-28 md:h-28 md:bottom-72 bottom-44 right-10"></div>

      <div class="star w-20 h-20 bottom-2 lg:left-48" ></div>
      <div class="star w-40 h-40 bottom-10 right-12 lg:right-48 lg:bottom-9 "></div>


      <!-- <div class="star w-28 h-28"></div> -->
      <!-- <div class="star w-56 h-56 right-10"></div> -->
      <!-- <div class="star w-32 h-32 bottom-72 right-2"></div> -->
      <!-- <div class="star w-52 h-52 lg:-translate-x-[2rem] translate-y-100"></div> -->

   </div>
   <!-- <div class="relative -z-10">
      <div class="star w-48 h-48 bottom-10"></div>
      <div class="star w-48 h-48 translate-x-96 translate-y-48"></div>
      <div class="star w-48 h-48 bottom-5 right-10"></div>
      <div class="star w-24 h-24 bottom-96 -right-48 lg:-right-96"></div>
      <div class="star w-48 h-48 left-40"></div>
      <div class="star w-28 h-28"></div>
      <div class="star w-56 h-56 right-10"></div>
      <div class="star w-32 h-32 bottom-72 right-2"></div>
      <div class="star w-52 h-52 lg:-translate-x-[2rem] translate-y-100"></div>
   </div> -->
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
