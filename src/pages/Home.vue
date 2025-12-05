<script setup lang="js">
import Card from '../components/Card.vue';
</script>

<template>
   <div id="navbar">
        <img src="" alt="">
        <h1></h1>
    </div>
    <div id="about-us">
        <div id="text">
            <h2>Une entrée vers un numérique libre, responsable et écocitoyen</h2>
            <p>Entrez dans un univers dirigé par de puissants ennemis qui enferment, surveillent à l’extrême et détruisent l’environnement pour rétablir l’harmonie.</p>
            <button>Jouer et sauver Nirdia</button>
        </div>
        <div id="img">
            <img src="" alt="">
        </div>
    </div>
    <h2>Les 3 pilliers de notre démarche</h2>

    <div id="piliersSection">


      <Card
        title="Inclusion"
        text="Accès équitable au numérique, réduction de la fracture numérique…"
        image="/assets/inclusion.avif"
        color="#E8F8FF" />

      <Card
        title="Responsabilité"
        text="Usage raisonné et réflexif de technologies souveraines et respectueuses des données personnelles…"
        image="/assets/Responsabilité.avif"
        color="#b9ff66" />
      <Card
        title="Durabilité"
        text="Lutte contre l’obsolescence programmée par le choix de Linux pour l’équipement, maîtrise des coûts…"
        image="/assets/Durabilité.avif"
        color="#191A23" />
    </div>

</template>

<style scoped>
  #piliersSection {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    margin-top: 50px;
  }
</style>
