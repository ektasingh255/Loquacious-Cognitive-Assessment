/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NeuronRingCanvasProps {
  className?: string;
}

export const NeuronRingCanvas: React.FC<NeuronRingCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);
  const [activeSignalCount, setActiveSignalCount] = useState<number>(14);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Test WebGL capability safely
    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const rendererStr = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : '';
      if (/SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(String(rendererStr))) {
        isSoftwareGl = true;
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      setWebGlSupported(false);
      return;
    }

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Create Procedural Circular Neuron Glow Texture
    const createNeuronTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(215, 204, 250, 0.95)');
      gradient.addColorStop(0.45, 'rgba(139, 120, 214, 0.7)');
      gradient.addColorStop(0.75, 'rgba(101, 82, 163, 0.25)');
      gradient.addColorStop(1, 'rgba(101, 82, 163, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const neuronTexture = createNeuronTexture();

    // 4. Generate Neural Orbital Ring Architecture
    // We create primary neurons distributed in an orbital ring with 3 subtle concentric layers
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    interface NeuronData {
      basePos: THREE.Vector3;
      currPos: THREE.Vector3;
      layer: number;
      baseSize: number;
      pulsePhase: number;
      pulseSpeed: number;
      illumination: number; // 0 to 1 based on pointer proximity
    }

    const neuronCount = 110;
    const neurons: NeuronData[] = [];
    const baseRadius = 5.2;

    // Distribute nodes around the ring with organic depth
    for (let i = 0; i < neuronCount; i++) {
      const t = (i / neuronCount) * Math.PI * 2;
      const layer = i % 3; // 0: inner, 1: mid, 2: outer
      const radiusOffset = (layer - 1) * 0.95 + (Math.random() - 0.5) * 0.45;
      const r = baseRadius + radiusOffset;
      
      // Undulate in Z with harmonic waves
      const zOffset = Math.sin(t * 3) * 0.9 + Math.cos(t * 2) * 0.6 + (Math.random() - 0.5) * 0.7;
      const x = Math.cos(t) * r;
      const y = Math.sin(t) * (r * 0.88); // slight elliptical perspective
      const z = zOffset;

      const pos = new THREE.Vector3(x, y, z);
      neurons.push({
        basePos: pos.clone(),
        currPos: pos.clone(),
        layer,
        baseSize: layer === 1 ? 0.38 : 0.28,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 1.2 + Math.random() * 1.5,
        illumination: 0,
      });
    }

    // 5. Connect Neurons with Axon Fibers (LineSegments)
    interface AxonConnection {
      fromIndex: number;
      toIndex: number;
      distance: number;
      baseAlpha: number;
      currentAlpha: number;
    }

    const axonConnections: AxonConnection[] = [];
    const maxConnectionDistance = 2.45;

    for (let i = 0; i < neuronCount; i++) {
      for (let j = i + 1; j < neuronCount; j++) {
        const d = neurons[i].basePos.distanceTo(neurons[j].basePos);
        if (d < maxConnectionDistance) {
          axonConnections.push({
            fromIndex: i,
            toIndex: j,
            distance: d,
            baseAlpha: Math.max(0.12, 0.45 - (d / maxConnectionDistance) * 0.35),
            currentAlpha: 0.2,
          });
        }
      }
    }

    // Build LineSegments geometry for axons
    const axonPositions = new Float32Array(axonConnections.length * 2 * 3);
    const axonColors = new Float32Array(axonConnections.length * 2 * 4); // RGBA per vertex

    const axonGeometry = new THREE.BufferGeometry();
    axonGeometry.setAttribute('position', new THREE.BufferAttribute(axonPositions, 3));
    axonGeometry.setAttribute('color', new THREE.BufferAttribute(axonColors, 4));

    // Custom Shader for Lines with Per-Vertex RGBA
    const axonMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute vec4 color;
        varying vec4 vColor;
        void main() {
          vColor = color;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec4 vColor;
        void main() {
          gl_FragColor = vColor;
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const axonLines = new THREE.LineSegments(axonGeometry, axonMaterial);
    ringGroup.add(axonLines);

    // 6. Action Potential Signals (Traveling Pulses Along Axons)
    interface SignalPulse {
      connectionIndex: number;
      progress: number;
      speed: number;
      direction: 1 | -1;
      brightness: number;
    }

    const pulseCount = 18;
    const signals: SignalPulse[] = [];

    for (let i = 0; i < pulseCount; i++) {
      signals.push({
        connectionIndex: Math.floor(Math.random() * axonConnections.length),
        progress: Math.random(),
        speed: 0.35 + Math.random() * 0.45,
        direction: Math.random() > 0.5 ? 1 : -1,
        brightness: 0.7 + Math.random() * 0.3,
      });
    }

    // Geometry for Signal Pulses (small luminous points moving along axons)
    const signalPositions = new Float32Array(pulseCount * 3);
    const signalGeometry = new THREE.BufferGeometry();
    signalGeometry.setAttribute('position', new THREE.BufferAttribute(signalPositions, 3));

    const signalMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: neuronTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(0xF1EDFF),
    });

    const signalPoints = new THREE.Points(signalGeometry, signalMaterial);
    ringGroup.add(signalPoints);

    // 7. Neurons Point Cloud Geometry
    const neuronPositions = new Float32Array(neuronCount * 3);
    const neuronColors = new Float32Array(neuronCount * 3);
    const neuronSizes = new Float32Array(neuronCount);

    const neuronGeometry = new THREE.BufferGeometry();
    neuronGeometry.setAttribute('position', new THREE.BufferAttribute(neuronPositions, 3));
    neuronGeometry.setAttribute('color', new THREE.BufferAttribute(neuronColors, 3));
    neuronGeometry.setAttribute('size', new THREE.BufferAttribute(neuronSizes, 1));

    // Custom Shader for Neurons to support per-point sizing & glow
    const neuronShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: neuronTexture },
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (260.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main() {
          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          gl_FragColor = vec4(vColor * texColor.rgb, texColor.a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const neuronPointsMesh = new THREE.Points(neuronGeometry, neuronShaderMaterial);
    ringGroup.add(neuronPointsMesh);

    // Initial orientation: subtle 3D tilt
    ringGroup.rotation.x = 0.38;
    ringGroup.rotation.y = -0.25;

    // 8. Pointer & Touch Interaction State
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      isHovered: false,
    };

    const updatePointerPos = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const isInside = x >= -40 && x <= rect.width + 40 && y >= -40 && y <= rect.height + 40;

      if (isInside) {
        const normalizedX = Math.max(-1.2, Math.min(1.2, (x / rect.width) * 2 - 1));
        const normalizedY = Math.max(-1.2, Math.min(1.2, -(y / rect.height) * 2 + 1));

        mouse.targetX = normalizedX;
        mouse.targetY = normalizedY;
        mouse.isHovered = true;
      } else if (mouse.isHovered) {
        mouse.targetX = 0;
        mouse.targetY = 0;
        mouse.isHovered = false;
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      updatePointerPos(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.isHovered = false;
    };

    container.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('mouseleave', handlePointerLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handlePointerLeave);
    // Also attach to window so approaching from outside triggers early illumination
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId = 0;
    let clock = new THREE.Clock();

    // Reusable math vectors to avoid GC in render loop
    const _projectedNeuron = new THREE.Vector3();
    const _screenNeuron = new THREE.Vector2();
    const _mouseVec = new THREE.Vector2();

    const render = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth pointer interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      _mouseVec.set(mouse.x, mouse.y);

      // Base idle drift and slow rotation (respect reduced motion)
      if (!prefersReducedMotion) {
        ringGroup.rotation.z += 0.0018; // continuous slow orbital spin
        
        // Tilt reaction to pointer with smooth dampening
        const targetRotX = 0.38 + (mouse.y * 0.22);
        const targetRotY = -0.25 + (mouse.x * 0.28);
        ringGroup.rotation.x += (targetRotX - ringGroup.rotation.x) * 0.05;
        ringGroup.rotation.y += (targetRotY - ringGroup.rotation.y) * 0.05;

        // Subtle organic float
        ringGroup.position.y = Math.sin(elapsed * 0.8) * 0.12;
      }

      // Update Neurons: Proximity illumination + gentle pulse
      const posAttr = neuronGeometry.attributes.position as THREE.BufferAttribute;
      const colorAttr = neuronGeometry.attributes.color as THREE.BufferAttribute;
      const sizeAttr = neuronGeometry.attributes.size as THREE.BufferAttribute;

      // Base color palette: Refined lavender (#8B78D6) and deep violet (#6552A3)
      const baseR = 0.545; // 139/255
      const baseG = 0.470; // 120/255
      const baseB = 0.839; // 214/255

      // Highlight color: Pure bright lavender-white
      const highR = 0.94;
      const highG = 0.92;
      const highB = 1.0;

      for (let i = 0; i < neuronCount; i++) {
        const n = neurons[i];

        // Compute current world position
        n.currPos.copy(n.basePos);
        if (!prefersReducedMotion) {
          // Gentle radial breathing
          const breathe = Math.sin(elapsed * n.pulseSpeed + n.pulsePhase) * 0.06;
          n.currPos.multiplyScalar(1 + breathe);
        }

        posAttr.setXYZ(i, n.currPos.x, n.currPos.y, n.currPos.z);

        // Project neuron to normalized device coordinates to check pointer distance
        _projectedNeuron.copy(n.currPos);
        _projectedNeuron.applyMatrix4(ringGroup.matrixWorld);
        _projectedNeuron.project(camera);

        _screenNeuron.set(_projectedNeuron.x, _projectedNeuron.y);
        const screenDist = _screenNeuron.distanceTo(_mouseVec);

        // Localized pointer illumination
        let targetIllum = 0;
        if (mouse.isHovered && screenDist < 0.65) {
          targetIllum = Math.pow(1 - screenDist / 0.65, 1.8);
        }

        // Smooth illumination transition
        n.illumination += (targetIllum - n.illumination) * 0.12;

        // Dynamic pulse brightness
        const pulse = Math.sin(elapsed * n.pulseSpeed + n.pulsePhase) * 0.2 + 0.8;
        const totalBrightness = Math.min(1.0, pulse * 0.8 + n.illumination * 0.6);

        // Interpolate color from muted violet-lavender to luminous white
        const cr = THREE.MathUtils.lerp(baseR * totalBrightness, highR, n.illumination);
        const cg = THREE.MathUtils.lerp(baseG * totalBrightness, highG, n.illumination);
        const cb = THREE.MathUtils.lerp(baseB * totalBrightness, highB, n.illumination);

        colorAttr.setXYZ(i, cr, cg, cb);

        // Dynamic size: grows when pointer approaches
        const sizeVal = n.baseSize * (1 + n.illumination * 0.85);
        sizeAttr.setX(i, sizeVal);
      }

      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;

      // Update Axon Fibers: positions and illumination
      const axonPosAttr = axonGeometry.attributes.position as THREE.BufferAttribute;
      const axonColorAttr = axonGeometry.attributes.color as THREE.BufferAttribute;

      for (let k = 0; k < axonConnections.length; k++) {
        const conn = axonConnections[k];
        const nFrom = neurons[conn.fromIndex];
        const nTo = neurons[conn.toIndex];

        const idx = k * 2;
        // Positions
        axonPosAttr.setXYZ(idx, nFrom.currPos.x, nFrom.currPos.y, nFrom.currPos.z);
        axonPosAttr.setXYZ(idx + 1, nTo.currPos.x, nTo.currPos.y, nTo.currPos.z);

        // Average illumination from connected neurons
        const avgIllum = (nFrom.illumination + nTo.illumination) * 0.5;
        const targetAlpha = Math.min(0.85, conn.baseAlpha + avgIllum * 0.6);
        conn.currentAlpha += (targetAlpha - conn.currentAlpha) * 0.1;

        // Line color
        const lr = THREE.MathUtils.lerp(0.55, 0.85, avgIllum);
        const lg = THREE.MathUtils.lerp(0.48, 0.82, avgIllum);
        const lb = THREE.MathUtils.lerp(0.84, 0.98, avgIllum);

        axonColorAttr.setXYZW(idx, lr, lg, lb, conn.currentAlpha);
        axonColorAttr.setXYZW(idx + 1, lr, lg, lb, conn.currentAlpha);
      }

      axonPosAttr.needsUpdate = true;
      axonColorAttr.needsUpdate = true;

      // Update Action Potential Pulses
      const sigPosAttr = signalGeometry.attributes.position as THREE.BufferAttribute;

      for (let s = 0; s < signals.length; s++) {
        const sig = signals[s];
        if (!prefersReducedMotion) {
          sig.progress += delta * sig.speed;
        }

        if (sig.progress >= 1) {
          sig.progress = 0;
          // Jump to a new random axon connection
          sig.connectionIndex = Math.floor(Math.random() * axonConnections.length);
        }

        const conn = axonConnections[sig.connectionIndex];
        if (conn) {
          const n1 = sig.direction === 1 ? neurons[conn.fromIndex] : neurons[conn.toIndex];
          const n2 = sig.direction === 1 ? neurons[conn.toIndex] : neurons[conn.fromIndex];

          const px = THREE.MathUtils.lerp(n1.currPos.x, n2.currPos.x, sig.progress);
          const py = THREE.MathUtils.lerp(n1.currPos.y, n2.currPos.y, sig.progress);
          const pz = THREE.MathUtils.lerp(n1.currPos.z, n2.currPos.z, sig.progress);

          sigPosAttr.setXYZ(s, px, py, pz);
        }
      }
      sigPosAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseleave', handlePointerLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handlePointerLeave);
      window.removeEventListener('resize', handleResize);

      // Clean Three.js resources
      neuronGeometry.dispose();
      neuronShaderMaterial.dispose();
      axonGeometry.dispose();
      axonMaterial.dispose();
      signalGeometry.dispose();
      signalMaterial.dispose();
      neuronTexture.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[420px] pointer-events-auto select-none cursor-grab active:cursor-grabbing ${className}`}
      aria-label="Interactive 3D neural network orbital ring visualization"
    >
      {!webGlSupported && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div className="rounded-xl border border-[#8B78D6]/30 bg-white/80 p-6 backdrop-blur-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F1EDFF] text-[#6552A3]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                <path d="M12 7v5l3 3" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#272438]">Neural Network Model Visualization</p>
            <p className="text-xs text-[#777387] mt-1">WebGL is disabled or unsupported in this browser environment.</p>
          </div>
        </div>
      )}
    </div>
  );
};
