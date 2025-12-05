<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'start']);

const closeModal = () => {
  emit('close');
};

const startExperience = () => {
  emit('start');
};

// Watch pour déboguer
watch(() => props.show, (newVal) => {
  console.log('Modal show prop changed to:', newVal);
});
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container" @click.stop>
        <!-- Close button -->
        <button class="modal-close" @click="closeModal" aria-label="Fermer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Content -->
        <div class="modal-content">
          <!-- Image du paresseux - Grande bannière -->
          <div class="modal-hero-image">
            <img src="../assets/images/prolog.webp" alt="Morphée" class="hero-banner">
            <div class="hero-overlay"></div>
          </div>

          <!-- Titre -->
          <div class="modal-header">
            <h2 class="modal-title beni-regular">
              Bienvenue dans l'antre de Morphée
            </h2>
            <p class="modal-subtitle beni-light">
              Zen-Master des Serveurs
            </p>
          </div>

          <!-- Histoire -->
          <div class="modal-story poppins-regular">
            <div class="story-section">
              <h3>
                <svg class="h3-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                L'Histoire
              </h3>
              <p>
                En 2019, dans la canopée humide de l'Amazonie péruvienne, un paresseux à trois doigts
                s'est endormi sur le laptop d'un chercheur... pendant 36 heures... sur les touches
                <span class="highlight">CTRL+ALT+UPLOAD</span>.
              </p>
              <p>
                Résultat : sa conscience a été digitalisée. Morphée s'est réveillé dans le cloud AWS,
                devenant le premier consultant en <span class="highlight">Efficacité Radicale</span>.
                Sa philosophie ? <em>"faire moins... beaucoup moins... idéalement rien..."</em>
              </p>
            </div>

            <div class="story-section">
              <h3>
                <svg class="h3-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4M12 8h.01"></path>
                </svg>
                Mode d'emploi
              </h3>
              <ul class="instructions-list">
                <li>
                  <span class="icon-custom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </span>
                  <span>Pose tes questions tech... lentement... Morphée déteste l'urgence</span>
                </li>
                <li>
                  <span class="icon-custom icon-paw">
                    <img src="../assets/images/paw.png" alt="paw">
                  </span>
                  <span>Clique sur lui pour découvrir des easter eggs paresseux</span>
                </li>
                <li>
                  <span class="icon-custom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17 8c0 1.5-2.5 3-5 3s-5-1.5-5-3M17 16c0 1.5-2.5 3-5 3s-5-1.5-5-3"></path>
                      <path d="M12 2v20"></path>
                      <ellipse cx="12" cy="8" rx="5" ry="3"></ellipse>
                    </svg>
                  </span>
                  <span>Il traduit tout le jargon tech en métaphores de la forêt</span>
                </li>
                <li>
                  <span class="icon-custom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                  </span>
                  <span>Active le son pour une immersion totale (bouton en haut à droite)</span>
                </li>
                <li>
                  <span class="icon-custom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 15s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      <path d="M1 1l22 22" opacity="0.3"></path>
                    </svg>
                  </span>
                  <span>Attention : il s'endort parfois en pleine phrase...</span>
                </li>
              </ul>
            </div>

          
          </div>

          <!-- CTA Button -->
          <button class="modal-cta" @click="startExperience">
            <span>Réveiller Morphée (doucement)</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Petit disclaimer -->
          <p class="modal-disclaimer">
            <img src="../assets/images/paw.png" class="paw-icon" alt="Patte">
            Prends ton temps... Morphée n'est jamais pressé...
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

/* Container */
.modal-container {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-radius: 24px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(139, 111, 71, 0.3);
  animation: modalBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Close button */
.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg) scale(1.1);
}

.modal-close svg {
  color: #fff;
}

/* Content */
.modal-content {
  padding: 0;
  color: #fff;
}

/* Hero Image - Grande bannière */
.modal-hero-image {
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
}

.hero-banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  animation: breatheAvatar 4s ease-in-out infinite;
  filter: brightness(0.9);
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to top, rgba(26, 26, 26, 1) 0%, transparent 100%);
  pointer-events: none;
}

