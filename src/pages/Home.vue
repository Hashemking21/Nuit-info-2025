<script setup lang="js">
import Card from '../components/Card.vue'
</script>

<template>
  <div id="navbar">
    <img src="\src\imgLDPage\Tux-pixelated.avif" alt="" />
    <h1>NIRD QUEST</h1>
  </div>
  <div id="about-us">
    <div>
      <h2>Une entrée vers un numérique libre, responsable et écocitoyen</h2>
      <p>
        Entrez dans un univers dirigé par de puissants ennemis qui enferment, surveillent à
        l’extrême et détruisent l’environnement pour rétablir l’harmonie.
      </p>
      <router-link to="/game">
        <button id="btnJeu">Jouer et sauver Nirdia</button>
      </router-link>
    </div>
    <img id="img" src="\src\imgLDPage\NIRD-logo.avif" alt="Logo NIRD" />
  </div>
  <div id="piliers">
    <h2>Les 3 piliers de notre démarche</h2>
  </div>

  <div id="piliersSection">
    <Card
      title="Inclusion"
      text="Accès équitable au numérique, réduction de la fracture numérique…"
      image="\src\imgLDPage\inclusion.avif"
      color="#ffffff"
      bgTextColor="#b9ff66"
    />

    <Card
      title="Responsabilité"
      text="Usage raisonné et réflexif de technologies souveraines et respectueuses des données personnelles…"
      image="\src\imgLDPage/responsability.avif"
      color="#b9ff66"
    />
    <Card
      title="Durabilité"
      text="Lutte contre l’obsolescence programmée par le choix de Linux pour l’équipement, maîtrise des coûts…"
      image="\src\imgLDPage/durability.avif"
      color="#191A23"
      textColor="#ffffff"
    />
  </div>

  <!-- ===================== FOOTER ===================== -->
  <footer id="footer">
      <div id="footer-logo">
        <img src="\src\imgLDPage\Tux-pixelated.avif" alt="Logo" />
        <h2>NIRD QUEST</h2>
      </div>
      <p>© Copyright 2025 Nird Quest. Ce site est publié sous licence AGPLv3.</p>
  </footer>
  <!-- ================================================== -->
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');

* {
  font-family: 'Space Grotesk', sans-serif;
  margin: 0;
  padding: 0;
}

#navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 70px;
  padding-top: 50px;
}

#navbar img {
  height: 100px;
}

#about-us {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 150px;
  margin-inline: 7.5vw;
}

#about-us div {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 35px;
  width: 35vw;
}

#about-us h2 {
  font-size: 60px;
}

#about-us p {
  font-size: 20px;
}

#img {
  width: 35vw;
}

#piliers {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

#piliers h2 {
  background: #b0ff67;
  border-radius: 5px;
  padding: 5px;
  width: fit-content;
}

#piliersSection {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

#btnJeu {
  background-color: #191a23;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
}

#btnJeu:hover {
  background: #b0ff67;
  color: black;
}

#footer {
  background: #111218;
  color: white;
  padding: 40px 40px;
  border-radius: 40px 40px 0 0;
  margin-top: 80px;
}

#footer-logo {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

#footer-logo img {
  height: 50px;
}
</style>
