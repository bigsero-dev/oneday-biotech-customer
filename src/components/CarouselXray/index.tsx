import colors from "configs/colors";
import React, { useState } from "react";
import {
  View,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import images from "configs/images";

interface CarouselXrayProps {
  carouselRef: ICarouselInstance | any;
  setCurrentIndex: (index: number) => void;
  items: string[];
}

const CarouselXray = ({
  carouselRef,
  setCurrentIndex,
  items,
}: CarouselXrayProps) => {
  const { width, height } = Dimensions.get("window");
  const [isLoading, setIsLoading] = useState(false);
  const placeholder = [images?.placeholderImage];
  return (
    <Carousel
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
      ref={carouselRef}
      loop
      //style={{ marginLeft: scaledHorizontal(-10) }}
      width={width}
      height={height}
      autoPlay={items?.length > 1 ? true : false}
      data={items?.length > 0 ? items : placeholder}
      scrollAnimationDuration={3000}
      onSnapToItem={index => setCurrentIndex(index)}
      renderItem={({ item }) => (
        <View
          style={{
            height: height,
            // backgroundColor: colors.blueBonnet,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <ActivityIndicator
              size={"large"}
              color={colors.darkBlue}
              style={{ display: isLoading ? "flex" : "none" }}
            />
          ) : null}
          <ImageBackground
            onLoadStart={() => {
              setIsLoading(true);
            }}
            progressiveRenderingEnabled
            onLoadEnd={() => {
              setIsLoading(false);
            }}
            source={item}
            // source={{ uri: item }}
            style={{
              height: "100%",
              width: "100%",
              display: isLoading ? "none" : "flex",
            }}
            imageStyle={{
              height: "100%",
              width: "100%",
              resizeMode: "stretch",
            }}
            resizeMode="cover"
          />
        </View>
      )}
    />
  );
};

export default CarouselXray;
