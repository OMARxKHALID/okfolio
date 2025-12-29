"use client";

import { useGLTF, Center } from "@react-three/drei";
import { Group } from "three";

export function TechnicalDifficulties() {
  const { scene } = useGLTF("/models/technical_difficulties.glb") as {
    scene: Group;
  };

  return (
    <Center>
      <primitive object={scene} scale={1} />
    </Center>
  );
}

useGLTF.preload("/models/technical_difficulties.glb");
