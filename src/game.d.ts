interface BlockInformsation {
  actor: Actor | undefined,
  block: Block
}
interface Actor {
  name: string,
  texteurs: Record<string, THREE.Texture>,
  space: number[][],
  image: string
  type: import("@/types/actor").PositionType
}
interface Block {
  name: string,
  el: import("vue").FunctionalComponent<{}, { click: [] }> & { isHigh: boolean, undeploy?: boolean },
  id: string,
  isHigh: boolean,
  undeploy: boolean
}