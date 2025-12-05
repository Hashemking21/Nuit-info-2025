<script setup lang="js">
import Terminal from '../components/Terminal.vue'
import TextDisplay from '../components/TextDisplay.vue'
import EarthPanel from '@/components/EarthPanel.vue'
import ImageMain from '@/components/ImageMain.vue'
import Bars from '@/components/Bars.vue'
import { useGameStepsStore } from '@/stores/game-steps.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const gameStepsStore = useGameStepsStore();
const step = storeToRefs(gameStepsStore).filledStep;
const isStarted = ref(false)

function executeCommand(cmd) {
  if (cmd === 'ls') {
    gameStepsStore.enableLsDone();
  } else {
    gameStepsStore.nextStep();
  }
}

function onCommand(cmd) {
  if (step.value.cmdList.includes(cmd)) {
    executeCommand(cmd)
  }
}

function play(){
    isStarted.value = true;
}
</script>

<template>
  <main v-if="!isStarted" style="height: 100dvh; width: 100dvw">
      <div class="game-page">
    <h1 class="title">NIRD QUEST</h1>

    <div class="buttons">
      <button class="btn" @click="play()">JOUER</button>

      <router-link to="/">
        <button class="btn">SORTIR</button>
      </router-link>
    </div>
  </div>
  </main>
  <main class="screen" v-if="isStarted" style="height: 100dvh">
    <p>{{step}}</p>
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
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');

.screen {
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

* {
  font-family: "Space Grotesk", sans-serif;
}
/* --- Page du menu --- */
.game-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* place le titre en haut mais centré */
  align-items: center;
  text-align: center;

  background-image: url("@/imgLDPage/game-menu-background.avif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* --- Titre --- */
.title {
  font-size: 72px;
  font-weight: 700;
  margin-top: 60px;  /* espace sous le haut de l’écran */
  letter-spacing: 3px;
}

/* --- Conteneur des boutons --- */
.buttons {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 70px; /* distance sous le titre */
}

/* --- Style des boutons --- */
.btn {
  width: 200px;
  padding: 18px 0;
  border: 4px solid black;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(2px);
  font-size: 28px;
  font-weight: 600;
  cursor: pointer;

  transition: 0.2s;
}

.menu-btn:hover {
  transform: scale(1.05);
  background: rgba(255,255,255,0.25);
}
</style>
