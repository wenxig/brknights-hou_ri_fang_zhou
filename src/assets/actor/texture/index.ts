import { useTexture } from "@tresjs/core";
const images = import.meta.glob('./image/*.png', { as: 'url', eager: true })

const textures: Record<string, THREE.Texture> = {}
const imgs: Record<string, string> = {}
let isInit = false
async function init() {
  for (const path in images) {
    if (Object.prototype.hasOwnProperty.call(images, path)) {
      const image = images[path];
      const key = path.match(/(?<=\/)[^\/]+(?=\.)/g)![0]
      textures[key] = await useTexture([image])
      imgs[key] = image
    }
  }
  isInit = true
}

export async function getTexture() {
  if (!isInit) await init()
  return textures
}
export async function getTextureImage() {
  if (!isInit) await init()
  return imgs
}