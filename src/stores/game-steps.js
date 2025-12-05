import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { frames } from '@/assets/data/frames.js'

export const useGameStepsStore = defineStore('game-steps', () => {
  const step = ref(0);
  const lsDone = ref(false);

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
    step.value++;
    lsDone.value = false;
  }

  return { step, filledStep, lsDone, enableLsDone, nextStep };
});
