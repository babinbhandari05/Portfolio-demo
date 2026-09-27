import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroBg: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070f, 0.0015);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 1. Interactive Particle Field
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00f0ff); // Cyan
    const color2 = new THREE.Color(0xa855f7); // Purple
    const color3 = new THREE.Color(0x10b981); // Emerald

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 220;
      positions[i3 + 1] = (Math.random() - 0.5) * 160;
      positions[i3 + 2] = (Math.random() - 0.5) * 180;

      const mixedColor = Math.random() > 0.6 ? color1 : Math.random() > 0.3 ? color2 : color3;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const pMaterial = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // 2. Central Wireframe 3D Floating Geometry (Geometric Torus Knot / Icosahedron)
    const geoIcosahedron = new THREE.IcosahedronGeometry(22, 2);
    const matWire = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireMesh = new THREE.Mesh(geoIcosahedron, matWire);
    wireMesh.position.set(35, 5, -15);
    scene.add(wireMesh);

    // Inner Glowing Core
    const geoCore = new THREE.OctahedronGeometry(12, 1);
    const matCore = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const coreMesh = new THREE.Mesh(geoCore, matCore);
    coreMesh.position.set(35, 5, -15);
    scene.add(coreMesh);

    // 3. Floating Interactive Rings
    const ringGeo = new THREE.TorusGeometry(32, 0.4, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.18,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(35, 5, -15);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / container.clientWidth - 0.5) * 2;
      mouseY = -((event.clientY - rect.top) / container.clientHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX * 12 - targetX) * 0.05;
      targetY += (mouseY * 12 - targetY) * 0.05;

      camera.position.x = targetX * 0.5;
      camera.position.y = targetY * 0.5;
      camera.lookAt(0, 0, 0);

      // Rotate particles slowly
      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = elapsed * 0.02;

      // Rotate geometric meshes
      wireMesh.rotation.x = elapsed * 0.12;
      wireMesh.rotation.y = elapsed * 0.18;
      coreMesh.rotation.x = -elapsed * 0.2;
      coreMesh.rotation.z = elapsed * 0.15;
      ringMesh.rotation.z = elapsed * 0.08;
      ringMesh.rotation.y = elapsed * 0.05;

      // Subtle float
      wireMesh.position.y = 5 + Math.sin(elapsed * 0.8) * 3;
      coreMesh.position.y = 5 + Math.sin(elapsed * 0.8) * 3;
      ringMesh.position.y = 5 + Math.sin(elapsed * 0.8) * 3;

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      pMaterial.dispose();
      geoIcosahedron.dispose();
      matWire.dispose();
      geoCore.dispose();
      matCore.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-80"
    />
  );
};
