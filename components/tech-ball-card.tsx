"use client";

import * as THREE from "three";
import { useRef, useMemo, FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
  CuboidCollider,
} from "@react-three/rapier";

interface TechBallCardProps {
  textureUrl: string;
  width: number;
  height: number;
  isActive?: boolean;
}

// Single sphere component with boundary constraints
const ConstrainedSphere: FC<{
  material: THREE.MeshPhysicalMaterial;
  bounds: { x: number; y: number; z: number };
  isActive: boolean;
}> = ({ material, bounds, isActive }) => {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;

    const position = api.current.translation();
    const clampedDelta = Math.min(0.1, delta);

    // Constrain position within bounds (with margin for the sphere radius)
    const margin = 0.8;
    const clampedX = Math.max(
      -bounds.x + margin,
      Math.min(bounds.x - margin, position.x)
    );
    const clampedY = Math.max(
      -bounds.y + margin,
      Math.min(bounds.y - margin, position.y)
    );
    const clampedZ = Math.max(
      -bounds.z + margin,
      Math.min(bounds.z - margin, position.z)
    );

    // If out of bounds, apply impulse to bring it back
    if (
      Math.abs(position.x - clampedX) > 0.01 ||
      Math.abs(position.y - clampedY) > 0.01 ||
      Math.abs(position.z - clampedZ) > 0.01
    ) {
      const correction = new THREE.Vector3(
        clampedX - position.x,
        clampedY - position.y,
        clampedZ - position.z
      )
        .normalize()
        .multiplyScalar(50 * clampedDelta);
      api.current.applyImpulse(correction, true);
    }
  });

  return (
    <RigidBody
      linearDamping={0.8}
      angularDamping={0.2}
      friction={0.1}
      position={[0, 0, 0]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[0.7]} />
      <mesh
        castShadow
        receiveShadow
        scale={0.7}
        geometry={new THREE.SphereGeometry(1, 32, 32)}
        material={material}
      />
    </RigidBody>
  );
};

// Pointer that follows mouse within bounds
const ConstrainedPointer: FC<{
  bounds: { x: number; y: number; z: number };
  isActive: boolean;
  cardElement: HTMLElement | null;
}> = ({ bounds, isActive, cardElement }) => {
  const ref = useRef<RapierRigidBody>(null);
  const vec = useRef(new THREE.Vector3());

  useFrame(({ pointer, viewport, size }) => {
    if (!isActive || !ref.current || !cardElement) return;

    // Get card's bounding box
    const rect = cardElement.getBoundingClientRect();

    // Check if mouse is over the card
    const mouseX = (pointer.x + 1) * 0.5 * size.width;
    const mouseY = (1 - pointer.y) * 0.5 * size.height;

    const isOverCard =
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom;

    if (!isOverCard) {
      // If mouse is outside, move pointer to center
      const targetVec = vec.current.lerp(new THREE.Vector3(0, 0, 0), 0.1);
      ref.current.setNextKinematicTranslation(targetVec);
      return;
    }

    // Convert mouse position to normalized card coordinates (-1 to 1)
    const normalizedX = ((mouseX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = 1 - ((mouseY - rect.top) / rect.height) * 2;

    // Map to 3D bounds
    const margin = 0.8;
    const targetX = normalizedX * (bounds.x - margin);
    const targetY = normalizedY * (bounds.y - margin);
    const targetZ = 0;

    // Smooth lerp for better interaction
    const targetVec = vec.current.lerp(
      new THREE.Vector3(targetX, targetY, targetZ),
      0.4
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1.5]} />
    </RigidBody>
  );
};

// Scene for a single card
const CardScene: FC<{
  textureUrl: string;
  bounds: { x: number; y: number; z: number };
  isActive: boolean;
  cardElement: HTMLElement | null;
}> = ({ textureUrl, bounds, isActive, cardElement }) => {
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    try {
      return loader.load(textureUrl);
    } catch (error) {
      console.warn(`Failed to load texture: ${textureUrl}`, error);
      return loader.load("/images/placeholder.webp");
    }
  }, [textureUrl]);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: "#ffffff",
        emissiveMap: texture,
        emissiveIntensity: 0.3,
        metalness: 0.5,
        roughness: 1,
        clearcoat: 0.1,
      }),
    [texture]
  );

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} intensity={1.5} />
      <Physics gravity={[0, 0, 0]}>
        <ConstrainedPointer
          bounds={bounds}
          isActive={isActive}
          cardElement={cardElement}
        />
        <ConstrainedSphere
          material={material}
          bounds={bounds}
          isActive={isActive}
        />
        {/* Invisible walls to constrain the ball */}
        <RigidBody type="fixed" position={[0, 0, -bounds.z]}>
          <CuboidCollider args={[bounds.x, bounds.y, 0.1]} />
        </RigidBody>
        <RigidBody type="fixed" position={[0, 0, bounds.z]}>
          <CuboidCollider args={[bounds.x, bounds.y, 0.1]} />
        </RigidBody>
        <RigidBody type="fixed" position={[-bounds.x, 0, 0]}>
          <CuboidCollider args={[0.1, bounds.y, bounds.z]} />
        </RigidBody>
        <RigidBody type="fixed" position={[bounds.x, 0, 0]}>
          <CuboidCollider args={[0.1, bounds.y, bounds.z]} />
        </RigidBody>
        <RigidBody type="fixed" position={[0, -bounds.y, 0]}>
          <CuboidCollider args={[bounds.x, 0.1, bounds.z]} />
        </RigidBody>
        <RigidBody type="fixed" position={[0, bounds.y, 0]}>
          <CuboidCollider args={[bounds.x, 0.1, bounds.z]} />
        </RigidBody>
      </Physics>
      <Environment
        files="/models/char_enviorment.hdr"
        environmentIntensity={0.3}
      />
    </>
  );
};

export const TechBallCard: FC<TechBallCardProps> = ({
  textureUrl,
  width,
  height,
  isActive = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate 3D bounds based on card dimensions
  // Convert pixel dimensions to 3D space (approximate)
  const bounds = useMemo(() => {
    const aspect = width / height;
    const depth = 5; // Fixed depth for Z-axis
    const xBound = Math.min(3.5, (width / 100) * 0.6);
    const yBound = Math.min(3.5, (height / 100) * 0.6);
    return { x: xBound, y: yBound, z: depth };
  }, [width, height]);

  return (
    <div ref={cardRef} className="absolute inset-0 pointer-events-auto z-10">
      <Canvas
        gl={{ alpha: true, stencil: false, depth: true, antialias: true }}
        camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 20 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.2)}
        className="w-full h-full"
      >
        <CardScene
          textureUrl={textureUrl}
          bounds={bounds}
          isActive={isActive}
          cardElement={cardRef.current}
        />
      </Canvas>
    </div>
  );
};
