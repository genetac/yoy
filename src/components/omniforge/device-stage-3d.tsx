"use client";

/* ════════════════════════════════════════════════════════════════════
   DeviceStage3D (build plan v3 · P4/T2) — the single flagship 3D
   moment: a laptop + phone on a studio stage, the live preview
   rendered ON the laptop screen via drei <Html transform occlude>
   (the preview stays interactive at native DOM speed).

   • Desktop-only, Live Preview tab only, lazy chunk (this module is
     dynamically imported with ssr:false by PresentationStudio).
   • Drag-rotate ±25° yaw / ±10° pitch with damping; idle drift ±3°
     over 8s; double-click resets.
   • Fallbacks (mobile, reduced motion, <4 cores, no WebGL, or frame
     time > 20ms for 2s) keep the current 2-D viewport.
   ════════════════════════════════════════════════════════════════════ */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ── Capability gate (falls back to the 2-D viewport) ─────────────── */

export function deviceStageSupported(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false; /* touch */
  if ((navigator.hardwareConcurrency ?? 8) < 4) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

/* ── Stage ─────────────────────────────────────────────────────────── */

export function DeviceStage3D({ children, height = 420 }: { children: React.ReactNode; height?: number }) {
  const [quality, setQuality] = useState<"3d" | "fps-fallback">("3d");
  const group = useRef<THREE.Group>(null);

  /* Drag-rotate with damping + idle drift, DOM-level pointer handling */
  const drag = useRef({ yaw: -0.32, pitch: -0.12, targetYaw: -0.32, targetPitch: -0.12, dragging: false, lx: 0, ly: 0 });

  useEffect(() => {
    const el = document.getElementById("device-stage-canvas");
    if (!el) return;
    const onDown = (e: PointerEvent) => {
      drag.current.dragging = true;
      drag.current.lx = e.clientX;
      drag.current.ly = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current.dragging) return;
      const dx = e.clientX - drag.current.lx;
      const dy = e.clientY - drag.current.ly;
      drag.current.lx = e.clientX;
      drag.current.ly = e.clientY;
      drag.current.targetYaw = THREE.MathUtils.clamp(drag.current.targetYaw + dx * 0.005, -0.45, 0.45);
      drag.current.targetPitch = THREE.MathUtils.clamp(drag.current.targetPitch + dy * 0.003, -0.22, 0.14);
    };
    const onUp = () => { drag.current.dragging = false; };
    const onDbl = () => {
      drag.current.targetYaw = -0.32;
      drag.current.targetPitch = -0.12;
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("dblclick", onDbl);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("dblclick", onDbl);
    };
  }, []);

  return (
    <div
      id="device-stage-canvas"
      className="relative touch-none select-none rounded-2xl border border-border bg-gradient-to-b from-muted/60 to-muted/20"
      style={{ height }}
      role="img"
      aria-label="3-D device stage — drag to rotate, double-click to reset"
    >
      <Canvas
        dpr={[1, 1.75]}
        frameloop="always"
        camera={{ position: [0, 0.35, 3.6], fov: 34 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          /* Frame-time monitor: > 20ms average for 2s → drop to 2-D */
          let slow = 0;
          let last = performance.now();
          gl.setAnimationLoop(() => {
            const now = performance.now();
            const dt = now - last;
            last = now;
            if (dt > 20) slow += dt; else slow = Math.max(0, slow - dt * 0.5);
            if (slow > 2000) {
              setQuality("fps-fallback");
              gl.setAnimationLoop(null);
            }
          });
        }}
      >
        <group ref={group}>
          <StageRig drag={drag as React.RefObject<{ yaw: number; pitch: number; targetYaw: number; targetPitch: number; dragging: boolean; lx: number; ly: number } | null>}>
            <Laptop screen={children} />
            <Phone />
          </StageRig>
        </group>
        <ContactShadows position={[0, -0.72, 0]} opacity={0.42} scale={6} blur={2.6} far={2.2} color="#1c1917" />
        <Environment preset="studio" />
        <ambientLight intensity={0.25} />
        <directionalLight position={[2.4, 3.2, 2.6]} intensity={1.05} />
        <directionalLight position={[-3, 1.4, -2.2]} intensity={0.5} color="#dbeafe" />
      </Canvas>

      {/* FPS fallback = the 2-D viewport, unchanged */}
      {quality === "fps-fallback" && (
        <div className="absolute inset-0 overflow-auto rounded-2xl bg-background">{children}</div>
      )}

      <p className="pointer-events-none absolute bottom-2.5 right-3.5 font-mono-forge text-[9px] uppercase tracking-[0.14em] text-muted-foreground/70">
        drag to rotate · double-click to reset
      </p>
    </div>
  );
}

