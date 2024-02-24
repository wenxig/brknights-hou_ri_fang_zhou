<script setup lang="ts">
import map1 from '@/assets/map/1.ts';
import { TresCanvas, TresCamera } from '@tresjs/core';
import { Blocks } from "@/types/block";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3 } from 'three'
import { sortBy } from 'lodash-es';
import BlockSettingPop from './blockSettingPop.vue';
import Block from './block.c.vue';
import AllBlock from '@/assets/actor/block';
import BlockMask from './blockMask.c.vue';
import { computed, ref } from 'vue';
import { getTexture } from '@/assets/texture';
const { selectBlockMask } = await getTexture()
import { useCameraRotateAnimation, useCameraZoomAnimation } from '@/helper/animation';
const gl: InstanceType<typeof TresCanvas>['$props'] = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const longestRow = sortBy(map1.map, v => v).reverse()[0]
const carmeraBasePosition: [x: number, y: number, z: number] = [longestRow.length / 2, map1.map.length * 1.5, map1.map.length * 1]
const carmeraBaseLookat = [longestRow.length / 2, -map1.map.length, 0] as const

const blockSettingPop = ref<InstanceType<typeof BlockSettingPop>>()


const camera = ref<TresCamera>()

function handlePopOpen([row, col]: [row: number, col: number]) {
  const { x: b_x, y: b_y, z: b_z } = camera.value!.rotation
  camera.value!.lookAt(new Vector3(col, 1.5, row));
  const { x: a_x, y: a_y, z: a_z } = camera.value!.rotation
  camera.value!.lookAt(new Vector3(...carmeraBaseLookat));
  if (camera.value) {
    useCameraRotateAnimation([b_x, b_y, b_z], [a_x, a_y, a_z], camera.value)
    useCameraZoomAnimation(1.5, 10, camera.value)
  }
}
function handlePopClose([row, col]: [row: number, col: number]) {
  const { x: b_x, y: b_y, z: b_z } = camera.value!.rotation
  camera.value!.lookAt(new Vector3(...carmeraBaseLookat));
  const { x: a_x, y: a_y, z: a_z } = camera.value!.rotation
  camera.value!.lookAt(new Vector3(col, 1.5, row));
  if (camera.value) {
    useCameraRotateAnimation([b_x, b_y, b_z], [a_x, a_y, a_z], camera.value)
    useCameraZoomAnimation(1, 10, camera.value)
  }
}
const blocks = ref<(InstanceType<typeof Block>)[][]>(Array.from({ length: map1.map.length }).map(() => []))

const selecting = computed(() => (blockSettingPop.value?.selecting) ?? 'NaN|NaN')
</script>

<template>
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="carmeraBasePosition" :fov="45" :aspect="1" :near="0.1" :far="1000"
      :look-at="carmeraBaseLookat" ref="camera" />
    <template v-for="(row, index) of  map1.map ">
      <template v-for="(type, jndex) of  row ">
        <TresGroup v-if="type != -1" :position="[jndex, 0, index]">
          <Suspense>
            <Block :ref="ins => blocks[index][jndex] = ins as InstanceType<typeof Block>"
              @click="blockSettingPop!.openBlockSettingPop" :type="type" :position="[index, jndex]"
              :selecting="blockSettingPop?.selecting" />
          </Suspense>
          <TresGroup :position="[0, AllBlock[Blocks[type]].isHigh ? 1.5 : 0.5, 0]">
            <BlockMask :y="0" :texture="selectBlockMask" v-if="selecting == [index, jndex].join('|')" />
          </TresGroup>
        </TresGroup>
      </template>
    </template>

    <TresDirectionalLight cast-shadow :position="carmeraBasePosition" :intensity="1" />
  </TresCanvas>

  <BlockSettingPop ref="blockSettingPop" @open="handlePopOpen" @close="handlePopClose" />
</template>
