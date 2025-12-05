<script setup lang="js">
import Terminal from '../components/Terminal.vue'
import TextDisplay from '../components/TextDisplay.vue'
import EarthPanel from '@/components/EarthPanel.vue'
import ImageMain from '@/components/ImageMain.vue'
import Bars from '@/components/Bars.vue'
import HorribleInput from '@/components/HorribleInput.vue'
import SnakeGame from '@/pages/SnakeGame.vue'
import { ref } from 'vue'
import { useGameStepsStore } from '@/stores/game-steps.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'


const gameStepsStore = useGameStepsStore()
const step = storeToRefs(gameStepsStore).filledStep
const apiUrl = "https://nuit-info-2025.onrender.com"

const chatBotResponse = ref(`Gépété :\nBienvenue dans ma tour. Pose-moi tes questions et j'illuminerai ta lanterne.`)
const isSnakeOpen = ref(false)

function executeCommand(cmd) {
  if (cmd === 'ls') {
    if (step.value.index === 1) {
      gameStepsStore.nextStepWhitoutLs()
      return
    }
    gameStepsStore.enableLsDone()
  } else if (cmd === 'ls -a') {
    if (step.value.index >= 3) {
      gameStepsStore.nextStep()
      return
    }
    isSnakeOpen.value = true
  } else if (cmd === 'cat') {
    gameStepsStore.nextStepWhitoutLs()
  } else if (cmd === 'pillule rouge') {
    gameStepsStore.setPilluleRouge()
  } else {
    gameStepsStore.nextStep()
  }
}

function onChatBotCall(cmd) {+
  fetch(`${apiUrl}/api/chat`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application.json'
    },
    body: JSON.stringify({message: cmd})
  })
  .then((response)=> {
    chatBotResponse.value = response
  })
}

function onCommand(cmd) {
  console.log(cmd)
  if (step.value.cmdList.includes(cmd)) {
    executeCommand(cmd)
  }
}
</script>

<template>
  <main style="height: 100dvh">
    <p>{{ step }}</p>
    <ImageMain class="imageName" :name="step.img" />
    <TextDisplay class="textDisplay" :text="step.text" />
    <Terminal class="terminal" @command="onCommand" />
    <div class="data-wrapper">
      <EarthPanel :index="step.etatPlanete" />
      <Bars :height1="step.etatPrison" :height2="step.etatSurveillance" />
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

.horrible-container {
  display: flex;
  justify-content: center;
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
  background-image: url('../../src/assets/fond/fond.png');
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
