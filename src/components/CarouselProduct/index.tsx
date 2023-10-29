import colors from "configs/colors";
import React from "react";
import { View, Dimensions, Image } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import images from "configs/images";

interface CarouselReviewProps {
  carouselRef: ICarouselInstance | any;
  setCurrentIndex: (index: number) => void;
  items: string[];
}

const CarouselProduct = ({
  carouselRef,
  setCurrentIndex,
  items,
}: CarouselReviewProps) => {
  const { width } = Dimensions.get("window");
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
      height={215}
      autoPlay={true}
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
          <Image
            source={{ uri: item }}
            style={{ height: 215, width: 250 }}
            resizeMode="contain"
          />
        </View>
      )}
    />
  );
};

export default CarouselProduct;
