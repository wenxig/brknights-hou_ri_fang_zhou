import { useTexture } from "@tresjs/core";
const images = import.meta.glob('./*.png', { as: 'url', eager: true })
let textures: Record<string, THREE.Texture> = Object.create(null)
let isInit = false
async function init() {
  for (const path in images) textures[path.match(/(?<=\/)[^\/]+(?=\.)/g)![0]] = await useTexture([images[path]])
  isInit = true
  textures = Object.freeze(textures)
}

export async function getTexture() {
  if (!isInit) await init()
  return textures as Readonly<typeof textures>
}