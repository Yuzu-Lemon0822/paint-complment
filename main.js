/* ===== import data ===== */
import { pointer } from "./input.js"
import { draw } from "./display.js";

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
  for (let t = 0; t <= amt; t += 0.5) {
    list.push(bezier_2D(p0, p4, p2, t/amt))
  }
  return list;
}

/* ===== main ===== */

let step = 0
let smoothLv = 5; //1でlinner
let temp = []
export let point = [] //display.js側でpoint.length>2の時、point.length-1回0 ~ point.length-2 から1 ~ point.length-1をlineToする。その後point=[...point[point.length-1]]
let point0, point1, point2;

function reset() {
  point0 = [null, null], point1 = [null, null], point2 = [null, null];  
}

reset()

function main() {
  if (pointer.down) {
    step = 0
    point2 = [...point1]
    point1 = [...point0]
    point0 = [pointer.x, pointer.y]
    if (point2[0] !== null) {
      const pointList = smooth(point2, point1, point0, smoothLv)
      if (temp.length === 0) {
        for (let i = 0; i <= smoothLv; i++) {
          point.push([...pointList[i]])
        }
      } else {
        for (let i = 0; i <= smoothLv; i++) {
          point.push(geom.mul(geom.add(temp[i], pointList[i]), 0.5))
        }
      }
      temp = []
      for (let i = 0; i <= smoothLv; i++) {
        temp.push([...pointList[i + smoothLv]]) //後半を次回の補完のために持ち越す
      }
    }
  } else {
    if (step === 0) {
      reset()
      if (temp.length > 0) {
        for (let i = 0; i < temp.length; i++) {
          point.push([...temp[i]])
        }
      }
    } else {
      point = []
    }
    step++    
  }
}

function loop() {
  main();        // smoothPen 処理
  draw(point);   // 直前の線だけ描画
  requestAnimationFrame(loop);
}
loop();
