// JS port of https://www.kevinbeason.com/smallpt/smallpt.txt
const { sqrt, pow, PI, abs, sin, cos } = Math;
const rand = Math.random;

class V3 {
  constructor(x,y,z) { this.x=x; this.y=y; this.z=z;}
  len() { return sqrt(this.x * this.x + this.y * this.y + this.z * this.z) }
  norm() { let d = this.len(); return new V3(this.x/d, this.y/d, this.z/d) }
  mult(other) { return new V3(this.x * other.x, this.y * other.y, this.z * other.z); }
  smul(s) { return new V3(this.x * s, this.y * s, this.z * s) }
  dot(other) {
      let u = this; let v = other;
      return u.x*v.x + u.y*v.y + u.z*v.z;
  }
}

const v3 = (x, y, z) => new V3(x, y, z);
const vzero = () => new V3(0, 0, 0);
const vadd = (u, v) => v3(u.x + v.x, u.y + v.y, u.z + v.z);
const vsub = (u, v) => v3(u.x - v.x, u.y - v.y, u.z - v.z);
const smul = (s, v) => v3(s * v.x, s * v.y, s * v.z);
const dot = (u, v) => u.x * v.x + u.y * v.y + u.z * v.z;
const cross = (u, v) => v3(u.y * v.z - u.z * v.y, u.z * v.x - u.x * v.z, u.x * v.y - u.y * v.x);

class Ray {
  constructor(o, d) { this.o = o; this.d = d; }
  static of(o, d) { return new Ray(o, d) }
}

const DIFF = 0;
const SPEC = 1;
const REFR = 2;

class Sphere {
  constructor(r, p, e, c, m) { this.r = r; this.p = p; this.e = e; this.c = c; this.m = m; }
  intersect(r) {
    let op = vsub(this.p, r.o);
    let t, eps = 1e-4;
    let b = dot(op, r.d);
    let det = b * b - dot(op, op) + this.r * this.r;
    if (det < 0)
      return 0;
    else
      det = sqrt(det);
    return (t = b - det) > eps ? t : ((t = b + det) > eps ? t : 0);
  }
}

const sphere = (r, p, e, c, m) => new Sphere(r, p, e, c, m)

const clamp = x => x < 0 ? 0 : x > 1 ? 1 : x
const toInt = x => (pow(clamp(x), 1 / 2.2) * 255 + .5) | 0

const intersect = (spheres, r) => {
  let t = Infinity, id = 0, n = spheres.length;
  let d, inf = t = 1e20;
  for (let i = n; i--;)
    if ((d = spheres[i].intersect(r)) && d < t) {
      t = d; id = i;
    }
  return [(t < inf), t, id];
}

function radiance(spheres, r, depth) {
  let [hit, t, id] = intersect(spheres, r);
  if (!hit)
    return vzero();

  const obj = spheres[id];

  let x = vadd(r.o, r.d.smul(t));
  let n = vsub(x, obj.p).norm();
  let nl = n.dot(r.d) < 0 ? n : n.smul(-1);
  let f = obj.c;

  let p = f.x > f.y && f.x > f.z ? f.x : f.y > f.z ? f.y : f.z; // max color component
  if (++depth > 5)
    if (rand() < p)
      f = f.smul(1 / p);
    else
      return obj.e;

  if (obj.m === DIFF) {
    let r1 = 2 * PI * rand(), r2 = rand(), r2s = sqrt(r2);
    let w = nl;
    let u = cross(abs(w.x) > .1 ? v3(0, 1, 0) : v3(1, 0, 0), w).norm();
    let v = cross(w, u);
    let d = vadd(vadd(u.smul(cos(r1) * r2s), v.smul(sin(r1) * r2s)), w.smul(sqrt(1 - r2))).norm();
    return vadd(obj.e, f.mult(radiance(spheres, Ray.of(x, d), depth)));
  } else if (obj.m === SPEC) {
    return vadd(obj.e, f.mult(radiance(spheres, Ray.of(x, vsub(r.d, n.smul(2 * n.dot(r.d)))), depth)));
  }

  let reflRay = Ray.of(x, vsub(r.d, n.smul(2 * n.dot(r.d))));
  let into = n.dot(nl) > 0;
  let nc = 1;
  let nt = 1.5;
  let nnt = into ? nc / nt : nt / nc;
  let ddn = r.d.dot(nl);
  let cos2t;

  if ((cos2t = 1 - nnt * nnt * (1 - ddn * ddn)) < 0)
    return vadd(obj.e, f.mult(radiance(spheres, reflRay, depth)));

  let tdir = (vsub(r.d.smul(nnt), n.smul(((into ? 1 : -1) * (ddn * nnt + sqrt(cos2t)))))).norm();
  let a = nt - nc;
  let b = nt + nc;
  let R0 = a * a / (b * b);
  let c = 1 - (into ? -ddn : tdir.dot(n));
  let Re = R0 + (1 - R0) * c * c * c * c * c;
  let Tr = 1 - Re;
  let P = .25 + .5 * Re;
  let RP = Re / P;
  let TP = Tr / (1 - P);

  return vadd(obj.e, f.mult(depth > 2 ? (rand() < P ?
    radiance(spheres, reflRay, depth).smul(RP) :
    radiance(spheres, Ray.of(x, tdir), depth).smul(TP)) :
    vadd(radiance(spheres, reflRay, depth).smul(Re), radiance(spheres, Ray.of(x, tdir), depth).smul(Tr))));
}


