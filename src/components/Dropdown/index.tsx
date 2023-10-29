import Text from "components/Text";
import icons from "configs/icons";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { scaledVertical } from "utils/ScaledService";

interface DropdownProps {
  onPress: () => void;
  isOpen: boolean;
  title: string;
}

const Dropdown = ({ onPress, isOpen, title }: DropdownProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: scaledVertical(25),
        alignItems: "center",
      }}
    >
      <Text size={13}>{title}</Text>
      <Image
        source={isOpen ? icons.up : icons.down}
        style={{ height: 7, width: 12 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default Dropdown;
