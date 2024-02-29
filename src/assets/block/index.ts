const imp = import.meta.glob<{ default: Block['el'] }>('./components/*.vue', { eager: true })
const exp: Record<string, Block> = {}
for (const key in imp) {
  const b = imp[key]
  const k = key.match(/(?<=\/)[^\/]+(?=\.)/g)![0]
  exp[k] = {
    el: b.default,
    name: b.default.name!,
    id: k,
    isHigh: b.default.isHigh,
    undeploy: !!b.default.undeploy
  }
}
export default exp