/* Header section */
.modal-header {
  padding: 30px 40px 20px;
  text-align: center;
}

/* Titles */
.modal-title {
  font-size: 36px;
  margin-bottom: 12px;
  color: #f5f5f5;
  text-shadow: 0 2px 10px rgba(139, 111, 71, 0.5);
}

.modal-subtitle {
  font-size: 20px;
  color: #8B6F47;
  margin-bottom: 0;
}

/* Story */
.modal-story {
  font-size: 15px;
  line-height: 1.7;
  color: #e0e0e0;
  padding: 0 40px 30px;
}

.story-section {
  margin-bottom: 25px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border-left: 3px solid #8B6F47;
}

.story-section h3 {
  font-size: 18px;
  margin-bottom: 12px;
  color: #8B6F47;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.h3-icon {
  width: 20px;
  height: 20px;
  stroke: #8B6F47;
  flex-shrink: 0;
}

.story-section p {
  margin-bottom: 10px;
}

.highlight {
  color: #8B6F47;
  font-weight: 600;
  background: rgba(139, 111, 71, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

/* Instructions */
.instructions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.instructions-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  transition: all 0.3s;
}

.instructions-list li:hover {
  background: rgba(139, 111, 71, 0.1);
  transform: translateX(5px);
}

.icon-custom {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8B6F47;
  transition: all 0.3s;
}

.icon-custom svg {
  width: 100%;
  height: 100%;
  stroke: #8B6F47;
}

.icon-paw img {
  width: 24px;
  height: 24px;
  filter: brightness(0) saturate(100%) invert(54%) sepia(10%) saturate(1442%) hue-rotate(359deg) brightness(90%) contrast(84%);
  opacity: 0.9;
}

.instructions-list li:hover .icon-custom {
  transform: scale(1.15);
  color: #d4af77;
}

.instructions-list li:hover .icon-custom svg {
  stroke: #d4af77;
}

.instructions-list li:hover .icon-paw img {
  filter: brightness(0) saturate(100%) invert(71%) sepia(26%) saturate(535%) hue-rotate(356deg) brightness(93%) contrast(89%);
}

/* Quote */
.philosophy {
  background: rgba(139, 111, 71, 0.1) !important;
  border-left-color: #8B6F47;
  text-align: center;
}

.quote {
  font-style: italic;
  font-size: 16px;
  color: #d4af77;
  margin-bottom: 10px;
  line-height: 1.6;
}

.signature {
  font-size: 14px;
  color: #8B6F47;
  font-weight: 600;
}

/* CTA Button */
.modal-cta {
  width: calc(100% - 80px);
  margin: 30px 40px 20px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #8B6F47 0%, #6d5637 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(139, 111, 71, 0.3);
}

.modal-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 111, 71, 0.5);
  background: linear-gradient(135deg, #6d5637 0%, #8B6F47 100%);
}

.modal-cta:active {
  transform: translateY(0);
}

/* Disclaimer */
.modal-disclaimer {
  text-align: center;
  font-size: 13px;
  color: #999;
  padding: 0 40px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.paw-icon {
  width: 16px;
  height: 16px;
  opacity: 0.6;
}

/* Animations */
@keyframes modalBounce {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes breatheAvatar {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(-20px);
}

/* Scrollbar */
.modal-container::-webkit-scrollbar {
  width: 8px;
}

.modal-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.modal-container::-webkit-scrollbar-thumb {
  background: #8B6F47;
  border-radius: 4px;
}

.modal-container::-webkit-scrollbar-thumb:hover {
  background: #6d5637;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-hero-image {
    height: 250px;
  }

  .modal-header {
    padding: 20px 20px 15px;
  }

  .modal-title {
    font-size: 24px;
  }

  .modal-subtitle {
    font-size: 16px;
  }

  .modal-story {
    font-size: 14px;
    padding: 0 20px 20px;
  }

  .story-section {
    padding: 15px;
  }

  .modal-cta {
    font-size: 16px;
    padding: 14px 24px;
    width: calc(100% - 40px);
    margin: 20px 20px 15px;
  }

  .modal-disclaimer {
    padding: 0 20px 25px;
  }
}
</style>
