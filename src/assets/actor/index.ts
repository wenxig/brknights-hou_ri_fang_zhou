import { getTexture, getTextureImage } from "./texture"
const texteurs = await getTexture()
const images = await getTextureImage()
export default {
  wdss: {
    name: '豌豆射手',
    texteurs: {
      all: texteurs.wdss,
      "1": texteurs[`wdss.1`]
    },
    space: [
      [4, 5],
      [0, 1, 2, 3],
      [6, 7]
    ],
    type: 1,
    image: images.wdss,
  },
} as Record<string, Actor>