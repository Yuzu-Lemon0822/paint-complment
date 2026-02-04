import { pointer } from "./input.js";
import { ctx, clear } from "./display.js";

/* ===== utility function ===== */

const geom = {
  add(p1, p2) { //2次元座標同士を足し算します
    return [p1[0] + p2[0], p1[1] + p2[1]];
  },
  sub(p1, p2) { //2次元座標同士を引き算します
    return [p1[0] - p2[0], p1[1] - p2[1]];
  },
  mul(v, t) { //2次元座標をt倍します。
    return [v[0] * t, v[1] * t];
  }
}

function bezier_2D(p0, p1, p2, t) {
  const v1 = geom.sub(p1, p0); //ベクトル化
  const v2 = geom.sub(p2, p1);
  const p01 = geom.add(p0, geom.mul(v1, t));
  const p12 = geom.add(p1, geom.mul(v2, t));
  return geom.add(p01, geom.mul(geom.sub(p12, p01), t))
}

function smooth(p0, p1, p2, amt) {
  const p3 = geom.mul(geom.add(p0, p2), 0.5); //中点
  const p4 = geom.sub(geom.mul(p1, 2), p3)
  const list = []
  for (let t = 0; t <= amt; t++) {
    list.push(bezier_2D(p0, p4, p2, t/amt))
  }
  return list;
}

/* ===== main ===== */

let step = 0;
let smoothLv = 5; //1でlinner
let temp = []
let point = []

function smoothPen(p0, p1, p2) {
  const list = smooth(p0, p1, p2, smoothLv * 2)
  for (let i = 0; i <= smoothLv; i++) {
    if (temp.length === 0) {
      point.push(list[i])
    } else {
      point.push(geom.add(list[i], geom.mul(geom.sub(temp[i], list[i]), i / smoothLv))) //二つのベジェの結果から補完
    }
  }
  temp = list.slice(smoothLv, smoothLv * 2 + 1)
}

let p0
let p1
let p2

function loop() {
  clear();

  if (pointer.down) {
    ctx.fillStyle = "#000";
    ctx.fillRect(pointer.x, pointer.y, 2, 2)
    ;
  } else {

  }
  if (point.length > 1) {
    
  }

  requestAnimationFrame(loop);
}

loop();
