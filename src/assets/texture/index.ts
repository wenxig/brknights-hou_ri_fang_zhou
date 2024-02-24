import { useTexture } from "@tresjs/core"
import type { Texture } from "three"

let isInit = false
const textures: Record<string, Texture> = {}
export async function initTexture() {
  const images = import.meta.glob(['./actor/*.png', './block/*.png'], { as: 'url' })
  for (const key in images) {
    const img = await images[key]()
    textures[key.match(/(?<=\/)[^\/]+(?=\.)/g)![0]] = await useTexture([img])
  }
  isInit = true
}

export const getTexture = async () => {
  if (!isInit) await initTexture()
  return textures
}