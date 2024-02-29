<script setup lang="ts">
import { useCameraRotateAnimation, useCameraZoomAnimation } from '@/helper/animation';
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3 } from 'three'
import { Blocks, UseShowHitSpace } from "@/types/block";
import BlockSettingPop from './blockSettingPop.c.vue';
import { TresCanvas, TresCamera } from '@tresjs/core';
import { getTexture } from '@/assets/block/texture';
import { memoize, isEmpty, maxBy, toNumber, cloneDeep, times } from 'lodash-es';
import { computed, ref } from 'vue';
import { Direction } from '@/types/actor';
import AllBlock from '@/assets/block';
import map1 from '@/assets/map/1.ts';
import Block from './block.c.vue';
const { selectBlockMask } = await getTexture()
const longestRow = maxBy(map1.map, v => v.length)!
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
    useCameraZoomAnimation(1, 10, camera.value)
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

const selectingBlockRef = computed(() => {
  const kv = blockSettingPop.value?.selecting.split('|').map(toNumber)
  if (!kv) return
  return blocks.value[kv[0]][kv[1]]
})
const hitSpace = ref<{ position: [number, number], space: number[][], direction: Direction }>()
const useShowHitSpace: UseShowHitSpace = (position, space, direction) => {
  hitSpace.value = { position, space, direction }
  return {
    show() {
      hitSpace.value = { position, space, direction }
    },
    hide() {
      hitSpace.value = undefined
    },
  }
}

const hitSpaceBase = new Map<string, Set<string>>()
const isInHitSpace = memoize((position: [number, number], hitspace: (typeof hitSpace)["value"], originPostiton: [number, number]): boolean => {
  if (!hitSpace.value) return false
  const key = `${hitSpace.value!.direction}|${JSON.stringify(hitspace!.space)}`
  if (!hitSpaceBase.has(key)) {
    const baseSpace = (() => {
      switch (hitSpace.value!.direction) {
        case Direction.up: {
          const space = cloneDeep(hitspace!.space)
          const longestRowLength = maxBy(space, space => space.length)!.length
          const emptySpase = Array.from({ length: longestRowLength }).map(() => Array.from({ length: space.length }).map(() => -1))
          space.forEach((row, rowIndex) => row.forEach((element, index) => emptySpase[emptySpase.length - index - 1][rowIndex] = element));
          return emptySpase
        }
        case Direction.left: {
          const space = cloneDeep(hitspace!.space)
          for (const v of space) v.reverse()
          const longestRowLength = maxBy(space, space => space.length)!.length
          for (const v of space) if (v.length < longestRowLength) times(longestRowLength - v.length, () => v.unshift(-1))

          return space
        }
        case Direction.right: return hitspace!.space
        case Direction.down: {
          const space = new Array<number[]>()
          const baseSpace = cloneDeep(hitspace!.space)
          baseSpace.forEach((row, rowIndex) => {
            row.forEach((element, index) => {
              space[index] = space[index] ?? []
              space[index][rowIndex] = element
            });
          });
          return space
        }
      }
    })()
    const postiton0 = (() => {
      for (let index = 0; index < baseSpace.length; index++) {
        const row = baseSpace[index];
        for (let jndex = 0; jndex < row.length; jndex++) if (row[jndex] == 0) return [index, jndex] as const
      }
    })()!
    const str = new Set<string>()
    baseSpace.forEach((row, index) => row.forEach((col, jndex) => {
      if (col == -1) return;
      str.add(`[${originPostiton[0] + index - postiton0[0]}|${originPostiton[1] + jndex - postiton0[1]}]`)
    }))
    return str.has(`[${position[0]}|${position[1]}]`)
  }
  return hitSpaceBase.get(key)!.has(`[${position[0]}|${position[1]}]`)
});
</script>

<template>
  <TresCanvas window-size alpha clearColor="#82DBC5" shadows :shadowMapType="BasicShadowMap"
    :outputColorSpace="SRGBColorSpace" :toneMapping="NoToneMapping">
    <TresPerspectiveCamera :position="carmeraBasePosition" :fov="45" :aspect="1" :near="0.1" :far="1000"
      :look-at="carmeraBaseLookat" ref="camera" />
    <template v-for="(row, index) of  map1.map  ">
      <template v-for="(type, jndex) of  row  ">
        <TresGroup v-if="type != -1" :position="[jndex, 0, index]">
          <Suspense>
            <Block :ref="ins => blocks[index][jndex] = <InstanceType<typeof Block>>ins"
              @click="blockSettingPop!.openBlockSettingPop" :type="type" :position="[index, jndex]"
              :selecting="blockSettingPop?.selecting" :use-show-hit-space="useShowHitSpace" />
          </Suspense>
          <TresGroup :position="[0, (AllBlock[Blocks[type]].isHigh ? 1.5 : 0.5), 0]">
            <TresMesh :position="[0, 0.01, 0]" :rotation="[-Math.PI / 2, 0, 0]"
              v-if="((blockSettingPop?.selecting) ?? 'NaN|NaN') == [index, jndex].join('|')">
              <TresPlaneGeometry :args="[1, 1, 1, 1]" />
              <TresMeshBasicMaterial :map="selectBlockMask" transparent />
            </TresMesh>
            <TresMesh :position="[0, 0.02, 0]" :rotation="[-Math.PI / 2, 0, 0]"
              v-if="(!isEmpty(selectingBlockRef)) && isInHitSpace([index, jndex], hitSpace, blockSettingPop?.position!)">
              <TresPlaneGeometry :args="[1, 1, 1, 1]" />
              <TresMeshBasicMaterial :map="selectBlockMask" transparent color="#FF9900" />
            </TresMesh>
          </TresGroup>
        </TresGroup>
      </template>
    </template>

    <TresDirectionalLight cast-shadow :position="carmeraBasePosition" :intensity="1" />
  </TresCanvas>

  <BlockSettingPop :block="selectingBlockRef" ref="blockSettingPop" @open="handlePopOpen" @close="handlePopClose" />
</template>
