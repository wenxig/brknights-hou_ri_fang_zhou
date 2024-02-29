<script setup lang='ts'>
import { getTexture } from '../texture';
import BaseBlock from './baseBlock.vue';
const { enemyHome } = await getTexture()
defineEmits<{
  click: []
}>()
defineOptions({
  name: '地方出生点',
  isHigh: true,
  undeploy: true
})
</script>

<template>
  <TresGroup :position="[0, 0, 0]">
    <TresMesh @click="$emit('click')" :position="[0, 1, 0]">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial :map="enemyHome" transparent />
    </TresMesh>
    <Suspense>
      <BaseBlock @click="$emit('click')" />
    </Suspense>
  </TresGroup>
</template>