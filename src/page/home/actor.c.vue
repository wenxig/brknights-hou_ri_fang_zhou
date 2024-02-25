<script setup lang='ts'>
import { Direction } from '@/types/actor';
import { useTresContext } from '@tresjs/core';
import { isEmpty } from 'lodash-es';
import { Texture, MeshBasicMaterial, Mesh } from 'three';
import { onMounted, ref } from 'vue';

const materialInstance = ref<MeshBasicMaterial>()
const block = ref<Mesh>()
defineProps<{
  y: number,
}>()
onMounted(() => {
  const ctx = useTresContext()
  block.value?.lookAt(ctx.camera.value?.position!)
  block.value!.rotation.z = 0
})
defineExpose<{
  setActor(map: null): void
  setActor(map: Texture, direction: Direction): void
  setOpacity(num: number): void
}>({
  setActor(_map, direction?: Direction) {
    materialInstance.value!.needsUpdate = true
    if (_map && isEmpty(direction)) {
      switch (direction!) {
        case Direction.left: {
          break
        }
        case Direction.up:
        case Direction.down:
        case Direction.right: {
          
          break
        }
      }
      materialInstance.value!.map = _map
    } else {
      materialInstance.value!.map = null
    }
  },
  setOpacity(num) {
    materialInstance.value!.needsUpdate = true
    materialInstance.value!.opacity = num
  }
})

</script>

<template>
  <TresMesh ref="block" :position="[0, y, 0]">
    <TresPlaneGeometry :args="[1, 1, 1, 1]" v-if="materialInstance?.map" />
    <TresMeshBasicMaterial transparent ref="materialInstance" />
  </TresMesh>
</template>