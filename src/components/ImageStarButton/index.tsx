import icons from "configs/icons";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

interface ImageStarSelectedProps {
  selectedStar: number;
  setSelectedStar: any;
  form: { review: string; star: number; attachs: string[] };
}

const ImageStarSelected = ({
  selectedStar,
  setSelectedStar,
  form,
}: ImageStarSelectedProps) => {
  const renderStarSelected = () => {
    const component = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= selectedStar) {
        component.push(
          <TouchableOpacity
            key={i}
            onPress={() => setSelectedStar({ ...form, star: i })}
          >
            <Image
              source={icons.starBigSelect}
              style={{ height: 50, width: 50 }}
              resizeMode="contain"
            />
          </TouchableOpacity>,
        );
      } else {
        component.push(
          <TouchableOpacity
            key={i}
            onPress={() => setSelectedStar({ ...form, star: i })}
          >
            <Image
              source={icons.starBig}
              style={{ height: 50, width: 50 }}
              resizeMode="contain"
            />
          </TouchableOpacity>,
        );
      }
    }
    return component;
  };
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {renderStarSelected()}
    </View>
  );
};

export default ImageStarSelected;
