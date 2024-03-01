import { useTexture } from "@tresjs/core";
const images = import.meta.glob('./image/*.png', { as: 'url', eager: true })

let textures: Record<string, THREE.Texture> = Object.create(null)
let imgs: Record<string, string> = Object.create(null)
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
  textures = Object.freeze(textures)
  imgs = Object.freeze(imgs)
  isInit = true
}

export async function getTexture() {
  if (!isInit) await init()
  return textures as Readonly<typeof textures>
}
export async function getTextureImage() {
  if (!isInit) await init()
  return imgs as Readonly<typeof imgs>
}