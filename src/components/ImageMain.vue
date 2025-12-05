<script setup lang="js">
import { computed } from 'vue'

const { name } = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const url = computed(() => {
  return `../../public/imgStep/${name}.avif`
})
</script>

<template>
  <div class="image-wrapper">
    <img :src="url" alt="step illustration" />
  </div>
</template>

<style scoped>
.image-wrapper {
  display: flex;
  align-self: center;
  justify-content: center;
}
img {
  width: 70%;
  aspect-ratio: 1;
}
</style>
