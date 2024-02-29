import { useTexture } from "@tresjs/core";
const images = import.meta.glob('./*.png', { as: 'url', eager: true })

const textures: Record<string, THREE.Texture> = {}
let isInit = false
async function init() {
  for (const path in images) {
    if (Object.prototype.hasOwnProperty.call(images, path)) {
      const image = images[path];
      const key = path.match(/(?<=\/)[^\/]+(?=\.)/g)![0]
      textures[key] = await useTexture([image])
    }
  }
  isInit = true
}

export async function getTexture() {
  if (!isInit) await init()
  return textures
}