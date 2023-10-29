import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import type { BannerTypes } from "types/BannerTypes";
import { scaledVertical, scaledHorizontal } from "utils/ScaledService";

interface OptionsProps {
  carouselRef: ICarouselInstance | any;
  currentIndex: number;
  bannerList: BannerTypes[];
}

const Options = ({ carouselRef, currentIndex, bannerList }: OptionsProps) => {
  const placeholder = bannerList?.length > 0 ? bannerList?.length : 1;
  return (
    <>
      <TouchableOpacity
        style={{
          top: scaledVertical(172),
          position: "absolute",
          left: scaledHorizontal(25),
        }}
        onPress={() => {
          carouselRef.current?.scrollTo({ count: -1, animated: true });
        }}
      >
        <Image
          source={icons.previousIcon}
          style={{
            height: 26,
            width: 14,
            resizeMode: "contain",
            tintColor: colors.white,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          top: scaledVertical(172),
          right: scaledHorizontal(25),
          position: "absolute",
        }}
        onPress={() => {
          carouselRef.current?.scrollTo({ count: 1, animated: true });
        }}
      >
        <Image
          source={icons.nextIcon}
          style={{
            height: 26,
            width: 14,
            resizeMode: "contain",
            tintColor: colors.white,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          top: scaledVertical(320),
          right: scaledHorizontal(50),
          position: "absolute",
          backgroundColor: colors.black,
          flexDirection: "row",
          paddingVertical: scaledVertical(8),
          paddingHorizontal: scaledHorizontal(10),
          borderRadius: 100,
        }}
      >
        <Text color={colors.white} size={11}>
          {currentIndex >= 9 ? "" : "0"}
          {currentIndex + 1} /{" "}
        </Text>
        <Text color={colors.white} size={11} style={{ opacity: 0.7 }}>
          {placeholder >= 9 ? "" : "0"}
          {placeholder}
        </Text>
      </View>
    </>
  );
};

export default Options;
