<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['update'])

// Refs DOM
const alphabetContainer = ref(null)
const secretInput = ref(null)
const letterRange = ref(null)

// State
const currentIndex = ref(0)
let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ← !#@?%$'.split('')

// Fonts aléatoires
const fonts = [
  'Arial',
  'Courier New',
  'Georgia',
  'Times New Roman',
  'Verdana',
  'Comic Sans MS',
  'Impact',
  'Trebuchet MS',
  'Monospace',
  'Serif',
]

// Fisher–Yates shuffle
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Rendering de l'alphabet
const renderAlphabet = (highlightIndex = Number(letterRange.value?.value)) => {
  const container = alphabetContainer.value
  if (!container) return

  container.innerHTML = ''

  alphabet.forEach((letter, i) => {
    const div = document.createElement('div')
    div.className = 'letter'
    div.textContent = letter

    // Chaos visuel
    const randomRotate = Math.floor(Math.random() * 360)
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)]
    const randomWeight = Math.random() > 0.5 ? 'bold' : '200'
    const randomSize = 16 + Math.floor(Math.random() * 20)
    const randomSkew = Math.floor(Math.random() * 60) - 30

    let transformString = `rotate(${randomRotate}deg) skew(${randomSkew}deg)`
    if (i === highlightIndex) {
      div.classList.add('highlight')
      transformString += ' scale(1.35)'
    }

    div.style.transform = transformString
    div.style.fontFamily = randomFont
    div.style.fontWeight = randomWeight
    div.style.fontSize = `${randomSize}px`

    container.appendChild(div)
  })
}

// Slider change
const onSliderInput = () => {
  currentIndex.value = Number(letterRange.value.value)
  renderAlphabet()
}

// Bouton confirmation
const onConfirm = () => {
  const index = Number(letterRange.value.value)
  const chosenLetter = alphabet[index]
  const input = secretInput.value

  if (!input) return

  if (chosenLetter === '←') {
    input.value = input.value.slice(0, -1)
  } else {
    input.value += chosenLetter
  }

  alphabet = shuffle(alphabet)
  renderAlphabet()
}

// Init
onMounted(() => {
  if (letterRange.value) {
    letterRange.value.max = alphabet.length - 1
  }
  renderAlphabet()
})
</script>

<template>
  <div id="secret-container">
    <div id="alphabet" ref="alphabetContainer"></div>

    <div id="slider-zone">
      <input
        type="range"
        id="letterRange"
        ref="letterRange"
        min="0"
        :max="alphabet.length - 1"
        value="0"
        @input="onSliderInput"
      />
      <div id="currentIndex" hidden>{{ currentIndex }}</div>
    </div>

    <div id="input">
      <input type="text" id="secretInput" ref="secretInput" readonly />
    </div>

    <div class="btn-container">
      <button id="confirmBtn" @click="onConfirm">Confirm Letter</button>
      <button id="validateBtn" @click="emit('update', secretInput.value)">Validate</button>
    </div>
  </div>
</template>

<style scoped>
#secret-container {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: radial-gradient(circle at top, #1a1a1a, #000);
  border: 2px solid #333;
  box-shadow:
    0 0 25px rgba(255, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  color: #eee;
  transition: filter 0.3s;
}

.btn-container {
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: 12px;
}

#alphabet {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  gap: 12px;
  width: 300px;
  height: 360px;
  margin-bottom: 12px;
  padding: 30px;
  background: rgba(20, 20, 20, 0.6);
  border-radius: 6px;
  backdrop-filter: blur(2px);
  border: 1px solid #444;
}

:deep(.letter) {
  padding: 4px 6px;
  border: 1px solid #222;
  user-select: none;
  display: inline-block;
  transition:
    transform 0.2s,
    background 0.2s,
    box-shadow 0.2s;
  background: rgba(40, 40, 40, 0.9);
  color: #f2f2f2;
  text-shadow: 0 0 3px rgba(255, 0, 0, 0.5);
  border-radius: 4px;
}

:deep(.letter:hover) {
  background: #550000;
  box-shadow: 0 0 6px red;
}

:deep(.letter.highlight) {
  background: yellow;
  color: black;
  border: 2px solid black;
  box-shadow: 0 0 15px rgba(255, 255, 0, 0.8);
}

/* zone slider */
#slider-zone {
  margin-bottom: 12px;
  rotate: 180deg;
  width: 100%;
}

#slider-zone input[type='range'] {
  width: 100%;
  appearance: none;
  background: transparent;
}

#slider-zone input[type='range']::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: red;
  border: 2px solid black;
  box-shadow: 0 0 8px red;
  cursor: grab;
  transform: translateY(-6px);
}

#slider-zone input[type='range']::-webkit-slider-thumb:active {
  cursor: grabbing;
}

#slider-zone input[type='range']::-webkit-slider-runnable-track {
  height: 4px;
  background: linear-gradient(90deg, #330000, #990000);
  border-radius: 3px;
}

/* Input secret : rendu plus "corrompu" */
#secretInput {
  width: 280px;
  padding: 10px;
  font-size: 18px;
  text-align: center;
  background: #111;
  border: 2px solid #550000;
  color: #ee0000;
  text-shadow: 0 0 4px red;
  box-shadow: inset 0 0 10px rgba(255, 0, 0, 0.3);
  caret-color: transparent; /* rend la saisie plus perturbante */
  letter-spacing: 2px; /* input plus difficile à lire */
}

#secretInput:focus {
  outline: none;
  box-shadow:
    inset 0 0 16px rgba(255, 0, 0, 0.4),
    0 0 12px red;
}

/* Bouton confirm */
#confirmBtn {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background: linear-gradient(180deg, #440000, #220000);
  border: 1px solid #880000;
  color: #eee;
  border-radius: 6px;
  text-shadow: 0 0 4px red;
  transition:
    background 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}

#confirmBtn:hover {
  background: #660000;
  box-shadow: 0 0 10px red;
  transform: translateY(-2px);
}

#confirmBtn:active {
  transform: translateY(1px);
  box-shadow: 0 0 5px red inset;
}

#validateBtn {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background: linear-gradient(180deg, #004400, #220000);
  border: 1px solid #008812;
  color: #eee;
  border-radius: 6px;
  text-shadow: 0 0 4px rgb(0, 255, 13);
  transition:
    background 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}

#validateBtn:hover {
  background: #006605;
  box-shadow: 0 0 10px rgb(21, 255, 0);
  transform: translateY(-2px);
}

#validateBtn:active {
  transform: translateY(1px);
  box-shadow: 0 0 5px rgb(0, 255, 0) inset;
}
</style>
