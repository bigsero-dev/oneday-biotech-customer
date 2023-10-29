import Space from "components/Space";
import Text from "components/Text";
import icons from "configs/icons";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { scaledVertical, scaledHorizontal } from "utils/ScaledService";

interface DropdownReviewProps {
  dataDropdown: { title: string }[];
  selectedDropdown: number;
  setSelectedDropdown: (index: number) => void;
}

const DropdownReview = ({
  dataDropdown,
  selectedDropdown,
  setSelectedDropdown,
}: DropdownReviewProps) => {
  return (
    <View
      style={{
        zIndex: 9999,
        backgroundColor: "white",
        position: "absolute",
        right: 0,
        top: 25,
        width: 130,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        paddingVertical: scaledVertical(25),
        paddingHorizontal: scaledHorizontal(10),
      }}
    >
      {dataDropdown.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedDropdown(index)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom:
                index >= 0 && index !== dataDropdown.length - 1 ? 15 : 0,
            }}
          >
            {index === selectedDropdown ? (
              <Image
                source={icons.check}
                style={{ width: 12, height: 12 }}
                resizeMode="contain"
              />
            ) : (
              <View style={{ height: 12, width: 12 }} />
            )}

            <Space width={15} />
            <Text size={13}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default DropdownReview;
