<script setup lang="js">
//import { ref } from 'vue'
import Terminal from '../components/Terminal.vue'
import TextDisplay from '../components/TextDisplay.vue'
import EarthPanel from '@/components/EarthPanel.vue'

function onCommand(cmd) {
  currentText.value = cmd //  on remplace le contenu de la carte
}
</script>

<template>
  <main style="height: 100dvh">
    <h2>Page Game</h2>

    <TextDisplay class="textDisplay" />
    <Terminal class="terminal" @command="onCommand(commande)" />
    <div class="data-wrapper">
      <EarthPanel :index="5" />
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #cf1e1eff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.textDisplay {
  grid-column: 2;
  grid-row: 1;
}
.terminal {
  grid-column: 1;
  grid-row: 2;
}
.data-wrapper {
  grid-column: 2;
  grid-row: 2;
}
</style>
