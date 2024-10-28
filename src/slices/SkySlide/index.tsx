"use client";
import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Scene from "./Scene";
import { View } from "@react-three/drei";

/**
 * Props for `SkySlide`.
 */
export type SkySlideProps = SliceComponentProps<Content.SkySlideSlice>;

/**
 * Component for "SkySlide" Slices.
 */
const SkySlide = ({ slice }: SkySlideProps): JSX.Element => {
  return (
    <Bounded
      className="skydive h-screen"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className="sr-only">{slice.primary.sentence}</h2>
      <View className="h-screen w-screen">
        <Scene
          flavor={slice.primary.flavor}
          sentence={slice.primary.sentence!}
        />
      </View>
    </Bounded>
  );
};

export default SkySlide;
