import { ref, onMounted, onUnmounted } from 'vue';

// Imports des fichiers audio (Vite nécessite des imports explicites)
const getAudioPath = (filename) => {
  try {
    return new URL(`../assets/sounds/${filename}`, import.meta.url).href;
  } catch (e) {
    console.warn(`Fichier audio non trouvé : ${filename}`);
    return null;
  }
};

// État global partagé entre toutes les instances
const isMuted = ref(false);
const soundsLoaded = ref(false);

// Catalogue des sons avec configuration
const soundCatalog = {
  // Sons d'ambiance
  forestAmbiance: {
    path: getAudioPath('forest-ambiance.mp3'),
    volume: 0.25,
    loop: true,
    type: 'ambiance'
  },

  // Sons d'états du paresseux
  snoring: {
    path: getAudioPath('snoring.mp3'),
    volume: 0.3,
    loop: false,
    type: 'state'
  },
  thinkingHmm: {
    path: getAudioPath('thinking-hmm.mp3'),
    volume: 0.4,
    loop: false,
    type: 'state'
  },
  notificationLazy: {
    path: getAudioPath('notification-lazy.mp3'),
    volume: 0.5,
    loop: false,
    type: 'state'
  },
  gaspSurprise: {
    path: getAudioPath('gasp-surprise.mp3'),
    volume: 0.6,
    loop: false,
    type: 'state'
  },

  // Sons d'interactions
  yawn: {
    path: getAudioPath('yawn.mp3'),
    volume: 0.4,
    loop: false,
    type: 'interaction'
  },
  clickBranch: {
    path: getAudioPath('click-branch.mp3'),
    volume: 0.3,
    loop: false,
    type: 'interaction'
  },
  messageSent: {
    path: getAudioPath('message-sent.mp3'),
    volume: 0.3,
    loop: false,
    type: 'interaction'
  },
  typingSlow: {
    path: getAudioPath('typing-slow.mp3'),
    volume: 0.2,
    loop: false,
    type: 'interaction'
  }
};

// Cache audio (stockage global)
const audioCache = {};
let ambianceAudio = null;

export function useSounds() {
  /**
   * Précharge tous les sons
   */
  const preloadSounds = () => {
    if (soundsLoaded.value) return;

    console.log('🎵 Préchargement des sons Morphée...');

    Object.entries(soundCatalog).forEach(([key, config]) => {
      try {
        if (!config.path) {
          console.warn(`⚠️ Chemin manquant pour le son "${key}"`);
          return;
        }

        const audio = new Audio(config.path);
        audio.volume = config.volume;
        audio.loop = config.loop;
        audio.preload = 'auto';

        // Gérer les erreurs de chargement
        audio.addEventListener('error', () => {
          console.warn(`⚠️ Son "${key}" non trouvé : ${config.path}`);
        });

        // Événement de chargement réussi
        audio.addEventListener('canplaythrough', () => {
          console.log(`✅ Son "${key}" chargé`);
        });

        audioCache[key] = audio;

        // Référence spéciale pour l'ambiance
        if (key === 'forestAmbiance') {
          ambianceAudio = audio;
        }
      } catch (error) {
        console.warn(`⚠️ Erreur de préchargement du son "${key}":`, error);
      }
    });

    soundsLoaded.value = true;
    console.log('✅ Sons préchargés');
  };

  /**
   * Joue un son par son nom
   * @param {string} soundName - Nom du son dans le catalogue
   * @param {object} options - Options de lecture
   */
  const playSound = (soundName, options = {}) => {
    if (isMuted.value) return;

    const audio = audioCache[soundName];
    if (!audio) {
      console.warn(`Son "${soundName}" non trouvé dans le cache`);
      return;
    }

    try {
      // Réinitialiser la position si le son était déjà en cours
      if (!audio.loop) {
        audio.currentTime = 0;
      }

      // Appliquer les options
      if (options.volume !== undefined) {
        audio.volume = Math.min(1, Math.max(0, options.volume));
      }

      // Promesse pour gérer la lecture
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`Erreur de lecture du son "${soundName}":`, error);
        });
      }
    } catch (error) {
      console.warn(`Erreur lors de la lecture de "${soundName}":`, error);
    }
  };

  /**
   * Arrête un son
   * @param {string} soundName - Nom du son
   */
  const stopSound = (soundName) => {
    const audio = audioCache[soundName];
    if (!audio) return;

    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (error) {
      console.warn(`Erreur lors de l'arrêt de "${soundName}":`, error);
    }
  };

  /**
   * Démarre la musique d'ambiance
   */
  const startAmbiance = () => {
    if (isMuted.value || !ambianceAudio) return;

    try {
      ambianceAudio.volume = soundCatalog.forestAmbiance.volume;
      ambianceAudio.loop = true;

      const playPromise = ambianceAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('🌿 Ambiance de forêt démarrée');
          })
          .catch(error => {
            console.warn('⚠️ Impossible de démarrer l\'ambiance (interaction utilisateur requise):', error);
          });
      }
    } catch (error) {
      console.warn('Erreur ambiance:', error);
    }
  };

  /**
   * Arrête la musique d'ambiance
   */
  const stopAmbiance = () => {
    if (!ambianceAudio) return;

    try {
      ambianceAudio.pause();
      ambianceAudio.currentTime = 0;
    } catch (error) {
      console.warn('Erreur arrêt ambiance:', error);
    }
  };

  /**
   * Toggle mute/unmute
   */
  const toggleMute = () => {
    isMuted.value = !isMuted.value;

    if (isMuted.value) {
      // Mettre tous les sons en pause
      Object.values(audioCache).forEach(audio => {
        try {
          audio.pause();
        } catch (e) {
          // Ignore errors
        }
      });
    } else {
      // Redémarrer l'ambiance si on unmute
      startAmbiance();
    }

    return isMuted.value;
  };

  /**
   * Définit le mute
   */
  const setMute = (value) => {
    isMuted.value = value;
    if (isMuted.value) {
      stopAmbiance();
    }
  };

  /**
   * Ajuste le volume d'un son
   */
  const setVolume = (soundName, volume) => {
    const audio = audioCache[soundName];
    if (!audio) return;

    audio.volume = Math.min(1, Math.max(0, volume));
  };

  /**
   * Sons contextuels pour les états du paresseux
   */
  let currentStateSound = null;

  const playStateSound = (state) => {
    const stateToSound = {
      'default': 'snoring',
      'reflechis': 'thinkingHmm',
      'reponse': 'notificationLazy',
      'surpris': 'gaspSurprise'
    };

    // Arrêter le son d'état précédent s'il existe
    if (currentStateSound) {
      stopSound(currentStateSound);
    }

    const soundName = stateToSound[state];
    if (soundName) {
      playSound(soundName);
      currentStateSound = soundName;
    }
  };

  /**
   * Nettoyage à la destruction
   */
  const cleanup = () => {
    Object.values(audioCache).forEach(audio => {
      try {
        audio.pause();
        audio.src = '';
      } catch (e) {
        // Ignore errors
      }
    });
  };

  // Lifecycle hooks
  onMounted(() => {
    preloadSounds();
  });

  onUnmounted(() => {
    cleanup();
  });

  return {
    // État
    isMuted,
    soundsLoaded,

    // Méthodes principales
    playSound,
    stopSound,
    playStateSound,

    // Ambiance
    startAmbiance,
    stopAmbiance,

    // Contrôles
    toggleMute,
    setMute,
    setVolume,

    // Utilitaires
    preloadSounds
  };
}
