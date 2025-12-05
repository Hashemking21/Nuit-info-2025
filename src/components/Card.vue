<script setup lang="js">
    import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Inclusion'
  },
  text: {
    type: String,
    default: 'Accès équitable au numérique, réduction de la fracture numérique…'
  },
  image: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#F3F3F3' // default background
  },
  bgTextColor:{
    type:String,
    default:'#FFFFFF'
  },
  textColor:{
    type:String,
    default:'#000000'
  }
})
</script>

<template>
  <div id="card" :style="{ background: props.color }">
    <div id="left-div">
      <h2 :style="{background:props.bgTextColor}">{{ props.title }}</h2>
      <p :style="{color:props.textColor}">{{ props.text }}</p>
    </div>
    <div>
      <img :src="props.image" alt="" />
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

#left-div {
  width: 250px;
}

#card h2 {
  display: inline;
  border-radius: 5px;
  padding: 5px;
  flex-direction: column;
  align-items: flex-start;
  font-weight: bold;
  margin-block: 20px;
  font-size: 26px;
}

#card p {
  color: #000;
  font-family: "Space Grotesk", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-block: 18px;
}

img {
  object-fit: contain;
  width: 250px;
  height: 157px;
  aspect-ratio: 250/157;
}
</style>
