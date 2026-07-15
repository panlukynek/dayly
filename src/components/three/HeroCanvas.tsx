"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Pozadí hero sekce — pole bodů zvlněné simplex noisem, barvy z palety
 * oldworld.nvim. Psáno rovnou proti three.js (bez react-three-fiber),
 * ať má komponenta plnou kontrolu nad životním cyklem:
 * - DPR strop na 2
 * - pauza mimo viewport (IntersectionObserver)
 * - prefers-reduced-motion → jeden statický snímek, žádná smyčka
 * - úklid geometrie, materiálu i kontextu při unmountu
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aScale;
  varying float vElevation;
  varying float vDist;

  // Simplex noise 3D — Ian McEwan, Ashima Arts (MIT)
  vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vec3 pos = position;

    float broad = snoise(vec3(pos.x * 0.16 + 10.0, pos.z * 0.28, uTime * 0.045));
    float detail = snoise(vec3(pos.x * 0.55, pos.z * 0.85, uTime * 0.11));
    pos.y += broad * 0.5 + detail * 0.16;

    vElevation = pos.y;
    vDist = length(pos.xz) / 5.0;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (7.5 * aScale * uPixelRatio) / -mv.z;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  uniform vec3 uColorEdge;
  varying float vElevation;
  varying float vDist;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;

    float alpha = smoothstep(0.5, 0.08, d);
    float t = smoothstep(-0.55, 0.65, vElevation);

    vec3 color = mix(uColorLow, uColorHigh, t);
    color = mix(color, uColorEdge, smoothstep(0.35, 1.0, vDist) * 0.55);

    float fade = 1.0 - smoothstep(0.5, 0.98, vDist);
    gl_FragColor = vec4(color, alpha * fade * 0.9);
  }
`;

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      // WebGL není k dispozici — hero má CSS fallback pozadí, nic se neděje
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 30);
    camera.position.set(0, 1.05, 2.9);
    camera.lookAt(0, 0, -0.4);

    // rovina bodů 10 × 6 jednotek
    const COLS = 190;
    const ROWS = 110;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    let i = 0;
    for (let ix = 0; ix < COLS; ix++) {
      for (let iz = 0; iz < ROWS; iz++) {
        positions[i * 3] = (ix / (COLS - 1) - 0.5) * 10;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (iz / (ROWS - 1) - 0.5) * 6;
        scales[i] = 0.6 + Math.random() * 0.8;
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        // oldworld: blue → purple, na okrajích cyan
        uColorLow: { value: new THREE.Color("#92a2d5") },
        uColorHigh: { value: new THREE.Color("#aca1cf") },
        uColorEdge: { value: new THREE.Color("#85b5ba") },
      },
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // jemná paralaxa kamery podle kurzoru
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) renderer.render(scene, camera);
    });
    ro.observe(container);

    const clock = new THREE.Clock();
    let inView = true;

    const tick = () => {
      if (!inView) return;
      material.uniforms.uTime.value = clock.getElapsedTime();
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      camera.position.x = pointer.x * 0.28;
      camera.position.y = 1.05 - pointer.y * 0.12;
      camera.lookAt(0, 0, -0.4);
      renderer.render(scene, camera);
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    io.observe(container);

    if (reduceMotion) {
      // statický snímek v „hezké" fázi animace
      material.uniforms.uTime.value = 14;
      renderer.render(scene, camera);
    } else {
      renderer.setAnimationLoop(tick);
    }

    return () => {
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" style={{ position: "absolute", inset: 0 }} />;
}
