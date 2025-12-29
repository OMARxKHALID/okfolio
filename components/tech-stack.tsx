"use client";

import * as THREE from "three";
import { useRef, useMemo, useState, useEffect, FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

// Constants
const TECH_IMAGES = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];

// Utility functions
const loadTextures = () => {
  const textureLoader = new THREE.TextureLoader();
  return TECH_IMAGES.map((url) => {
    try {
      return textureLoader.load(url);
    } catch (error) {
      console.warn(`Failed to load texture: ${url}`, error);
      // Return a default texture or placeholder
      return textureLoader.load("/images/placeholder.webp");
    }
  });
};

const createSpheres = (count: number) => {
  const scales = [0.9, 1.3, 1.1, 1.3, 1.3];
  return [...Array(count)].map(() => ({
    scale: scales[Math.floor(Math.random() * scales.length)],
  }));
};

// Shared geometries
const sphereGeometry = new THREE.SphereGeometry(1.2, 28, 28);
// Spheres will be created dynamically based on screen size

// Types
interface SphereProps {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
}

interface PointerProps {
  vec?: THREE.Vector3;
  isActive: boolean;
  canvasElement?: HTMLElement | null;
}

// Components
const SphereGeo: FC<SphereProps> = ({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}) => {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;

    const clampedDelta = Math.min(0.1, delta);
    const position = api.current.translation();

    // Only apply impulse if sphere is far from origin
    const distance = Math.sqrt(
      position.x ** 2 + position.y ** 2 + position.z ** 2
    );
    if (distance > 0.1) {
      const impulse = vec
        .copy(position)
        .normalize()
        .multiply(
          new THREE.Vector3(
            -50 * clampedDelta * scale,
            -150 * clampedDelta * scale,
            -50 * clampedDelta * scale
          )
        );

      api.current.applyImpulse(impulse, true);
    }
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
};

const Pointer: FC<PointerProps> = ({
  vec = new THREE.Vector3(),
  isActive,
  canvasElement,
}) => {
  const ref = useRef<RapierRigidBody>(null);
  const mousePos = useRef(new THREE.Vector2(0, 0));
  const isMobile = useRef(false);

  // Track global mouse/touch position
  useEffect(() => {
    if (!isActive || !canvasElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      isMobile.current = false;
      const rect = canvasElement.getBoundingClientRect();
      // Convert to normalized coordinates (-1 to 1) relative to canvas
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mousePos.current.set(x, y);
    };

    const handleTouchMove = (e: TouchEvent) => {
      isMobile.current = true;
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvasElement.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        mousePos.current.set(x, y);
      }
    };

    const handleTouchEnd = () => {
      // Reset to center when touch ends
      mousePos.current.set(0, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isActive, canvasElement]);

  useFrame(({ viewport }) => {
    if (!isActive || !ref.current) return;

    // Convert normalized coordinates to 3D space
    const targetVec = vec.lerp(
      new THREE.Vector3(
        mousePos.current.x * (viewport.width / 2),
        mousePos.current.y * (viewport.height / 2),
        0
      ),
      isMobile.current ? 0.15 : 0.2 // Slower on mobile for better performance
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  // Initialize pointer position
  useEffect(() => {
    if (ref.current && isActive) {
      ref.current.setNextKinematicTranslation(new THREE.Vector3(0, 0, 0));
    }
  }, [isActive]);

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2.5]} />
    </RigidBody>
  );
};

// Scene component
export const TechScene: FC<{
  isActive: boolean;
  canvasElement?: HTMLElement | null;
}> = ({ isActive, canvasElement }) => {
  const textures = useMemo(() => loadTextures(), []);
  const [sphereCount, setSphereCount] = useState(30);

  // Responsive sphere count
  useEffect(() => {
    const updateSphereCount = () => {
      setSphereCount(window.innerWidth < 768 ? 15 : 30);
    };
    updateSphereCount();
    window.addEventListener("resize", updateSphereCount);
    return () => window.removeEventListener("resize", updateSphereCount);
  }, []);

  const spheres = useMemo(() => createSpheres(sphereCount), [sphereCount]);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, [textures]);

  const getRandomMaterial = () => {
    return materials[Math.floor(Math.random() * materials.length)];
  };

  // Adjust camera FOV for mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <ambientLight intensity={1} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color="white"
        castShadow
        shadow-mapSize={isMobile ? [256, 256] : [512, 512]}
      />
      <directionalLight position={[0, 5, -4]} intensity={2} />
      <Physics gravity={[0, 0, 0]}>
        <Pointer isActive={isActive} canvasElement={canvasElement} />
        {spheres.map((props, i) => (
          <SphereGeo
            key={i}
            {...props}
            material={getRandomMaterial()}
            isActive={isActive}
          />
        ))}
      </Physics>
      <Environment
        files="/models/char_enviorment.hdr"
        environmentIntensity={isMobile ? 0.3 : 0.5}
        environmentRotation={[0, 4, 2]}
      />
      <EffectComposer enableNormalPass={false}>
        <N8AO color="#0f002c" aoRadius={2} intensity={isMobile ? 0.8 : 1.15} />
      </EffectComposer>
    </>
  );
};

const TechStack: FC = () => {
  const [isActive, setIsActive] = useState(true); // Start active by default
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use Intersection Observer to detect when component is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Activate when 10% of component is visible
        rootMargin: "0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Also activate on scroll for smooth interaction
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsActive(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="techstack">
      <h2>My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: true, antialias: true }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <TechScene isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default TechStack;
