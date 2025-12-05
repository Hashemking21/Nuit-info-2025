<script setup lang="js">
import { ref } from 'vue'
import Terminal from '../components/Terminal.vue'
import TextDisplay from '../components/TextDisplay.vue'
import EarthPanel from '@/components/EarthPanel.vue'
import ImageMain from '@/components/ImageMain.vue'
import Bars from '@/components/Bars.vue'

const currentText = ref('')

function onCommand(cmd) {
  currentText.value = cmd //  on remplace le contenu de la carte
}
</script>

<template>
  <main style="height: 100dvh">
    <ImageMain class="imageName" name="etape0" />
    <TextDisplay class="textDisplay" :text="currentText" />
    <Terminal class="terminal" @command="onCommand" />
    <div class="data-wrapper">
      <EarthPanel :index="5" />
      <Bars height="80" />
      <Bars />
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #fffefeff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.textDisplay {
  grid-column: 2;
  grid-row: 1;
}
.imageName {
  grid-column: 1;
  grid-row: 1;
}
.terminal {
  grid-column: 1;
  grid-row: 2;
}
.data-wrapper {
  grid-column: 2;
  grid-row: 2;
  display: flex;
  background-color: #008812;
  justify-content: center;
  align-items: normal;
}
</style>
