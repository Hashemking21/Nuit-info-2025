<script setup>
import { ref, onMounted } from 'vue'

const currentCommand = ref('')
const history = ref([])

const inputEl = ref(null)

const emit = defineEmits(['command'])

function sendCommand() {
  const cmd = currentCommand.value.trim()
  if (!cmd) return

  // on ajoute à l'historique
  history.value.push(cmd)
  emit('command', cmd)
  currentCommand.value = ''
}

onMounted(() => {
  // autofocus sur l'input pour taper direct
  focusInput()
})

function focusInput() {
  if (inputEl.value) {
    inputEl.value.focus()
  }
}
</script>

<template>
  <div class="terminal" @click="focusInput">
    <!-- Historique -->
    <div v-for="(line, index) in history" :key="index" class="line">
      <span class="prompt">&gt;</span>
      <span class="text">{{ line }}</span>
    </div>

    <!-- Ligne courante -->
    <div class="line">
      <span class="prompt">&gt;</span>
      <input
        ref="inputEl"
        type="text"
        v-model="currentCommand"
        @keydown.enter="sendCommand"
        class="input-line"
        autocomplete="off"
        spellcheck="false"
      />
    </div>
  </div>
</template>

<style scoped>
.terminal {
  background: #000;
  color: #fff;
  font-family: monospace;
  min-height: 200px;
  width: 80%;

  max-height: 450px;
  overflow-y: scroll;

  border-radius: 8px; /* arrondi des coins */
}

/* une ligne de terminal */
.line {
  display: flex;
  align-items: center;
}

/* le prompt ">" */
.prompt {
  margin-right: 4px;
}

/* texte de l'historique */
.text {
  white-space: pre-wrap;
}

/* input qui ressemble à du texte classique */
.input-line {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: inherit;
  font: inherit;
  padding: 0;
  margin: 0;
}
</style>
