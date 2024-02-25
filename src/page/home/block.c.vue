<script setup lang='ts'>
import { Blocks, UseShowHitSpace } from "@/types/block";
import Block from '@/assets/block';
import Actor from './actor.c.vue';
import { ShallowRef, computed, shallowRef } from "vue";
import actors from '@/assets/actor';
import { Direction } from "@/types/actor";
const props = defineProps<{
  type: Blocks
  position: [row: number, col: number]
  selecting?: string,
  useShowHitSpace: UseShowHitSpace
}>()
const $emit = defineEmits<{
  click: [pos: [row: number, col: number], other: BlockInformsation]
}>()
const block = Block[Blocks[props.type]]
const actor = shallowRef<Actor>()
const perviewActor = shallowRef<Actor>()
defineExpose<{
  setActor(id: string, dir: Direction): void
  removeActor(): void
  readonly actor: ShallowRef<Actor | undefined>
  block: Block
  perviewActor(id: string, dir: Direction): { close(): void }
}>({
  actor,
  removeActor() {
    actor.value = undefined
    if (actorRef.value) {
      actorRef.value.setActor(null)
      actorRef.value.setOpacity(1)
    }
  },
  setActor(id, dir) {
    actor.value = actors[id]
    if (actorRef.value) {
      actorRef.value.setActor(actor.value.texteurs[dir] ?? actor.value.texteurs.all, dir)
      actorRef.value.setOpacity(1)
    }
  },
  block,
  perviewActor(id, dir): { close(): void } {
    perviewActor.value = actors[id]
    const { hide, show } = props.useShowHitSpace(props.position, perviewActor.value.space, dir)
    if (actorRef.value) {
      actorRef.value.setActor(perviewActor.value.texteurs[dir] ?? perviewActor.value.texteurs.all, dir)
      actorRef.value.setOpacity(0.5)
    }
    show()
    return {
      close() {
        hide()
      }
    }
  }
})

const actorRef = shallowRef<InstanceType<typeof Actor>>()
const data = computed<BlockInformsation>(() => ({
  actor: actor.value,
  block: Block[Blocks[props.type]]
}))

const handleClick = () => {
  $emit('click', props.position, data.value!)
}

</script>

<template>
  <Suspense>
    <block.el @click="handleClick" />
  </Suspense>
  <Actor :y="block.isHigh ? 2 : 1" ref="actorRef" v-if="!block.undeploy" />
</template>