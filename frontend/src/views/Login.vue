<script setup>
// import LoginForm from "../components/LoginForm.vue";

// import { ref } from "vue";
</script>

<template>
   <main>
      <div>
         <div class="star w-48 h-48 bottom-10"></div>
         <div class="star w-48 h-48 translate-x-96 translate-y-48"></div>
         <div class="star w-48 h-48 bottom-5 right-10"></div>
         <div class="star w-32 h-32 bottom-72 right-2"></div>
         <div class="star w-48 h-48 left-96"></div>
         <div class="star w-28 h-28"></div>
         <div class="star w-56 h-56 right-10"></div>
         <div class="star w-36 h-36 right-1/3 bottom-1/2"></div>
      </div>
      <div>
         <form action="POST">
            <input type="text">
         </form>
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
