export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

export function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
