<script setup lang="js">
const { height } = defineProps({
    height: {
        type: Number,
        required: true
    }
});
</script>

<template>
    <div class="parent">
        <div class="child" :style="{ height: $props.height + '%' }"></div>
    </div>
</template>

<style scoped>
    .parent{
        width: 20px;
        height: 150px;
        background-color: red;
    }
    
    .child{
        width: 100%;
        background-color: blue;
    }
</style>