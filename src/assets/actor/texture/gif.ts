const images = import.meta.glob('./*.gif', { as: 'url', eager: true })

const imgs: Record<string, string> = {}
let isInit = false
function init() {
  for (const path in images) {
    if (Object.prototype.hasOwnProperty.call(images, path)) {
      const image = images[path];
      const key = path.match(/(?<=\/)[^\/]+(?=\.)/g)![0]
      imgs[key] = image
    }
  }
  isInit = true
}

export function getGifTexture() {
  if (!isInit) init()
  return imgs
}