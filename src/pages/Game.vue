<script setup lang="js">
//import { ref } from 'vue'
import Terminal from '../components/Terminal.vue'
import TextDisplay from '../components/TextDisplay.vue'

function onCommand(cmd) {
  currentText.value = cmd //  on remplace le contenu de la carte
}
</script>

<template>
  <main>
    <h2>Page Game</h2>

    <TextDisplay />

    <Terminal />
  </main>
</template>

<style scoped></style>
