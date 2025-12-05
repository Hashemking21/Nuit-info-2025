<script setup lang="js">
import Card from '../components/Card.vue';
</script>

<template>
<div id="navbar">
        <img src="\src\imgLDPage\Tux-pixelated.avif" alt="">
        <h1>NIRD QUEST</h1>
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
            <img src="\src\imgLDPage\NIRD-logo.avif" alt="">
        </div>
    </div>
    <h2 id="piliers" >Les 3 pilliers de notre démarche</h2>

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
        color="#b9ff66" />
      <Card
        title="Durabilité"
        text="Lutte contre l’obsolescence programmée par le choix de Linux pour l’équipement, maîtrise des coûts…"
        image="\src\imgLDPage/durability.avif"
        color="#191A23"
        textColor="#ffffff"/>
    </div>

    <!-- ===================== FOOTER ===================== -->
<footer id="footer">
  <div class="footer-container">

    <!-- Logo + Nom -->
    <div id="footer-left">
      <img src="\src\imgLDPage\Tux-pixelated.avif" alt="Logo"  />
      <h2>NIRD QUEST</h2>
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
#navbar ,#footer-left  {
  max-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 70px;
  }

  #navbar img , #footer-left img {
    height: 50px;
    margin-left: 20px;
    margin-top: 10px;
    }


    #about-us {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 50px;

    }
  #piliers {
      background: #b0ff67; 
      border-radius: 5px; 
      padding: 5px;
      justify-self: center;
      width: fit-content;
      margin-top: 50px;
    }

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

.footer-left :first-child {
  height: min-content;

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
