import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import {
  scaledVertical,
  scaledHorizontal,
  widthPercentage,
} from "utils/ScaledService";

interface OptionsProps {
  carouselRef: ICarouselInstance | any;
  currentIndex: number;
  isBest?: boolean;
  isNew?: boolean;
  customOption?: boolean;
  images: string[];
}

const Options = ({
  carouselRef,
  currentIndex,
  isBest,
  customOption,
  images,
  isNew,
}: OptionsProps) => {
  const placeholder = images?.length > 0 ? images?.length : 1;
  return (
    <>
      {isBest ? (
        <View
          style={{
            top: scaledVertical(0),
            left: scaledHorizontal(25),
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: colors.carBlue,
            padding: 1,
            width: widthPercentage(12),
            paddingVertical: scaledVertical(3),
          }}
        >
          <Text size={16} color={colors.white} textAlign="center">
            Best
          </Text>
        </View>
      ) : null}

      {isNew ? (
        <View
          style={{
            top: scaledVertical(0),
            left: scaledHorizontal(25),
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: colors.carBlue,
            padding: 1,
            width: widthPercentage(12),
            paddingVertical: scaledVertical(3),
          }}
        >
          <Text size={16} color={colors.white} textAlign="center">
            Best
          </Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={{
          top: scaledVertical(172),
          position: "absolute",
          left: customOption ? scaledHorizontal(20) : scaledHorizontal(30),
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
            tintColor: colors.black,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          top: scaledVertical(172),
          right: customOption ? scaledHorizontal(20) : scaledHorizontal(30),
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
            tintColor: colors.black,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          top: scaledVertical(320),
          right: customOption ? scaledHorizontal(40) : scaledHorizontal(30),
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
