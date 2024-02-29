<script setup lang='ts'>
import { getTexture } from '../texture';
const { baseBlock } = await getTexture()

defineEmits<{
  click: []
}>()
defineOptions({
  isHigh: true,
  name: '普通高台地块'
})
</script>

<template>
  <TresMesh :position="[0, 0.5, 0]" @click="$emit('click')">
    <TresBoxGeometry :args="[1, 2, 1]" />
    <TresMeshStandardMaterial :map="baseBlock" />
  </TresMesh>
</template>