function render(spheres, w, h, samps) {
  console.log(`Rendering ${w}x${h} @ ${samps*4} spp`);
  let cam = Ray.of(v3(50, 52, 295.6), v3(0, -0.042612, -1).norm()); // cam pos, dir
  let cx = v3(w * .5135 / h, 0., 0.);
  let cy = smul(.5135, cross(cx, cam.d).norm());
  let c = new Array(w * h).fill(v3(0, 0, 0));

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++)
      for (let sy = 0, i = (h - y - 1) * w + x; sy < 2; sy++)
        for (let sx = 0; sx < 2; sx++) {
          let r = vzero();
          for (let s = 0; s < samps; s++) {
            let r1 = 2 * rand(), dx = r1 < 1 ? sqrt(r1) - 1 : 1 - sqrt(2 - r1);
            let r2 = 2 * rand(), dy = r2 < 1 ? sqrt(r2) - 1 : 1 - sqrt(2 - r2);
            let d = vadd(vadd(cx.smul(((sx + .5 + dx) / 2 + x) / w - .5), cy.smul(((sy + .5 + dy) / 2 + y) / h - .5)), cam.d);
            r = vadd(r, radiance(spheres, Ray.of(vadd(cam.o, d.smul(140)), d.norm()), 0).smul(1. / samps));
          }
          c[i] = vadd(c[i], smul(.25, v3(clamp(r.x), clamp(r.y), clamp(r.z))));
        }
  }
  return c;
}

function paint(w, h, pixels) {
  let canvas = document.getElementById("smallpt-canvas");
  let context = canvas.getContext("2d");
  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      let p = pixels[y * w + x];
      context.fillStyle = "rgba(" + toInt(p.x) + ", " + toInt(p.y) + ", " + toInt(p.z) + ", 1.0)";
      context.fillRect(x, y, 1, 1);
    }
  }
}

function main() {
  let canvas = document.getElementById("smallpt-canvas");
  let ctx = canvas.getContext('2d');
  let w = canvas.width;
  let h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  let sampsText = document.getElementById("samples").value;
  let samps = sampsText ? (parseInt(sampsText)/4)|0 : 1;
  const scene = document.getElementById("scene").value ?? "cornell_spheres";
  const spheres = getScene(scene);
  let start = performance.now();
  const pixels = render(spheres, w, h, samps);
  let end = performance.now();
  paint(w, h, pixels);
  console.log("done! took: ", (end-start)/1000.0, "s");
}

// dumps pixels to PPM file (useful for command line)
const dumpPPM = (c, w, h) => {
  console.log(`P3\n${w} ${h}\n255`);
  for (let i = 0; i < w * h; i++) {
    let r = toInt(c[i].x);
    let g = toInt(c[i].y);
    let b = toInt(c[i].z);
    process.stdout.write(`${r} ${g} ${b} `);
  }
}

// main if you want to run from command line
// dumps data to ppm
function cliMain() {
  const w = 512;
  const h = 512;
  let scene = getScene("cornell_spheres");
  const samps = 40;
  const buf = render(w, h, samps / 4);
  dumpPPM(buf, w, h);
}