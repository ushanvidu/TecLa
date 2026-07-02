import * as THREE from 'three';
import { theme } from '../theme';

export type HeroShape = 'icosahedron' | 'dodecahedron' | 'octahedron' | 'torusknot' | 'sphere';

function makeGeometry(shape: HeroShape): THREE.BufferGeometry {
  switch (shape) {
    case 'dodecahedron': return new THREE.DodecahedronGeometry(2, 0);
    case 'octahedron':   return new THREE.OctahedronGeometry(2.1, 0);
    case 'torusknot':    return new THREE.TorusKnotGeometry(1.35, 0.42, 140, 18);
    case 'sphere':       return new THREE.SphereGeometry(2, 20, 14);
    default:             return new THREE.IcosahedronGeometry(2, 1);
  }
}

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

  const accentMain  = new THREE.Color(theme.accent);
  const accentLight = new THREE.Color(theme.accentLight);
  const accentDeep  = new THREE.Color(theme.accentDeep);

  // ── Main group ────────────────────────────────────────────────────────────
  const group = new THREE.Group();
  scene.add(group);

  const geo = makeGeometry(theme.heroShape);
  const edges = new THREE.EdgesGeometry(geo);
  group.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: accentMain, transparent: true, opacity: 0.9 })));

  const coreGeo = makeGeometry(theme.heroShape);
  coreGeo.scale(0.98, 0.98, 0.98);
  group.add(new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({ color: 0x061410, transparent: true, opacity: 0.65 })));

  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', (geo.getAttribute('position') as THREE.BufferAttribute).clone());
  group.add(new THREE.Points(nodeGeo, new THREE.PointsMaterial({ color: accentLight, size: 0.13, transparent: true, opacity: 1.0 })));

  // ── Orbiting satellite ────────────────────────────────────────────────────
  const satGeo   = new THREE.OctahedronGeometry(0.38, 0);
  const satEdges = new THREE.EdgesGeometry(satGeo);
  const satMesh  = new THREE.LineSegments(satEdges, new THREE.LineBasicMaterial({ color: accentLight, transparent: true, opacity: 0.75 }));
  scene.add(satMesh);

  // Second smaller satellite on a tilted orbit
  const sat2Geo   = new THREE.TetrahedronGeometry(0.22, 0);
  const sat2Edges = new THREE.EdgesGeometry(sat2Geo);
  const sat2Mesh  = new THREE.LineSegments(sat2Edges, new THREE.LineBasicMaterial({ color: accentDeep, transparent: true, opacity: 0.6 }));
  scene.add(sat2Mesh);

  // ── Orbit ring (visual trace) ─────────────────────────────────────────────
  const ringGeo = new THREE.TorusGeometry(3.8, 0.004, 2, 128);
  const ringMat = new THREE.MeshBasicMaterial({ color: accentDeep, transparent: true, opacity: 0.18 });
  const orbitRing = new THREE.Mesh(ringGeo, ringMat);
  orbitRing.rotation.x = Math.PI / 2.5;
  orbitRing.rotation.z = Math.PI / 6;
  scene.add(orbitRing);

  // ── Ambient particle field ────────────────────────────────────────────────
  const N = 560;
  const pos = new Float32Array(N * 3);
  const colors = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const rad = 5 + Math.random() * 8;
    const th  = Math.random() * Math.PI * 2;
    const ph  = Math.acos(2 * Math.random() - 1);
    pos[i * 3]     = rad * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th);
    pos[i * 3 + 2] = rad * Math.cos(ph);
    // Mix accent colors across particles
    const t = Math.random();
    const col = t < 0.5 ? accentDeep : accentLight;
    colors[i * 3]     = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.05,
    transparent: true,
    opacity: 0.65,
  }));
  scene.add(particles);

  // ── Mouse + scroll ────────────────────────────────────────────────────────
  let mx = 0, my = 0, tx = 0, ty = 0;
  const onMouse = (e: MouseEvent) => {
    mx = e.clientX / window.innerWidth  - 0.5;
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

  // ── Animation loop ────────────────────────────────────────────────────────
  const clock = new THREE.Clock();
  const m = theme.motion;
  let raf = 0;

  const animate = () => {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    tx += (mx - tx) * 0.05;
    ty += (my - ty) * 0.05;

    // Main object
    group.rotation.y += 0.0026 * m;
    group.rotation.x  = ty * 0.6 + Math.sin(t * 0.3) * 0.08;
    group.rotation.z  = tx * 0.25;
    group.position.y  = -scrollY * 0.0016;

    // Breathing (subtle scale pulse)
    const breathe = 1 + Math.sin(t * 0.7) * 0.032;
    group.scale.set(breathe, breathe, breathe);

    // Primary satellite orbit
    const orbitSpeed = 0.38 * m;
    satMesh.position.set(
      Math.cos(t * orbitSpeed) * 3.8,
      Math.sin(t * orbitSpeed * 0.55) * 1.5,
      Math.sin(t * orbitSpeed) * 3.8
    );
    satMesh.rotation.x = t * 0.6;
    satMesh.rotation.y = t * 0.9;

    // Secondary satellite — faster, tilted orbit
    const orbitSpeed2 = 0.6 * m;
    sat2Mesh.position.set(
      Math.sin(t * orbitSpeed2 + 2) * 3.1,
      Math.cos(t * orbitSpeed2 * 0.8) * 2.2,
      Math.cos(t * orbitSpeed2 + 2) * 3.1
    );
    sat2Mesh.rotation.z = t * 1.2;

    // Orbit ring follows scroll
    orbitRing.position.y = -scrollY * 0.001;

    // Particles rotate slowly
    particles.rotation.y =  t * 0.018;
    particles.rotation.x =  t * 0.009;

    // Camera mouse parallax
    camera.position.x += (tx * 1.5 - camera.position.x) * 0.04;
    camera.position.y += (-ty * 1.1 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };
  animate();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('mousemove', onMouse);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    [geo, edges, coreGeo, nodeGeo, satGeo, satEdges, sat2Geo, sat2Edges, ringGeo, pGeo].forEach((g) => g.dispose());
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (Array.isArray(mesh.material)) mesh.material.forEach((mm) => mm.dispose());
      else if (mesh.material) (mesh.material as THREE.Material).dispose();
    });
  };
}
