import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const DRAG_PLANE_Z = 2;
export function DraggableLight() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [dragging, setDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const { camera, raycaster, pointer } = useThree();

  const plane = useRef(
    new THREE.Plane(new THREE.Vector3(0, 0, 1), -DRAG_PLANE_Z),
  );
  const intersection = useRef(new THREE.Vector3());

  useEffect(() => {
    const timeout = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDragging(true);
    setShowHint(false);
    document.body.style.touchAction = "none"
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setDragging(false);
    document.body.style.touchAction = ""
  };

  useFrame(() => {
    if (!dragging || !meshRef.current) return;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.ray.intersectPlane(
      plane.current,
      intersection.current,
    );
    if (hit) {
      meshRef.current.position.set(hit.x, hit.y, DRAG_PLANE_Z);
    }
  });

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 3) * 0.08;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, DRAG_PLANE_Z]}
      onPointerOver={() => (document.body.style.cursor = "grab")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
      onPointerDown={(e) => { handlePointerDown(e); document.body.style.cursor = "grabbing"; }}
      onPointerUp={(e) => { handlePointerUp(e); document.body.style.cursor = "grab"; }}
    >
      <sphereGeometry args={[0.05, 32, 32]} />
      <meshBasicMaterial color="#ffffff" />
      <pointLight
        intensity={0.5}
        distance={5}
        decay={2.5}
        color="#ffffff"
        castShadow
      />

      {showHint && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="bg-black/70 text-white text-sm px-3 py-1.5 rounded-full whitespace-nowrap animate-pulse">
            Drag to light the statue
          </div>
        </Html>
      )}
    </mesh>
  );
}