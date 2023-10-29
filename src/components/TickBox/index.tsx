import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { Image, TouchableOpacity } from "react-native";

interface TickBoxProps {
  isSelected: boolean;
  onSelected?: () => void;
}

const TickBox = ({ isSelected, onSelected }: TickBoxProps) => {
  return (
    <>
      {isSelected ? (
        <TouchableOpacity onPress={() => onSelected && onSelected()}>
          <Image
            source={icons.tickboxSelected}
            style={{ width: 16, height: 16, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => onSelected && onSelected()}
          style={{
            width: 16,
            height: 16,
            backgroundColor: colors.white,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: colors.chineseSilver,
          }}
        />
      )}
    </>
  );
};

export default TickBox;
