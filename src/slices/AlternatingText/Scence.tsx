"use client";
import React, { useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, useGSAP);

import FloatingCan from "@/components/FloatingCan";
import { Environment } from "@react-three/drei";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Props = {};

export const Scence = (props: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const canRef = useRef<Group>(null);
  const bgColors = ["#ffa6b5", "#e9cff6", "#cbef9a"];
  useGSAP(
    () => {
      if (!canRef.current) return;
      const sections = gsap.utils.toArray(".alternating-section");
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".alternating-text-view",
          endTrigger: ".alternating-text-container",
          pin: true,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      sections.forEach((_, index) => {
        if (!canRef.current) return;
        if (index === 0) return;
        const isOdd = index % 2 !== 0;
        const xPosition = isDesktop ? (isOdd ? -1 : 1) : 0;
        scrollTl
          .to(canRef.current.position, {
            x: xPosition,
            ease: "circ.inOut",
            delay: 0.5,
          })
          .to(
            canRef.current.rotation,
            {
              y: isOdd ? 0.4 : -0.4,
              ease: "back.inOut",
            },
            "<",
          )
          .to(".alternating-text-container", {
            backgroundColor: gsap.utils.wrap(bgColors, index),
          });
      });
    },
    {
      dependencies: [isDesktop],
    },
  );
  return (
    <group
      position-x={isDesktop ? 1 : 0}
      rotation-y={isDesktop ? -0.3 : 0}
      ref={canRef}
    >
      <FloatingCan flavor="strawberryLemonade" />
      <Environment files={"hdr/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
};
