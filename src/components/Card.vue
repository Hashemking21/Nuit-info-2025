<script setup lang="js"></script>

<template>
    <div id="card">
        <div id="text">
            <h2>Inclusion</h2>
            <p>
            Accès équitable au numérique, réduction de la fracture numérique…
            </p>
        </div>
        <div>
            <img src="" alt="">
        </div>
    </div>
</template>

<style scoped>
#card {
  display: flex;
  width: 600px;
  padding: 50px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 45px;
  border: 1px solid var(--Dark, #191A23);
  background: var(--Grey, #F3F3F3);
  box-shadow: 0 5px 0 0 #191A23;
}

#text {
  display: flex;
  width: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 14px;
  flex-shrink: 0;
}

#text > h2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#text > p {
  color: #000;
  font-family: "Space Grotesk";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}


</style>
