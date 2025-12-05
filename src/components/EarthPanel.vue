<script setup lang="js">
import { computed } from 'vue'

const props = defineProps({
  index: {
    type: Number,
    default: 1,
    validator: (value) => value >= 1 && value <= 5,
  },
})

const imageSrc = computed(() => `src/assets/data/Terres/Terre_etat_${props.index}_trans.png`)
</script>

<template>
  <div class="earth-panel-frame">
    <div class="earth-image">
      <img :src="imageSrc" :alt="`État de la Terre ${props.index}`" class="earth-img" />
    </div>
  </div>
</template>

<style scoped>
.earth-panel {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: 400px;
  margin-top: 90px;
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
.earth-panel-frame {
  background: #111; /* Couleur différente du fond */
  border: 2px solid #444; /* Bordure visible mais discrète */
  border-radius: 10px; /* Coins arrondis */
  padding: 12px; /* Espace autour de l’image */

  /* ombre pour que ça "flotte"
  box-shadow: 0 4px 12px rgba(105, 206, 23, 0.4);*/

  /* optionnel : largeur max pour ressembler à une carte */
  max-width: 260px;
  max-height: 220px;
}
</style>
