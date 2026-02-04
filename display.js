const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

function resize() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
}
resize()
window.addEventListener("resize", resize)

export function draw(points) {
  if (points.length < 2) return

  ctx.beginPath()
  ctx.moveTo(points[0][0], points[0][1])

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1])
  }

  ctx.stroke()
}
