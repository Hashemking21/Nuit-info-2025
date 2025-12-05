import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { frames } from '@/assets/data/frames.js'

export const useGameStepsStore = defineStore('game-steps', () => {
  const step = ref(10);
  const lsDone = ref(true);

  const filledStep = computed(() => {
    const stepObj = JSON.parse(JSON.stringify(frames.find(obj => obj.index === step.value)));

    // Si la commande ls n'a pas encore été effectuée, on n'affiche pas le texte et l'image
    if (!lsDone.value) {
      stepObj.img = '';
      stepObj.text = '';
    }
    return stepObj;
  });

  function enableLsDone() {
    lsDone.value = true;
  }

  function nextStep() {
    console.log('next')
    step.value++;
    lsDone.value = false;
  }

  function nextStepWhitoutLs(){
    step.value++;
    lsDone.value = true;
  }

  function setPilluleRouge() {
    console.log('pillule rouge')
    step.value = 99;
    lsDone.value = true;
  }

  return { step, filledStep, lsDone, enableLsDone, nextStep, nextStepWhitoutLs, setPilluleRouge };
});
