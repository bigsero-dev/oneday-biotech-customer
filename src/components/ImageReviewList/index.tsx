import Space from "components/Space";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal } from "utils/ScaledService";

interface ImageReviewListProps {
  index: number;
  image: string;
  productReviewId: string;
}

const ImageReviewList = ({
  index,
  image,
  productReviewId,
}: ImageReviewListProps) => {
  return image[0] ? (
    <TouchableOpacity
      onPress={() =>
        NavigationService.navigate("PhotoReviewDetailScreen", {
          id: productReviewId,
          title: "포토 리뷰 상세",
        })
      }
      key={index}
      style={{ width: "23.5%", height: 75, marginRight: scaledHorizontal(5.7) }}
    >
      <Image
        source={{ uri: image[0] }}
        style={{ height: 75, width: "100%", borderRadius: 5 }}
        resizeMode="cover"
      />
      <Space width={5} />
    </TouchableOpacity>
  ) : null;
};

export default ImageReviewList;
