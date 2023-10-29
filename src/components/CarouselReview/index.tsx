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

interface CarouselReviewProps {
  carouselRef: ICarouselInstance | any;
  setCurrentIndex: (index: number) => void;
  items: string[];
}

const CarouselReview = ({
  carouselRef,
  setCurrentIndex,
  items,
}: CarouselReviewProps) => {
  const { width } = Dimensions.get("window");
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
      height={400}
      autoPlay={items?.length > 1 ? true : false}
      data={items?.length > 0 ? items : placeholder}
      scrollAnimationDuration={3000}
      onSnapToItem={index => setCurrentIndex(index)}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
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
              console.log("data 123");
              setIsLoading(true);
            }}
            progressiveRenderingEnabled
            onLoadEnd={() => {
              console.log("data");
              setIsLoading(false);
            }}
            source={{ uri: item }}
            style={{
              height: "100%",
              width: "100%",
              display: isLoading ? "none" : "flex",
            }}
            imageStyle={{ height: "100%", width: "100%" }}
            resizeMode="cover"
          />
        </View>
      )}
    />
  );
};

export default CarouselReview;
