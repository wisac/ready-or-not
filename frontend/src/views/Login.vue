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
   <div class="main w-screen flex justify-center bg-red-500">
      <div class="grid grid-rows-2 justify-center bg-green-500 w-full">
         <div class=" greeting bg-black">
            <Welcome />
            <div class="text-center">
               <button
                  @click="goToSignup"
                  class="w-48 rounded-lg h-12 text-xl font-semibold hover:bg-secondary-hover bg-secondary-dark text-white transition-colors"
               >
                  Sign up
               </button>
            </div>
         </div>
         <LoginForm class="" />
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
main {
   background-color: var(--dark-black);
   height: 100vh;
}

label {
   color: white;
}

/* input {
   border-radius: 8px;
   border: 1px solid white;
   padding: 5px;
   margin: 5px;

} */

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
