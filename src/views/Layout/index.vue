<!--
* @description layout
* @fileName layout.vue
* @author echo9z
* @date 2023/03/15 22:35:40
!-->
<template>
  <div>
    <ul>
      <li><router-link to="/home">home</router-link></li>
      <li><router-link to="/about">about</router-link></li>
      <li><router-link to="/article">article</router-link></li>
    </ul>
    <hr>
    <router-view />
  </div>
</template>

<script setup>

</script>
<style lang='scss' scoped>
</style>
