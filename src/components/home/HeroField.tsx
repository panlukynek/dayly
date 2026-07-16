"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero backdrop: ~5k square points that start as a drifting cloud and
 * settle into a strict grid as you scroll — scattered notes becoming an
 * ordered day. The morph is a single uniform (uMix) scrubbed by
 * ScrollTrigger; everything else happens in the vertex shader.
 *
 * Square points on purpose — the whole site is square-cornered.
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uMix;
  uniform float uPixelRatio;
  attribute vec3 aScatter;
  attribute float aSeed;
  varying float vSeed;
  varying float vFade;

  void main() {
    float t = uTime * 0.22;

    vec3 chaos = aScatter + 0.38 * vec3(
      sin(t + aSeed * 17.0),
      cos(t * 0.8 + aSeed * 29.0),
      sin(t * 0.6 + aSeed * 43.0)
    );

    vec3 grid = position;
    grid.z += sin(uTime * 0.9 + position.x * 1.3 + position.y * 1.7) * 0.05;

    float m = smoothstep(0.0, 1.0, uMix);
    vec3 pos = mix(chaos, grid, m);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = ((2.1 + 2.4 * fract(aSeed * 7.31)) * uPixelRatio * 1.7) / -mv.z;

    vSeed = aSeed;
    vFade = 1.0 - smoothstep(2.1, 4.0, length(pos.xy));
  }
`;

const FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform vec3 uPurple;
  uniform vec3 uBlue;
  uniform vec3 uCyan;
  varying float vSeed;
  varying float vFade;

  void main() {
    float pick = fract(vSeed * 13.7);
    vec3 color = pick < 0.5 ? uBlue : (pick < 0.82 ? uPurple : uCyan);

    float twinkle = 0.72 + 0.28 * sin(uTime * 1.6 + vSeed * 61.0);
    gl_FragColor = vec4(color, vFade * twinkle * 0.85);
  }
`;

export default function HeroField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    } catch {
      return; // no WebGL — the hero keeps its plain background
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
    camera.position.set(0, 0, 4.4);

    const COLS = 96;
    const ROWS = 54;
    const count = COLS * ROWS;

    const grid = new Float32Array(count * 3);
    const scatter = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    let i = 0;
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        grid[i * 3] = (x / (COLS - 1) - 0.5) * 7.2;
        grid[i * 3 + 1] = (y / (ROWS - 1) - 0.5) * 4.0;
        grid[i * 3 + 2] = 0;

        // uniform-ish cloud, biased toward the middle
        const r = 3.6 * Math.cbrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        scatter[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.4;
        scatter[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
        scatter[i * 3 + 2] = r * Math.cos(phi) * 0.45;

        seeds[i] = Math.random();
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(grid, 3));
    geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMix: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uPurple: { value: new THREE.Color("#aca1cf") },
        uBlue: { value: new THREE.Color("#92a2d5") },
        uCyan: { value: new THREE.Color("#85b5ba") },
      },
    });

    scene.add(new THREE.Points(geometry, material));

    // cloud → grid, driven by how far the hero has been scrolled away
    let st: ScrollTrigger | undefined;
    if (!reduceMotion) {
      st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          material.uniforms.uMix.value = self.progress;
        },
      });
    }

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (!w || !h) return;
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
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    io.observe(container);

    const tick = () => {
      if (!inView) return;
      material.uniforms.uTime.value = clock.getElapsedTime();
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      camera.position.x = pointer.x * 0.22;
      camera.position.y = -pointer.y * 0.14;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    if (reduceMotion) {
      material.uniforms.uMix.value = 1;
      material.uniforms.uTime.value = 8;
      renderer.render(scene, camera);
    } else {
      renderer.setAnimationLoop(tick);
    }

    return () => {
      renderer.setAnimationLoop(null);
      st?.kill();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={ref} aria-hidden="true" style={{ position: "absolute", inset: 0 }} />;
}
