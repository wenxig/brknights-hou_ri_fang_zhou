interface BlockInformsation {
  actor: Actor | undefined,
  block: Block
}
interface Actor {
  name: string,
  texteurs: Record<string, THREE.Texture>,
  space: number[][],
  image: string
  /** 1:地面 2:高台 3:全部 */ type: 1 | 2 | 3
}
interface Block {
  name: string,
  el: import("vue").FunctionalComponent<{}, { click: [] }> & { isHigh: boolean, undeploy?: boolean },
  id: string,
  isHigh: boolean,
  undeploy: boolean
}