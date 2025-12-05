<script setup lang="js">
const { height } = defineProps({
  height1: {
    type: Number,
    required: true,
  },
  height2: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="container">
    <div class="parent">
      <div class="child" :style="{ height: $props.height1 + '%' }"></div>
    </div>
    <p class="label">Liberté</p>
  </div>
  <div class="container">
    <div class="parent">
      <div class="child" :style="{ height: $props.height2 + '%' }"></div>
    </div>
    <p class="label">Vie privée</p>
  </div>
</template>

<style scoped>
.container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}

.parent {
  display: flex;
  align-items: flex-end;
  width: 30px;
  height: 215px;
  background-color: blue;
  margin-bottom: 15px;
}

.child {
  width: 100%;
  background-color: red;
}

.label {
  font-weight: bold;
  color: white;
  padding: 1px 10px;
  border-radius: 40px;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
