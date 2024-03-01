import { PositionType } from "@/types/actor"
import { getTexture, getTextureImage } from "./texture"
const texteurs = await getTexture()
const images = await getTextureImage()
export default Object.freeze({
  wdss: {
    name: '豌豆射手',
    texteurs: {
      all: texteurs.wdss,
      "1": texteurs['wdss.1']
    },
    space: [
      [5, 6],
      [0, 1, 2, 3,],
      [7, 8]
    ],
    type: PositionType.land,
    image: images.wdss,
  },
} as Record<string, Actor>)