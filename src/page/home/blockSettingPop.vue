<script setup lang='ts'>
import { computed, ref } from "vue";
import { ElDrawer } from 'element-plus';
import { ComputedRef } from "vue";
const open = ref(false);
const openWithoutAm = ref(false);
const _block = ref<Block>();
const _actor = ref<Actor>();
const position = ref<[row: number, col: number]>([NaN, NaN])

const openBlockSettingPop = async (pos: [row: number, col: number], other: BlockInformsation) => {
  position.value = pos
  open.value = true
  _block.value = other.block
  _actor.value = other.actor
}
const title = computed(() => _actor.value?.name ?? _block.value?.name ?? 'null')

const selecting = computed(() => (openWithoutAm.value) ? position.value.join('|') : '')
defineExpose<{
  openBlockSettingPop: typeof openBlockSettingPop,
  selecting: ComputedRef<string>
}>({ openBlockSettingPop, selecting })
const $emit = defineEmits<{
  close: [pos: [row: number, col: number]];
  open: [pos: [row: number, col: number]]
}>()
function handleClose() {
  openWithoutAm.value && $emit('close', position.value)
  openWithoutAm.value = false
}
function handleOpen() {
  openWithoutAm.value = true
  $emit('open', position.value)
}
</script>

<template>
  <ElDrawer v-model="open" :title="title" direction="ltr" @close="handleClose" @open="handleOpen">
    <span>{{ title }}</span>
  </ElDrawer>
</template>