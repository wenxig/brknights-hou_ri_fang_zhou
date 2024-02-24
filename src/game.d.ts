interface BlockInformsation {
  actor: Actor | undefined,
  block: Block
}
interface Actor {
  name: string,
  texteur: THREE.Texture,
  space: number[][],
  /** 1:地面 2:高台*/ type: 1 | 2
}
interface Block {
  name: string,
  el: import("vue").FunctionalComponent<{}, { click: [] }> & { isHigh: boolean, undeploy?: boolean },
  id: string,
  isHigh: boolean,
  undeploy: boolean
}