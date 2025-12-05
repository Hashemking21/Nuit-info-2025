<script setup lang="js">
import { computed } from 'vue';


const { name } = defineProps({
  name :{
    type: String,
    required: true
  }
})

const url = computed(() => {
  return `../../public/imgStep/${name}.avif`
})

</script>

<template>
<img :src="url" alt="step illustration">
</template>

<style scoped>
 img {
  width: 200px;
  aspect-ratio: 1;
 }
</style>
