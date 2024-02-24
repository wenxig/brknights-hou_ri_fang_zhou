import { Blocks } from '@/types/block';
export default {
  name: "test",
  map: [
    [Blocks.home, Blocks.null, Blocks.home],
    [Blocks.baseUndeployBlock, Blocks.null, Blocks.baseUndeployBlock, Blocks.baseBlock, Blocks.null, Blocks.null, Blocks.baseBlock, Blocks.baseUndeployBlock, Blocks.baseUndeployBlock],
    [Blocks.baseBlock, Blocks.null, Blocks.baseUndeployBlock, Blocks.baseBlock, Blocks.baseUndeployBlock, Blocks.baseBlock, Blocks.baseUndeployBlock, Blocks.baseHighBlock, Blocks.baseUndeployBlock],
    [Blocks.baseUndeployBlock, Blocks.baseHighBlock, Blocks.baseBlock, Blocks.null, Blocks.baseHighBlock, Blocks.null, Blocks.baseHighUndeployBlock, Blocks.baseHighUndeployBlock, Blocks.baseBlock],
    [Blocks.baseBlock, Blocks.null, Blocks.baseBlock, Blocks.baseBlock, Blocks.baseUndeployBlock, Blocks.enemyHome, Blocks.baseHighUndeployBlock, Blocks.baseHighUndeployBlock, Blocks.baseUndeployBlock],
    [Blocks.baseUndeployBlock, Blocks.null, Blocks.null, Blocks.null, Blocks.null, Blocks.null, Blocks.baseHighUndeployBlock, Blocks.baseHighUndeployBlock, Blocks.baseUndeployBlock],
    [Blocks.baseBlock, Blocks.baseUndeployBlock, Blocks.baseBlock, Blocks.baseUndeployBlock, Blocks.baseUndeployBlock, Blocks.baseUndeployBlock, Blocks.null, Blocks.baseUndeployBlock, Blocks.baseBlock],
    [Blocks.null, Blocks.null, Blocks.null, Blocks.null, Blocks.null, Blocks.enemyHome, Blocks.null, Blocks.enemyHome]
  ]
}