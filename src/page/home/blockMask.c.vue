<script setup lang='ts'>
import { Texture } from 'three';

defineProps<{
  texture: Texture
  y: number
}>()
</script>

<template>
  <TresMesh :position="[0, y, 0]" :rotation="[-Math.PI / 2, 0, 0]">
    <TresPlaneGeometry :args="[1, 1, 1, 1]" />
    <TresMeshBasicMaterial :map="texture" transparent />
  </TresMesh>
</template>