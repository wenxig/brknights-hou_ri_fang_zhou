import { getTexture } from "../texture"
const texteurs = await getTexture()
export default {
  wdss: {
    name: '豌豆射手',
    texteur: texteurs.wdss,
    space: [
      [1, 1],
      [0, 1, 1, 1],
      [1, 1]
    ],
    type:1
  },
} as Record<string, Actor>