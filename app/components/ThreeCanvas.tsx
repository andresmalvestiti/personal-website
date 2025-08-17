'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const simplexNoiseGLSL = `
vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 permute(vec4 x) {
  return mod289(((x*34.0)+1.0)*x);
}
float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.y;
  vec4 y = y_ *ns.x + ns.y;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

export default function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef(0);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const GRID_SIZE = 80;
    const PARTICLES = GRID_SIZE * GRID_SIZE;

    const bottomPositions = new Float32Array(PARTICLES * 3);
    const topPositions = new Float32Array(PARTICLES * 3);
    const spherePositions = new Float32Array(PARTICLES * 3);

    let i = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        const idx = i * 3;
        const px = (x - GRID_SIZE / 2) * 0.06;
        const pz = (y - GRID_SIZE / 2) * 0.06;

        // Plano inferior (y = -2.5)
        bottomPositions[idx] = px;
        bottomPositions[idx + 1] = -2.5;
        bottomPositions[idx + 2] = pz;

        // Plano superior (y = +2.5)
        topPositions[idx] = px;
        topPositions[idx + 1] = 2.5;
        topPositions[idx + 2] = pz;

        // Esfera
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 1.5;

        spherePositions[idx] = radius * Math.sin(phi) * Math.cos(theta);
        spherePositions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
        spherePositions[idx + 2] = radius * Math.cos(phi);

        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('bottomPosition', new THREE.BufferAttribute(bottomPositions, 3));
    geometry.setAttribute('topPosition', new THREE.BufferAttribute(topPositions, 3));
    geometry.setAttribute('spherePosition', new THREE.BufferAttribute(spherePositions, 3));
    // Para empezar usaremos "position" como bottomPosition para poder usarlo en THREE internamente
    geometry.setAttribute('position', new THREE.BufferAttribute(bottomPositions, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMorphProgress: { value: 0 },
        uColor: { value: new THREE.Color(0x3399ff) }, // azul
      },
      vertexShader: `
        uniform float uTime;
        uniform float uMorphProgress;
        attribute vec3 bottomPosition;
        attribute vec3 topPosition;
        attribute vec3 spherePosition;
        varying float vOpacity;

        ${simplexNoiseGLSL}

        void main() {
          // Fluctuación suave con ruido en planos (solo para bottom y top)
          float noiseBottom = snoise(bottomPosition * 3.0 + vec3(0.0, uTime, 0.0)) * 0.05;
          float noiseTop = snoise(topPosition * 3.0 + vec3(0.0, uTime, 0.0)) * 0.05;

          // Interpolamos de bottom a top (0 a 0.5)
          vec3 pos;
          if (uMorphProgress < 0.5) {
            float t = uMorphProgress * 2.0;

            // Partículas en bottom plano con fluctuación
            vec3 bottomPos = bottomPosition + vec3(0.0, noiseBottom, 0.0);
            // Partículas en top plano con fluctuación
            vec3 topPos = topPosition + vec3(0.0, noiseTop, 0.0);

            pos = mix(bottomPos, topPos, t);

          } else {
            // De 0.5 a 1 hacemos morph a esfera con fluctuación líquida
            float t = (uMorphProgress - 0.5) * 2.0;

            float noiseSphere = snoise(spherePosition * 3.0 + vec3(0.0, 0.0, uTime * 0.5));
            vec3 offset = normalize(spherePosition) * noiseSphere * 0.1;

            vec3 spherePos = spherePosition + offset;
            // También usamos top plano fluctuante para suavizar la transición
            vec3 topPos = topPosition + vec3(0.0, noiseTop, 0.0);

            pos = mix(topPos, spherePos, t);
          }

          vOpacity = uMorphProgress;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 3.0;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vOpacity;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          gl_FragColor = vec4(uColor, vOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Scroll handler para morph
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(scrollTop / docHeight, 1);
      morphRef.current = scrollPercent;
      material.uniforms.uMorphProgress.value = morphRef.current;
    };
    window.addEventListener('scroll', onScroll);

    // Animación
    function animate() {
      requestAnimationFrame(animate);

      material.uniforms.uTime.value += 0.02;

      // Cuando morph completo, rotar esfera
      if (morphRef.current >= 1) {
        points.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* Para que haya scroll y puedas probar, ponemos un div gigante */}
      <div style={{ height: '300vh' }}></div>
      <div
        ref={mountRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none', // para que no bloquee clicks ni scroll
          zIndex: 10,
        }}
      />
    </>
  );
}
