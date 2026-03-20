import { useEffect, useRef } from "react";
import * as THREE from "three";

const MAX_TRAIL = 60;

function randRange(a, b) {
  return a + Math.random() * (b - a);
}

function createMeteor(W, H) {
  // Always spawn from top-left region, travel toward bottom-right
  const startX = randRange(-60, W * 0.3);
  const startY = randRange(-60, H * 0.15);
  const angle = randRange(25, 55) * (Math.PI / 180); // diagonal down-right

  const speed = randRange(1.5, 3.5);
  const trailLen = Math.floor(randRange(25, MAX_TRAIL));
  const size = randRange(0.4, 1.4);
  const brightness = randRange(0.45, 0.9);

  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;

  const positions = new Float32Array(trailLen * 3);
  for (let i = 0; i < trailLen; i++) {
    positions[i * 3] = startX - vx * i;
    positions[i * 3 + 1] = startY - vy * i;
    positions[i * 3 + 2] = 0;
  }

  const colors = new Float32Array(trailLen * 3);
  for (let i = 0; i < trailLen; i++) {
    const fade = Math.pow(1 - i / trailLen, 2);
    colors[i * 3] = brightness * (0.8 + 0.2 * fade) * fade;
    colors[i * 3 + 1] = brightness * (0.85 + 0.15 * fade) * fade;
    colors[i * 3 + 2] = brightness * fade;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const line = new THREE.Line(
    geo,
    new THREE.LineBasicMaterial({ vertexColors: true, transparent: true }),
  );

  const dotGeo = new THREE.CircleGeometry(size, 8);
  const dotMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(brightness, brightness, brightness),
  });
  const dot = new THREE.Mesh(dotGeo, dotMat);
  dot.position.set(startX, startY, 0);

  return {
    line,
    dot,
    geo,
    dotGeo,
    dotMat,
    vx,
    vy,
    headX: startX,
    headY: startY,
    trailLen,
  };
}

function spawnAtProgress(m, steps) {
  for (let s = 0; s < steps; s++) {
    m.headX += m.vx;
    m.headY += m.vy;
  }
  const pos = m.geo.attributes.position.array;
  for (let j = 0; j < m.trailLen; j++) {
    pos[j * 3] = m.headX - m.vx * j;
    pos[j * 3 + 1] = m.headY - m.vy * j;
  }
  m.geo.attributes.position.needsUpdate = true;
  m.dot.position.set(m.headX, m.headY, 0);
}

function removeMeteor(scene, m) {
  scene.remove(m.line);
  scene.remove(m.dot);
  m.geo.dispose();
  m.line.material.dispose();
  m.dotGeo.dispose();
  m.dotMat.dispose();
}

export default function ShootingStars({ count = 20 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, W, 0, H, -1, 1);

    // Static background stars
    const N = 250;
    const bgPos = new Float32Array(N * 3);
    const bgCol = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      bgPos[i * 3] = Math.random() * W;
      bgPos[i * 3 + 1] = Math.random() * H;
      bgPos[i * 3 + 2] = 0;
      const b = 0.08 + Math.random() * 0.3;
      bgCol[i * 3] = b;
      bgCol[i * 3 + 1] = b;
      bgCol[i * 3 + 2] = b + 0.1;
    }
    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPos, 3));
    bgGeo.setAttribute("color", new THREE.BufferAttribute(bgCol, 3));
    scene.add(
      new THREE.Points(
        bgGeo,
        new THREE.PointsMaterial({
          vertexColors: true,
          size: 1.5,
          sizeAttenuation: false,
        }),
      ),
    );

    // Seed meteors spread across their paths so screen isn't empty on load
    let meteors = [];
    for (let i = 0; i < count; i++) {
      const m = createMeteor(W, H);
      spawnAtProgress(m, Math.floor(randRange(0, 400)));
      scene.add(m.line);
      scene.add(m.dot);
      meteors.push(m);
    }

    function isOffScreen(m) {
      return m.headX > W + 120 || m.headY > H + 120;
    }

    function updateMeteor(m) {
      m.headX += m.vx;
      m.headY += m.vy;
      const pos = m.geo.attributes.position.array;
      for (let i = m.trailLen - 1; i > 0; i--) {
        pos[i * 3] = pos[(i - 1) * 3];
        pos[i * 3 + 1] = pos[(i - 1) * 3 + 1];
      }
      pos[0] = m.headX;
      pos[1] = m.headY;
      m.geo.attributes.position.needsUpdate = true;
      m.dot.position.set(m.headX, m.headY, 0);
    }

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);

      meteors.forEach((m) => updateMeteor(m));

      // Remove ones that left the screen, immediately spawn a fresh one — infinite loop
      meteors = meteors.filter((m) => {
        if (isOffScreen(m)) {
          removeMeteor(scene, m);
          return false;
        }
        return true;
      });

      while (meteors.length < count) {
        const m = createMeteor(W, H);
        scene.add(m.line);
        scene.add(m.dot);
        meteors.push(m);
      }

      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      const W2 = window.innerWidth;
      const H2 = window.innerHeight;
      renderer.setSize(W2, H2);
      camera.right = W2;
      camera.bottom = H2;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      meteors.forEach((m) => removeMeteor(scene, m));
      bgGeo.dispose();
      renderer.dispose();
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
