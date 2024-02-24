<script setup lang='ts'>
import { Blocks } from "@/types/block";
import Block from '@/assets/actor/block';
import Actor from './actor.c.vue';
import { ShallowRef, computed, shallowRef } from "vue";
import actors from '@/assets/actor';
const props = defineProps<{
  type: Blocks
  position: [row: number, col: number]
  selecting?: string
}>()
const $emit = defineEmits<{
  click: [pos: [row: number, col: number], other: BlockInformsation]
}>()

const actor = shallowRef<Actor>()
const removeActor = () => {
  actor.value = undefined
}
const setActor = (id: number) => {
  actor.value = actors[id]
}
defineExpose<{
  setActor(id: number): void
  removeActor(): void
  readonly actor: ShallowRef<Actor | undefined>
}>({
  actor,
  removeActor,
  setActor
})
const data = computed<BlockInformsation>(() => ({
  actor: actor.value,
  block: Block[Blocks[props.type]]
}))
const handleClick = () => {
  console.log(data.value)
  $emit('click', props.position, data.value!)
}
const block = Block[Blocks[props.type]]

</script>

<template>
  <Suspense>
    <block.el @click="handleClick" />
  </Suspense>
  <Actor :y="block.isHigh ? 1.5 : 1" v-if="actor" :map="actor.texteur" />
</template>