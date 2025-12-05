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
  border-radius: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* ombre pour l’effet carte */
}
</style>
