<script setup lang='ts'>
import { getTexture } from '@/assets/texture';
import BaseBlock from './baseBlock.vue';
const { home } = await getTexture()
defineEmits<{
  click: []
}>()
defineOptions({
  name: '家',
  isHigh: true,
  undeploy: true
})
</script>

<template>
  <TresGroup :position="[0, 0, 0]">
    <TresMesh @click="$emit('click')" :position="[0, 1, 0]">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial :map="home" transparent />
    </TresMesh>
    <Suspense>
      <BaseBlock @click="$emit('click')" />
    </Suspense>
  </TresGroup>
</template>