<script setup lang='ts'>
import { getTexture } from '../texture';
const { baseUndeployBlock } = await getTexture()

defineEmits<{
  click: []
}>()
defineOptions({
  isHigh: false,
  name: '不可部署的地块',
  undeploy: true
})
</script>

<template>
  <TresMesh :position="[0, 0, 0]" @click="$emit('click')">
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial :map="baseUndeployBlock" />
  </TresMesh>
</template>