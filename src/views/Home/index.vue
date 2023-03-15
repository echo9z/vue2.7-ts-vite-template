<!--
* @description home
* @fileName index.vue
* @author echo9z
* @date 2023/03/15 21:52:24
!-->
<template>
  <div>
    Home页
    {{ count }}
    <button @click="clickBtn">点我</button>
    <Parent :msg="'传入str'" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCounterStore } from '@/store/modules/count'
import Parent from '../../components/Parent.vue';

defineOptions({
  name: 'HomeX'
})

const countStore = useCounterStore()
// const count = ref(0)
// count.value = countStore.count

const clickBtn = () => {
  countStore.count++
}

const count = computed(() => {
  return countStore.count
})
</script>
<style lang='scss' scoped>
</style>
