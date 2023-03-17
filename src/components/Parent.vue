<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ msg: string }> ()

const msg = ref(props.msg)
</script>

<template>
  <div>
    Parent组件
    {{ msg }}
  </div>
</template>

<style scoped>
</style>
