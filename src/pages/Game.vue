<script setup lang="js">
</script>

<template>
  <div class="game-page">
    <h1>NIRD QUEST</h1>
    <div>
      <button>Jouer</button>
      <router-link to="/">
        <button>Sortir</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');

.game-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-image: url("@/imgLDPage/game-menu-background.avif");
    background-size: cover;
    background-position: center;
}

h1{
    text-align: center;
    margin: 0;
    padding-top: 1em;
}
</style>
