import { useRenderLoop, type TresCamera, type RenderLoop } from "@tresjs/core"
import { ceil, min } from "lodash-es"
const { onLoop } = useRenderLoop()
type V3 = [x: number, y: number, z: number]

type FpsTaskFunction = (rl: RenderLoop) => any | void
const fpsTask = new Set<FpsTaskFunction>()
function addFpsTask(fun: FpsTaskFunction): Function {
  fpsTask.add(fun)
  return () => fpsTask.delete(fun)
}

onLoop(rl => fpsTask.forEach(fn => fn(rl)))

export function useCameraRotateAnimation([b_x, b_y, b_z]: V3, [a_x, a_y, a_z]: V3, camera: TresCamera, speedTimes = 1) {
  const time = min([ceil(Math.abs((b_x + b_y + b_z) - (a_x + a_y + a_z)) * 10) * speedTimes, 60])!
  let x = (b_x - a_x) / time
  let y = (b_y - a_y) / time
  let z = (b_z - a_z) / time
  let times = 0
  const off = addFpsTask(() => {
    if (times < time) {
      times++
      camera.rotation.x -= x
      camera.rotation.y -= y
      camera.rotation.z -= z
    } else {
      camera.rotation.x = a_x
      camera.rotation.y = a_y
      camera.rotation.z = a_z
      off()
    }
  })
}
export function useCameraZoomAnimation(zoom: number, time: number, camera: TresCamera) {
  let times = 0
  const zoomChunk = (zoom - camera.zoom) / time
  const off = addFpsTask(() => {
    if (times < time) {
      times++
      camera.zoom += zoomChunk
    } else {
      camera.zoom = zoom
      off()
    }
  })
}