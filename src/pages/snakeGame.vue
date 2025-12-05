<template>
  <div class="snake-container">
    <h2>Snake Game Vue.js</h2>

    <div class="score-board">
      <span>Score : {{ score }}</span>
      <span v-if="highScore > 0">Record : {{ highScore }}</span>
    </div>

    <div class="canvas-wrapper">
      <canvas
        ref="gameCanvas"
        :width="boardSize"
        :height="boardSize"
      ></canvas>

      <div v-if="!isPlaying" class="overlay">
        <h3 v-if="isGameOver">Game Over!</h3>
        <button @click="startGame">
          {{ isGameOver ? 'Rejouer' : 'Commencer' }}
        </button>
      </div>
    </div>

    <div class="controls-hint">
      Utilisez les flèches du clavier pour jouer ⬆️⬇️⬅️➡️
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// --- Configuration ---
const boardSize = 400; // Taille du canvas en pixels
const gridSize = 20;   // Taille d'une case (serpent et pomme)
const tileCount = boardSize / gridSize; // Nombre de cases par ligne/colonne
const speed = 100;     // Vitesse du jeu en ms (plus bas = plus vite)

// --- État Réactif ---
const gameCanvas = ref(null);
const score = ref(0);
const highScore = ref(localStorage.getItem('snakeHighScore') || 0);
const isPlaying = ref(false);
const isGameOver = ref(false);

// --- Variables de jeu (Non-réactives pour la boucle) ---
let ctx = null;
let intervalId = null;
let snake = [];
let food = { x: 0, y: 0 };
let velocity = { x: 0, y: 0 };
let nextVelocity = { x: 0, y: 0 }; // Buffer pour éviter les demi-tours instantanés

// --- Initialisation ---
onMounted(() => {
  ctx = gameCanvas.value.getContext('2d');
  window.addEventListener('keydown', handleKeydown);
  resetGame();
  draw(); // Dessiner l'écran initial
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  clearInterval(intervalId);
});

// --- Logique du Jeu ---
const startGame = () => {
  if (isPlaying.value) return;

  resetGame();
  isPlaying.value = true;
  isGameOver.value = false;

  // Initialiser le mouvement (vers la droite par défaut)
  velocity = { x: 1, y: 0 };
  nextVelocity = { x: 1, y: 0 };

  intervalId = setInterval(gameLoop, speed);
};

const resetGame = () => {
  snake = [
    { x: 10, y: 10 }, // Tête
    { x: 9, y: 10 },
    { x: 8, y: 10 }   // Queue
  ];
  score.value = 0;
  velocity = { x: 0, y: 0 };
  placeFood();
};

const gameLoop = () => {
  // Mise à jour de la direction
  velocity = { ...nextVelocity };

  // Calcul de la nouvelle position de la tête
  const head = {
    x: snake[0].x + velocity.x,
    y: snake[0].y + velocity.y
  };

  // 1. Vérification Collision Murs
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver();
    return;
  }

  // 2. Vérification Collision Soi-même
  for (let part of snake) {
    if (head.x === part.x && head.y === part.y) {
      gameOver();
      return;
    }
  }

  // Avancer le serpent (ajouter la nouvelle tête)
  snake.unshift(head);

  // 3. Manger la pomme
  if (head.x === food.x && head.y === food.y) {
    score.value += 10;
    placeFood();
    // On ne retire pas la queue, donc le serpent grandit
  } else {
    // Si pas de pomme, on retire la queue pour garder la même taille
    snake.pop();
  }

  draw();
};

const placeFood = () => {
  // Placer la pomme aléatoirement, mais pas sur le serpent
  let validPosition = false;
  while (!validPosition) {
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };

    validPosition = !snake.some(part => part.x === food.x && part.y === food.y);
  }
};

const gameOver = () => {
  isPlaying.value = false;
  isGameOver.value = true;
  clearInterval(intervalId);

  if (score.value > highScore.value) {
    highScore.value = score.value;
    localStorage.setItem('snakeHighScore', highScore.value);
  }
};

// --- Rendu Graphique (Canvas) ---
const draw = () => {
  // Fond noir
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, boardSize, boardSize);

  // Dessiner la pomme (Rouge)
  ctx.fillStyle = '#ff4757';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

  // Dessiner le serpent (Vert)
  ctx.fillStyle = '#2ed573';
  snake.forEach((part, index) => {
    // La tête est un peu plus claire
    if (index === 0) ctx.fillStyle = '#7bed9f';
    else ctx.fillStyle = '#2ed573';

    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
  });
};

// --- Contrôles ---
const handleKeydown = (e) => {
  // Empêcher le scroll avec les flèches
  if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
  }

  switch (e.key) {
    case 'ArrowLeft':
      if (velocity.x !== 1) nextVelocity = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (velocity.x !== -1) nextVelocity = { x: 1, y: 0 };
      break;
    case 'ArrowUp':
      if (velocity.y !== 1) nextVelocity = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (velocity.y !== -1) nextVelocity = { x: 0, y: 1 };
      break;
  }
};
</script>

<style scoped>
.snake-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  color: white;
  background-color: #2f3542;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;
}

.score-board {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: bold;
}

.canvas-wrapper {
  position: relative;
  border: 4px solid #57606f;
  border-radius: 4px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

button {
  background-color: #2ed573;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  transition: background 0.2s;
}

button:hover {
  background-color: #26af61;
}

.controls-hint {
  margin-top: 15px;
  color: #a4b0be;
  font-size: 0.9rem;
}
</style>
