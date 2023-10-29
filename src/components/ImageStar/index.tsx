import icons from "configs/icons";
import React from "react";
import { View, Image } from "react-native";

interface ImageStarProps {
  totalStar: number;
  type: "big" | "tiny";
}

const ImageStar = ({ totalStar, type }: ImageStarProps) => {
  const style =
    type === "big"
      ? {
          height: 17,
          width: 17,
          marginRight: 3,
        }
      : {
          height: 13,
          width: 13,
          marginRight: 3,
        };
  const renderStar = () => {
    const component = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= totalStar) {
        component.push(
          <Image
            key={i}
            source={icons.starSelect}
            style={style}
            resizeMode="contain"
          />,
        );
      } else {
        component.push(
          <Image
            key={i}
            source={icons.star}
            style={style}
            resizeMode="contain"
          />,
        );
      }
    }

    return component;
  };

  return <View style={{ flexDirection: "row" }}>{renderStar()}</View>;
};

export default ImageStar;
