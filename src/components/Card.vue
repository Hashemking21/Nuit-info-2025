<script setup>
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
  }
})
</script>

<template>    
  <div id="card" :style="{ background: props.color }">
    <div>
      <h2>{{ props.title }}</h2>
      <p>{{ props.text }}</p>
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
  border-radius: 45px;
  border: 1px solid var(--Dark, #191A23);
  box-shadow: 0 5px 0 0 #191A23;
}
</style>
