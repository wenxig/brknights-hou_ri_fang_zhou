<script setup lang='ts'>
import { getTexture } from '../texture';
const { baseBlock } = await getTexture()
defineEmits<{
  click: []
}>()
defineOptions({
  name: '普通地块',
  isHigh: false,
})
</script>

<template>
  <TresMesh :position="[0, 0, 0]" @click="$emit('click')">
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial :map="baseBlock" />
  </TresMesh>
</template>