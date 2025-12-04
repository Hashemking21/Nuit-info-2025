<template>
  <div class="text-display">
    <!-- Si on a du texte -->
    <p v-if="text">
      {{ text }}
    </p>

    <!-- Si le texte est vide -->
    <p v-else class="empty">Aucun texte à afficher.</p>
  </div>
</template>

<script setup>
/*
  Ce composant reçoit UNE SEULE chose :
    - text : une chaîne de caractères à afficher
*/
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.text-display {
  /* dimensions de la carte */
  width: 40%; /* largeur relative à la page */
  max-width: 600px; /* largeur max */
  min-height: 500px; /* hauteur mini de la carte */

  /* positionnement */
  margin: 40px 40px 0 auto; /* centrée horizontalement, un peu de marge en haut */

  /* look carte */
  background: #000; /* fond noir */
  color: #fff; /* texte blanc */
  border-radius: 12px; /* coins arrondis */
  border: 1px solid #555; /* contour léger */
  padding: 16px 20px; /* un peu d’air autour du texte */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* ombre pour l’effet carte */

  /* pour centrer le texte dedans (optionnel) */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* style du texte vide */
.empty {
  color: #888;
  font-style: italic;
}
</style>
