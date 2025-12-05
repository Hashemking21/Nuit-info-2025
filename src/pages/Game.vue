<script setup lang="js"></script>

<template>
  <div class="game-page">
    <h1 class="title">NIRD QUEST</h1>

    <div class="buttons">
      <button class="menu-btn">JOUER</button>

      <router-link to="/">
        <button class="menu-btn">SORTIR</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

* {
  font-family: "Space Grotesk", sans-serif;
}
/* --- Page du menu --- */
.game-page {
  height: 100vh;
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
.menu-btn {
  width: 200px;
  padding: 18px 0;
  border: 4px solid black;
  border-radius: 20px;
  background: rgba(255,255,255,0.15);
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
