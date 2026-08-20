<template>
  <div class="grid gap-2.5 p-3.5" aria-label="Loading transactions">
    <span
      v-for="index in 6"
      :key="index"
      class="h-14 animate-pulse border-2 border-[#d9e1ec] bg-gradient-to-r from-[#eef3f8] via-white to-[#eef3f8]"
    />
  </div>
</template>
