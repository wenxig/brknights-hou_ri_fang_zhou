export enum Blocks {
  null = -1,
  home,
  enemyHome,
  baseBlock,
  baseHighBlock,
  baseUndeployBlock,
  baseHighUndeployBlock
}
import type { Direction } from './actor'
export type UseShowHitSpace = (position: [number, number], spase: number[][], direction: Direction) => { show(): void, hide(): void }