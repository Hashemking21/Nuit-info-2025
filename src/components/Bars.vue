<script setup lang="js">
const { height } = defineProps({
    height: {
        type: Number,
        required: true
    }
});
</script>

<template>
    <div class="container">
        <div class="parent">
            <div class="child" :style="{ height: $props.height + '%' }"></div>
        </div>
        <div class="label">Liberté</div>
    </div>
    <div class="container">
        <div class="parent">
            <div class="child" :style="{ height: $props.height + '%' }"></div>
        </div>
        <div class="label">Vie privée</div>
    </div>
</template>

<style scoped>
    .container {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        margin: 0 10px;
    }
    
    .parent{
        display: flex;
        align-items: flex-end;
        width: 30px;
        height: 200px;
        background-color: blue;
        margin-bottom: 15px;
    }
    
    .child{
        width: 100%;
        background-color: red;
    }
</style>