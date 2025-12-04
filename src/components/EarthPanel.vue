<script setup lang="js">
import { computed } from 'vue'

const props = defineProps({
  index: {
    type: Number,
    default: 1,
    validator: (value) => value >= 1 && value <= 5
  }
})

const imageSrc = computed(() => `/data/Terres/Terre_etat_${props.index}_trans.png`)
</script>

<template>

  <div class="earth-panel">
    <h2>Earth Panel</h2>
    <p>Ceci est le composant Earth.</p>

    <div class="earth-image">
      <img :src="imageSrc" :alt="`État de la Terre ${props.index}`" class="earth-img" />
    </div>

    <!-- Fallback SVG si l'image ne charge pas -->
    <div v-if="false" aria-hidden="true" class="inline-svg">
      <svg width="200" height="200" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Globe">
        <defs>
          <radialGradient id="g" cx="30%" cy="30%">
            <stop offset="0%" stop-color="#6EE7B7" />
            <stop offset="100%" stop-color="#2E7D32" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#2196F3" />
        <path d="M8 32c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24S8 45.255 8 32z" fill="url(#g)" opacity="0.9" />
        <path d="M16 18c6-6 14-6 20-6s14 0 20 6" stroke="#145A32" stroke-width="1.5" fill="none" />
        <path d="M16 46c6 6 14 6 20 6s14 0 20-6" stroke="#145A32" stroke-width="1.5" fill="none" />
        <path d="M22 10c3 8 5 16 4 24s-5 18-8 22" stroke="#81C784" stroke-width="1.2" fill="none" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.earth-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 12px;
}
.earth-img {
  max-width: 220px;
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}
.earth-image svg {
  max-width: 220px;
  width: 100%;
  height: auto;
  display: block;
}
</style>
