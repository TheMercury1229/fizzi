"use client";
import { Environment } from "@react-three/drei";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Group } from "three";

import FloatingCan from "@/components/FloatingCan";
import { useStore } from "@/hooks/useStore";
type Props = {};
gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function Scene({}: Props) {
  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);
  const can1groupRef = useRef<Group>(null);
  const can2groupRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);
  const FLOATSPEED = 1.5;
  const isReady = useStore((state) => state.isReady);

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1groupRef.current ||
      !can2groupRef.current ||
      !groupRef.current
    )
      return;
    isReady();
    gsap.set(can1Ref.current.position, { x: -1.6 });
    gsap.set(can1Ref.current.rotation, { z: -0.5 });

    gsap.set(can2Ref.current.position, { x: 1.6 });
    gsap.set(can2Ref.current.rotation, { z: 0.5 });
    gsap.set(can3Ref.current.position, { y: 5, z: 2 });
    gsap.set(can4Ref.current.position, { x: 2, y: 4, z: 2 });
    gsap.set(can5Ref.current.position, { y: -5 });

    const introTl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "back.out(1.4)",
      },
    });
    if (window.scrollY < 20) {
      introTl
        .from(can1groupRef.current.position, { y: -5, x: 1 }, 0)
        .from(can1groupRef.current.rotation, { z: 3 }, 0)
        .from(can2groupRef.current.position, { y: 5, x: 1 }, 0)
        .from(can2groupRef.current.rotation, { z: 3 }, 0);
    }

    const scrollTl = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });
    scrollTl
      // rotate can group
      .to(groupRef.current.rotation, { y: Math.PI * 2 })
      // Can1-blackcherry
      .to(can1Ref.current.position, { x: -0.2, y: -0.7, z: -2 }, 0)
      .to(can1Ref.current.rotation, { z: 0.3 }, 0)
      //   Can2-lemonlime
      .to(can2Ref.current.position, { x: 1, y: -0.2, z: -1 }, 0)
      .to(can2Ref.current.rotation, { z: 0 }, 0)
      //   Can3-grape
      .to(can3Ref.current.position, { x: -0.3, y: 0.5, z: -1 }, 0)
      .to(can3Ref.current.rotation, { z: -0.1 }, 0)
      //   Can4-strawberry
      .to(can4Ref.current.position, { x: 0, y: -0.3, z: 0.5 }, 0)
      .to(can4Ref.current.rotation, { z: 0.3 }, 0)
      //   Can3-watermelon
      .to(can5Ref.current.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
      .to(can5Ref.current.rotation, { z: -0.25 }, 0)
      .to(
        groupRef.current.position,
        { x: 1, duration: 0.3, ease: "sine.inOut" },
        1.3,
      );
  });
  return (
    <group ref={groupRef}>
      <group ref={can1groupRef}>
        <FloatingCan
          ref={can1Ref}
          floatSpeed={FLOATSPEED}
          flavor="blackCherry"
        />
      </group>
      <group ref={can2groupRef}>
        <FloatingCan ref={can2Ref} floatSpeed={FLOATSPEED} flavor="lemonLime" />
      </group>
      <FloatingCan ref={can3Ref} floatSpeed={FLOATSPEED} flavor="grape" />
      <FloatingCan
        ref={can4Ref}
        floatSpeed={FLOATSPEED}
        flavor="strawberryLemonade"
      />
      <FloatingCan ref={can5Ref} floatSpeed={FLOATSPEED} flavor="watermelon" />
      <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
}
