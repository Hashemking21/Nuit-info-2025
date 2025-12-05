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
            <router-link to="/game">
                <button id="btnJeu">Jouer et sauver Nirdia</button>
            </router-link>
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
        image="\src\imgLDPage\inclusion.avif"
        color="#E8F8FF" />

      <Card
        title="Responsabilité"
        text="Usage raisonné et réflexif de technologies souveraines et respectueuses des données personnelles…"
        image="\src\imgLDPage/responsability.avif"
        color="#b9ff66" />
      <Card
        title="Durabilité"
        text="Lutte contre l’obsolescence programmée par le choix de Linux pour l’équipement, maîtrise des coûts…"
        image="\src\imgLDPage/durability.avif"
        color="#191A23" />
    </div>

    <!-- ===================== FOOTER ===================== -->
<footer id="footer">
  <div class="footer-container">

    <!-- Logo + Nom -->
    <div class="footer-left">
      <img src="" alt="Logo" class="footer-logo" />
      <h2>NIRD QUEST</h2>

      <h3 class="contact-title">Contact us:</h3>

      <p>Email: info@positivus.com</p>
      <p>Phone: 555-567-8901</p>
      <p>
        Address: 1234 Main St<br />
        Moonstone City, Stardust State 12345
      </p>
    </div>

    <!-- Menu -->
    <div class="footer-center">
      <a href="#">About us</a>
      <a href="#">Services</a>
      <a href="#">Use Cases</a>
      <a href="#">Pricing</a>
      <a href="#">Blog</a>
    </div>

    <!-- Newsletter -->
    <div class="footer-right">
      <div class="newsletter-box">
        <input type="email" placeholder="Email" />
        <button>Subscribe to news</button>
      </div>
    </div>

  </div>

  <hr />

  <div class="footer-bottom">
    <p>© 2023 Positivus. All Rights Reserved.</p>
    <a href="#">Privacy Policy</a>
  </div>
</footer>
<!-- ================================================== -->


</template>

<style scoped>
  #piliersSection {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    margin-top: 50px;
  }

  #btnJeu {
    background-color: #191A23;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
  }

  #footer {
  background: #111218;
  color: white;
  padding: 60px 40px;
  border-radius: 40px 40px 0 0;
  margin-top: 80px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-left {
  max-width: 300px;
}

.footer-logo {
  width: 80px;
}

.contact-title {
  background: #b0ff67;
  padding: 6px 14px;
  border-radius: 6px;
  color: #000;
  font-weight: bold;
  display: inline-block;
  margin: 20px 0 10px;
}

.footer-center a {
  display: block;
  margin: 8px 0;
  color: white;
  text-decoration: underline;
  cursor: pointer;
}

.footer-right .newsletter-box {
  background: #23242a;
  padding: 25px;
  border-radius: 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.newsletter-box input {
  padding: 12px 15px;
  border-radius: 10px;
  border: 1px solid #aaa;
  background: none;
  color: white;
}

.newsletter-box button {
  background: #b0ff67;
  padding: 12px 20px;
  border-radius: 12px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.footer-bottom a {
  color: white;
  text-decoration: underline;
}

</style>
