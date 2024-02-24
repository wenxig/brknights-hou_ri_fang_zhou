<script setup lang='ts'>
import { TresObject3D, useTresContext } from '@tresjs/core';
import { Texture } from 'three';
import { onMounted } from 'vue';
import { ref } from 'vue';

defineProps<{
  map: Texture
  y: number
}>()
const block = ref<TresObject3D>()
const ctx = useTresContext()
onMounted(() => {
  block.value?.lookAt(ctx.camera.value?.position!)
  block.value!.rotation.z = 0
})
</script>

<template>
  <TresMesh ref="block" :position="[0, y, 0]">
    <TresPlaneGeometry :args="[1, 1, 1, 1]" />
    <TresMeshBasicMaterial transparent :map="map" />
  </TresMesh>
</template>