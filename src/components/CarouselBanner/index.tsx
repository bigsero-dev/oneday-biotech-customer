import Button from "components/Button";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import images from "configs/images";
import React from "react";
import { View, Dimensions, Image } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import type { BannerTypes } from "types/BannerTypes";
import { scaledVertical, scaledHorizontal } from "utils/ScaledService";

interface CarouselBannerProps {
  carouselRef: ICarouselInstance | any;
  setCurrentIndex: (index: number) => void;
  bannerList: BannerTypes[];
}

const CarouselBanner = ({
  carouselRef,
  setCurrentIndex,
  bannerList,
}: CarouselBannerProps) => {
  const { width } = Dimensions.get("window");
  const placeholder = [images?.placeholderImage];
  return (
    <Carousel
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
      ref={carouselRef}
      loop
      width={width}
      height={215}
      autoPlay={true}
      data={bannerList.length > 0 ? bannerList : placeholder}
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
            source={
              item.imagePC
                ? {
                    uri: item.imagePC,
                  }
                : images.placeholderImage
            }
            style={{ height: 215, width: "100%" }}
            resizeMode="cover"
          />
          <View
            style={{
              top: scaledVertical(90),
              position: "absolute",
              left: scaledHorizontal(80),
              width: "40%",
            }}
          >
            <Text size={8} color={"#cccbcb"}>
              ONEDAYBIOTECH IMPLANT EVENT
            </Text>
            <Space height={10} />
            <Text numberOfLines={3} color={colors.white}>
              {item.title}
            </Text>
            <Space height={20} />
            <Button
              // onPress={() =>
              //   NavigationService.navigate("ProductScreen", {
              //     id: item?.productGroupId,
              //   })
              // }
              title="바로가기"
              type="light"
              style={{
                backgroundColor: "transparent",
                paddingVertical: scaledVertical(10),
                borderColor: colors.mediumChampagne,
                width: "55%",
              }}
              textStyle={{ color: colors.mediumChampagne }}
            />
          </View>
        </View>
      )}
    />
  );
};

export default CarouselBanner;
