<script setup lang='ts'>
import { getTexture } from '../texture';
const textures = await getTexture()

defineEmits<{
  click: []
}>()
defineOptions({
  isHigh: true,
  name: '不可部署的高台地块',
  undeploy: true
})
</script>

<template>
  <TresMesh :position="[0, 0.5, 0]" @click="$emit('click')">
    <TresBoxGeometry :args="[1, 2, 1]" />
    <TresMeshStandardMaterial :map="textures.get('baseUndeployBlock')" />
  </TresMesh>
</template>