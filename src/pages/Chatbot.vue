<script setup lang="js">
import { ref, nextTick, onMounted, watch } from 'vue';
import { useSounds } from '../composables/useSounds';
import WelcomeModal from '../components/WelcomeModal.vue';

const messages = ref([]);
const newMessage = ref('');
const messagesContainer = ref(null);
const isLoading = ref(false);
const slothState = ref('default'); // États possibles: 'default', 'reflechis', 'reponse', 'surpris'
const API_URL = 'http://localhost:3000';

// Modal de bienvenue
const showWelcomeModal = ref(false);

// Système de sons
const {
  playSound,
  playStateSound,
  startAmbiance,
  toggleMute,
  isMuted,
  soundsLoaded
} = useSounds();

// Flag pour démarrer l'ambiance au premier clic
let ambianceStarted = false;

// Fonction pour démarrer l'ambiance au premier clic
const tryStartAmbiance = () => {
  if (!ambianceStarted) {
    startAmbiance();
    ambianceStarted = true;
  }
};

// Gestion du modal de bienvenue
const closeWelcomeModal = () => {
  showWelcomeModal.value = false;
};

const startExperience = () => {
  showWelcomeModal.value = false;

  // Démarrer l'ambiance quand l'utilisateur clique sur "Commencer"
  tryStartAmbiance();

  // Petit son de bienvenue
  setTimeout(() => {
    playSound('yawn');
  }, 500);
};

// Message de bienvenue au chargement
onMounted(() => {
  console.log('🎬 Chatbot mounted');

  // Afficher le modal à chaque chargement après un court délai
  setTimeout(() => {
    console.log('⏰ Timeout terminé, affichage du modal...');
    showWelcomeModal.value = true;
    console.log('✅ showWelcomeModal =', showWelcomeModal.value);
  }, 500);

  messages.value.push({
    id: Date.now(),
    text: "hmm... bonjour... je crois... *bâillement*... pose-moi tes questions... lentement...",
    sender: 'bot'
  });

  // Tenter de démarrer l'ambiance (sera bloqué par certains navigateurs)
  setTimeout(() => {
    if (soundsLoaded.value && !showWelcomeModal.value) {
      startAmbiance();
      ambianceStarted = true;
    }
  }, 1000);

  // Ajouter un listener global pour démarrer au premier clic si bloqué
  const startOnFirstClick = () => {
    tryStartAmbiance();
    document.removeEventListener('click', startOnFirstClick);
  };
  document.addEventListener('click', startOnFirstClick);
});

// Watcher pour jouer les sons selon l'état du paresseux
watch(slothState, (newState, oldState) => {
  if (newState !== oldState) {
    playStateSound(newState);
  }
});

const sendMessage = async () => {
  if (newMessage.value.trim() === '' || isLoading.value) return;

  // Son d'envoi de message
  playSound('messageSent');

  // Ajouter le message utilisateur
  messages.value.push({
    id: Date.now(),
    text: newMessage.value,
    sender: 'user'
  });

  const userMsg = newMessage.value;
  newMessage.value = '';

  // Scroll to bottom
  await nextTick();
  scrollToBottom();

  // Afficher le chargement et changer l'état du paresseux à "réfléchis"
  isLoading.value = true;
  slothState.value = 'reflechis';

  try {
    // Envoyer la requête au backend
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMsg })
    });

    if (!response.ok) {
      throw new Error('Erreur réseau');
    }

    const data = await response.json();

    // Simuler un délai pour rendre le bot plus "paresseux"
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Changer l'état à "réponse trouvée"
    slothState.value = 'reponse';

    // Ajouter la réponse du bot
    messages.value.push({
      id: Date.now(),
      text: data.response,
      sender: 'bot',
      category: data.category
    });

    // Retour à l'état par défaut après 3 secondes
    setTimeout(() => {
      slothState.value = 'default';
    }, 3000);

  } catch (error) {
    console.error('Erreur:', error);

    // Le paresseux est surpris par l'erreur !
    slothState.value = 'surpris';

    // Message d'erreur si le serveur n'est pas disponible
    messages.value.push({
      id: Date.now(),
      text: "... *connexion perdue* ... je crois que je me suis endormi... réveille le serveur backend avec 'npm start' dans le dossier backend_chatbot...",
      sender: 'bot'
    });

    // Retour à l'état par défaut après avoir montré la surprise
    setTimeout(() => {
      slothState.value = 'default';
    }, 3000);
  } finally {
    isLoading.value = false;
    await nextTick();
    scrollToBottom();
  }
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Easter egg : clic sur le paresseux
const easterEggMessages = [
  "...zzz... quoi ?... *bâillement* ...",
  "...je dormais presque... *étirement*...",
  "...doucement... je suis en mode économie d'énergie...",
  "...tu m'as réveillé... bon, maintenant que je suis là... pose ta question...",
  "...encore un clic ?... tu aimes vraiment m'embêter...",
  "...je te vois... *clignement lent des yeux*...",
    "...Vu comment tu me fatigues j'espère que je gagnerai le... *clignement lent des yeux*...",
];

