<script setup lang='ts'>
import { computed, ref, ComputedRef, watch } from "vue";
import actors from '@/assets/actor';
import { chunk, floor } from "lodash-es";
import type Block from './block.c.vue';
import { Direction } from "@/types/actor";
import { Ref } from "vue";
const props = defineProps<{
  block?: InstanceType<typeof Block>
}>()
const open = ref(false);
const openWithoutAm = ref(false);
const _block = ref<Block>();
const position = ref<[row: number, col: number]>([NaN, NaN])


const openBlockSettingPop = async (pos: [row: number, col: number], other: BlockInformsation) => {
  position.value = pos
  open.value = true
  _block.value = other.block
}
const title = computed(() => props.block?.actor?.name ?? _block.value?.name ?? 'null')
const selectingBlockPosition = computed(() => (openWithoutAm.value) ? position.value.join('|') : '')
defineExpose<{
  openBlockSettingPop: typeof openBlockSettingPop,
  selecting: ComputedRef<string>,
  position: Ref<[number, number]>
}>({ openBlockSettingPop, selecting: selectingBlockPosition, position })
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

const _actors = new Array<{ id: string, a: Actor }>()
for (const id in actors) {
  if (Object.prototype.hasOwnProperty.call(actors, id)) {
    const actor = actors[id];
    _actors.push({ id, a: actor })
  }
}

const innerDrawer = ref(false)

const selectingDir = ref<Direction>(Direction.right)
const allDir = [
  [1, 2, "上", Direction.up],
  [2, 1, "左", Direction.left],
  [2, 3, "右", Direction.right],
  [3, 2, "下", Direction.down],
] as const

const selectingActorId = ref('')
let cleanPerviewHitSpace: () => void
watch([innerDrawer, selectingDir, selectingActorId], () => {
  if (innerDrawer.value) {
    const { close } = props.block!.perviewActor(selectingActorId.value, selectingDir.value)
    cleanPerviewHitSpace = close
  }
})
</script>

<template>
  <ElDrawer v-model="open" :title="title" direction="ltr" @close="handleClose" @open="handleOpen" :show-close="false"
    append-to-body>
    <div class="plant w-full h-auto" v-if="(!block?.actor) && !block?.block.undeploy">
      <span class="text-white">部署植物</span>
      <div class="w-full h-80 mt-5 flex flex-col">
        <ElAutoResizer v-slot="{ width }">
          <div class="h-[70px] flex " v-for="actorChunk of chunk(_actors, floor(width % 70))">
            <div class="h-[70px] w-[70px] border rounded-[5px] relative" v-for="actor of actorChunk" @click="() => {
              innerDrawer = true
              selectingActorId = actor.id
            }">
              <img :src="actor.a.image" class="w-full h-full" />
              <div class="absolute bottom-0 w-full h-5 text-white flex justify-center items-center text-sm"
                style="background-color: rgba(255, 255, 255, 0.5);">
                {{ actor.a.name }}
              </div>
              <el-drawer v-model="innerDrawer" title="调整" append-to-body @close="cleanPerviewHitSpace">
                <p>{{ actor.a.name }}</p>
                <div>
                  <span>朝向</span>
                  <div class="w-[120px] h-[120px] grid-cols-3 grid">
                    <button v-for="btn of allDir" style="border-color: rgba(0, 0, 0, 0.7);"
                      :style="{ 'grid-column': btn[1], 'grid-row': btn[0] }"
                      :class="{ 'dir-sel': selectingDir == btn[3] }" class="button"
                      @click="() => selectingDir = btn[3]">{{ btn[2] }}</button>
                  </div>
                  <button class="button !w-20" @click="() => {
                    block?.setActor(actor.id, selectingDir)
                    innerDrawer = open = false
                  }">确定</button>
                </div>
              </el-drawer>
            </div>
          </div>
        </ElAutoResizer>
      </div>
    </div>
  </ElDrawer>
</template>
<style scoped lang='scss'>
.dir-sel {
  background-color: rgba(0, 0, 0, 0.7);
}

.button {
  @apply border h-10 text-white w-10 rounded-md transition-colors;

  &:active {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

:global(.el-drawer) {
  --el-drawer-bg-color: rgba(0, 0, 0, 0.3) !important;

  & .el-drawer__title {
    color: white !important;
  }
}
</style>