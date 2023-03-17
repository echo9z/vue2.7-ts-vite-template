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
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCounterStore } from '@/store/modules/count'
import Parent from '@/components/Parent.vue'

defineProps({
  str: {
    type: String,
    default: ''
  }
})

// defineOptions({
//   name: 'HomeX'
// })

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