let lastEasterEggIndex = -1;

const onSlothClick = () => {
  // Son de branche qui craque
  playSound('clickBranch');

  // Chance aléatoire de bâiller
  if (Math.random() < 0.3) {
    setTimeout(() => playSound('yawn'), 300);
  }

  // Choisir un message aléatoire différent du dernier
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * easterEggMessages.length);
  } while (randomIndex === lastEasterEggIndex && easterEggMessages.length > 1);

  lastEasterEggIndex = randomIndex;

  // Ajouter le message easter egg
  messages.value.push({
    id: Date.now(),
    text: easterEggMessages[randomIndex],
    sender: 'bot'
  });

  // Brève animation de surprise
  const currentState = slothState.value;
  slothState.value = 'surpris';

  setTimeout(() => {
    slothState.value = currentState;
  }, 800);

  // Scroll to bottom
  nextTick(() => scrollToBottom());
};
</script>

<template>
    <WelcomeModal
        :show="showWelcomeModal"
        @close="closeWelcomeModal"
        @start="startExperience"
    />

    <main class="flex flex-col lg:flex-row items-center justify-center gap-5 p-4 lg:p-0 min-h-screen">
        <div class="left-sloth flex w-full lg:w-auto justify-center">
            <div @click="onSlothClick" 
                 class="card-sloth bg-black w-full max-w-[410px] lg:w-[410px] h-[400px] lg:h-[679px] rounded-lg custom-card" 
                 :class="`sloth-${slothState}`">
                <div class="flex justify-end flex-col bottom-0 left-0 w-full p-6 text-white h-full pointer-events-none">
                    <p class="text-sm leading-15 beni-regular text-[60px] lg:text-[120px] ms-0 lg:ms-8" style="margin: 0;">
                        Morphée <br>
                        <span class="beni-light text-[35px] lg:text-[70px]">Zen-Master des serveurs</span>
                    </p>
                    <div class="flex justify-start items-center gap-2 mt-2 lg:mt-0">
                        <img src="../assets/images/paw.png" class="w-6">
                        <p class="beni-light text-[18px] lg:text-[30px]">Paresseux à trois doigts (Bradypus tridactylus), version numérique.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="right-chatbot flex w-full lg:w-auto justify-center">
            <div class="chatbot-container poppins-regular bg-white w-full lg:w-[1000px] h-[600px] lg:h-[735px] rounded-2xl flex flex-col">
                <div class="chatbot-header flex items-center justify-between p-4 border-b">
                    <button class="menu-btn p-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <div class="flex items-center gap-2">
                        <img src="../assets/images/paw.png" class="w-8 h-8" alt="Morphée">
                        <h2 class="text-xl font-semibold">Morphée Chatbot</h2>
                    </div>

                    <button
                        @click="toggleMute"
                        class="audio-btn p-2 rounded-full hover:bg-gray-100 transition-colors"
                        :title="isMuted ? 'Activer les sons' : 'Couper les sons'">
                        <svg v-if="!isMuted" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <line x1="23" y1="9" x2="17" y2="15"></line>
                            <line x1="17" y1="9" x2="23" y2="15"></line>
                        </svg>
                    </button>
                </div>

                <div ref="messagesContainer" class="messages-area flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
                    <div v-for="message in messages" :key="message.id"
                         class="message-wrapper"
                         :class="message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'">
                        <div class="message-bubble max-w-[85%] lg:max-w-[70%] px-4 py-2 lg:px-5 lg:py-3 rounded-2xl"
                             :class="message.sender === 'user' ? 'bg-brown-600 text-white user-message' : 'bg-gray-100 text-gray-800 bot-message'">
                            <p class="text-sm leading-relaxed">{{ message.text }}</p>
                        </div>
                    </div>

                    <div v-if="isLoading" class="message-wrapper flex justify-start">
                        <div class="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <div class="input-area p-4">
                    <form @submit.prevent="sendMessage" class="flex items-center gap-2 lg:gap-3">
                        <input
                            v-model="newMessage"
                            type="text"
                            placeholder="Pose moi une question"
                            class="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-brown-500 text-sm"
                        />
                        <button
                            type="submit"
                            class="send-btn w-12 h-12 rounded-full bg-brown-600 text-white flex items-center justify-center hover:bg-brown-700 transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<style src="./Chatbot.css" scoped></style>