/* Group rotation: damped follow + idle drift when not dragging */
type DragState = { yaw: number; pitch: number; targetYaw: number; targetPitch: number; dragging: boolean; lx: number; ly: number };
function StageRig({ drag, children }: { drag: React.RefObject<DragState | null>; children: React.ReactNode }) {
  const grp = useRef<THREE.Group>(null);
  useFrame((state) => {
    const d = drag.current;
    const g = grp.current;
    if (!d || !g) return;
    if (!d.dragging) {
      /* idle drift: 3 deg over 8s — mutable rAF state, never rendered by React */
      // eslint-disable-next-line react-hooks/immutability
      d.targetYaw += Math.sin(((state.clock.elapsedTime % 8) / 8) * Math.PI * 2) * 0.0009;
    }
    d.yaw += (d.targetYaw - d.yaw) * 0.08;
    d.pitch += (d.targetPitch - d.pitch) * 0.08;
    g.rotation.y = d.yaw;
    g.rotation.x = d.pitch;
  });
  return <group ref={grp}>{children}</group>;
}

/* ── Laptop: ~6k tris from primitives (no GLB payload) ────────────── */

function Laptop({ screen }: { screen: React.ReactNode }) {
  return (
    <group position={[0, -0.1, 0]}>
      {/* Base */}
      <RoundedBox args={[2.5, 0.09, 1.7]} radius={0.03} smoothness={3} position={[0, -0.62, 0.1]}>
        <meshPhysicalMaterial color="#2a2723" metalness={0.55} roughness={0.42} clearcoat={0.4} clearcoatRoughness={0.5} />
      </RoundedBox>
      {/* Keyboard hint */}
      <RoundedBox args={[2.05, 0.012, 0.85]} radius={0.005} position={[0, -0.57, 0.18]}>
        <meshStandardMaterial color="#1c1a17" roughness={0.7} />
      </RoundedBox>
      {/* Screen shell */}
      <group position={[0, -0.58, -0.72]} rotation={[-0.42, 0, 0]}>
        <RoundedBox args={[2.5, 1.66, 0.07]} radius={0.03} smoothness={3}>
          <meshPhysicalMaterial color="#232019" metalness={0.5} roughness={0.4} clearcoat={0.5} />
        </RoundedBox>
        {/* Bezel */}
        <mesh position={[0, 0, 0.041]}>
          <planeGeometry args={[2.34, 1.52]} />
          <meshStandardMaterial color="#0c0b09" roughness={0.9} />
        </mesh>
        {/* The live screen — interactive DOM via drei Html transform */}
        <Html
          transform
          occlude
          position={[0, 0, 0.045]}
          scale={0.235}
          distanceFactor={1.6}
          style={{ width: 1280, height: 800, pointerEvents: "auto" }}
        >
          <div className="h-full w-full overflow-hidden bg-white" style={{ width: 1280, height: 800 }}>
            <div className="h-full w-full overflow-hidden" style={{ transform: "scale(1)", transformOrigin: "top left" }}>
              {screen}
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

/* ── Phone: ~3k tris ───────────────────────────────────────────────── */

function Phone() {
  const grp = useRef<THREE.Group>(null);
  useFrame((state) => {
    /* gentle float so the stage feels alive at idle */
    if (grp.current) grp.current.position.y = 0.02 + Math.sin(state.clock.elapsedTime * 0.8) * 0.012;
  });
  return (
    <group ref={grp} position={[1.62, 0.02, 0.42]} rotation={[0, -0.5, 0]}>
      <RoundedBox args={[0.44, 0.9, 0.05]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial color="#26231e" metalness={0.6} roughness={0.35} clearcoat={0.5} />
      </RoundedBox>
      <mesh position={[0, 0, 0.027]}>
        <planeGeometry args={[0.38, 0.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.25} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.40, 0.027]}>
        <circleGeometry args={[0.018, 16]} />
        <meshStandardMaterial color="#020409" roughness={0.4} />
      </mesh>
    </group>
  );
}
