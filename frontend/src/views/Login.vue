<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";


const router = useRouter();
const goToSignup = () => router.push("/signup");

</script>

<template>
   <main>
      <div class="grid justify-center items-center">
         <div
            class="z-10 flex-col flex text-center justify-center items-center"
         >
            <h1 class="text-3xl font-bold text-white w-80">
               Welcome to ReadyOrNot
            </h1>
            <p class="text-white">
               Your go-to for past exam questions!<br />Boost your prep, ace
               your exams!
            </p>
         </div>
         <div class="text-center">
            <button @click="goToSignup"
               class="w-48 rounded-lg h-12 text-xl font-semibold hover:bg-secondary-hover bg-secondary-dark text-white transition-colors"
            >
               Sign up
            </button>
         </div>
         <!-- <div>
            <form action="POST">
               <input type="text" />
            </form>
         </div> -->
      </div>
      <div class="absolute">
         <div class="star w-48 h-48 bottom-10"></div>
         <div class="star w-48 h-48 translate-x-96 translate-y-48"></div>
         <div class="star w-48 h-48 bottom-5 right-10"></div>
         <div class="star w-32 h-32 bottom-72 right-2"></div>
         <div class="star w-48 h-48 left-40"></div>
         <div class="star w-28 h-28"></div>
         <div class="star w-56 h-56 right-10"></div>
         <div class="star w-36 h-36 right-1/3 bottom-1/2"></div>
      </div>
   </main>
</template>

<style>
body {
   background-color: var(--dark-black);
}
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
