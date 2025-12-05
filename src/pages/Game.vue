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
      <Bars height1="80" height2="20" />
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
  width: 80%;
  height: 95%;
  align-self: center;
  justify-self: center;
}
.imageName {
  grid-column: 1;
  grid-row: 1;
}
.terminal {
  grid-column: 1;
  grid-row: 2;
  width: 80%;
  height: 80%;
  align-self: center;
  justify-self: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* ombre pour l’effet carte */
}
.data-wrapper {
  grid-column: 2;
  grid-row: 2;
  display: flex;
  background-image: url('../fond/fond.png');
  background-size: cover;
  justify-content: space-around;
  align-items: center;
  border-radius: 8px;
  width: 80%;
  height: 80%;
  align-self: center;
  justify-self: center;
}
</style>
