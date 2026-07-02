import * as THREE from 'three';
import { theme } from '../theme';

export type HeroShape = 'icosahedron' | 'dodecahedron' | 'octahedron' | 'torusknot' | 'sphere';

function makeGeometry(shape: HeroShape): THREE.BufferGeometry {
  switch (shape) {
    case 'dodecahedron':
      return new THREE.DodecahedronGeometry(2, 0);
    case 'octahedron':
      return new THREE.OctahedronGeometry(2.1, 0);
    case 'torusknot':
      return new THREE.TorusKnotGeometry(1.35, 0.42, 140, 18);
    case 'sphere':
      return new THREE.SphereGeometry(2, 20, 14);
    default:
      return new THREE.IcosahedronGeometry(2, 1);
  }
}

/** Builds the rotating wireframe hero object + ambient particle field, wires up
 * mouse-parallax / scroll-drift, and returns a cleanup function. */
export function mountHeroScene(canvas: HTMLCanvasElement): () => void {
  const parent = canvas.parentElement!;
  let w = parent.clientWidth;
  let h = parent.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h, false);

  const group = new THREE.Group();
  scene.add(group);

  const accentMain = new THREE.Color(theme.accent);
  const accentLight = new THREE.Color(theme.accentLight);
  const accentDeep = new THREE.Color(theme.accentDeep);

  const geo = makeGeometry(theme.heroShape);
  const edges = new THREE.EdgesGeometry(geo);
  group.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: accentMain, transparent: true, opacity: 0.85 })));

  const coreGeo = makeGeometry(theme.heroShape);
  coreGeo.scale(0.98, 0.98, 0.98);
  group.add(new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({ color: 0x061410, transparent: true, opacity: 0.6 })));

  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', (geo.getAttribute('position') as THREE.BufferAttribute).clone());
  group.add(new THREE.Points(nodeGeo, new THREE.PointsMaterial({ color: accentLight, size: 0.12, transparent: true, opacity: 0.95 })));

  // Ambient particle field
  const N = 320;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const rad = 5 + Math.random() * 7;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = rad * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th);
    pos[i * 3 + 2] = rad * Math.cos(ph);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({ color: accentDeep, size: 0.045, transparent: true, opacity: 0.6 });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  let mx = 0, my = 0, tx = 0, ty = 0;
  const onMouse = (e: MouseEvent) => {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener('mousemove', onMouse, { passive: true });

  let scrollY = 0;
  const onScroll = () => { scrollY = window.scrollY; };
  window.addEventListener('scroll', onScroll, { passive: true });

  const onResize = () => {
    w = parent.clientWidth;
    h = parent.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  window.addEventListener('resize', onResize);

  const clock = new THREE.Clock();
  const m = theme.motion;
  let raf = 0;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    tx += (mx - tx) * 0.05;
    ty += (my - ty) * 0.05;
    group.rotation.y += 0.0026 * m;
    group.rotation.x = ty * 0.6 + Math.sin(t * 0.3) * 0.08;
    group.rotation.z = tx * 0.25;
    group.position.y = -scrollY * 0.0016;
    particles.rotation.y = t * 0.02;
    particles.rotation.x = t * 0.01;
    camera.position.x += (tx * 1.4 - camera.position.x) * 0.04;
    camera.position.y += (-ty * 1.0 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };
  animate();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('mousemove', onMouse);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    // Deliberately not calling renderer.dispose(): it internally forces WebGL
    // context loss, and context restoration is asynchronous — recreating a
    // renderer on the same <canvas> right away (e.g. React StrictMode's
    // double-invoked dev effects) would then fail to acquire a context at all.
    // The hero mounts once for the page's lifetime, so leaving the GL context
    // bound to the canvas is harmless; we still free geometry/material buffers.
    [geo, edges, coreGeo, nodeGeo, pGeo].forEach((g) => g.dispose());
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (Array.isArray(mesh.material)) mesh.material.forEach((mm) => mm.dispose());
      else if (mesh.material) (mesh.material as THREE.Material).dispose();
    });
  };
}
