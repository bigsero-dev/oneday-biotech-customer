import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { Image, TouchableOpacity } from "react-native";

interface ArrowSheetProps {
  onPress: () => void;
  type: "up" | "down";
}

const ArrowSheet = ({ onPress, type }: ArrowSheetProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        zIndex: 9999,
        backgroundColor: colors.black,
        opacity: 0.7,
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 33,
        borderColor: colors.sonicSilver,
        borderWidth: 0.1,
        borderTopLeftRadius: 7.5,
        borderTopRightRadius: 7.5,
        alignSelf: "center",

        //bottom: 330,
      }}
    >
      <Image
        source={type === "up" ? icons.arrowUp : icons.arrowDown}
        style={{ width: 18, height: 10 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default ArrowSheet;
