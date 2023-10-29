/* eslint-disable no-nested-ternary */
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { TouchableOpacity } from "react-native";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

interface EllipsisTextProps {
  id: string;
  text: string;
  index: number;
  onPress?: (id: string, name: string) => void;
  selectedIndex: string;
  customBorder?: string;
}

const EllipsisText = ({
  id,
  text,
  index,
  onPress,
  selectedIndex,
  customBorder,
}: EllipsisTextProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(id, text)}
      key={index}
      style={{
        borderWidth: 1,
        borderColor:
          selectedIndex === id
            ? customBorder
              ? customBorder
              : colors.darkBlue
            : colors.lavenderGray,
        paddingVertical: scaledVertical(10),
        paddingHorizontal: scaledVertical(15),
        borderRadius: 100,
        marginLeft: index === 0 ? scaledHorizontal(20) : scaledHorizontal(10),
      }}
    >
      <Text
        color={
          selectedIndex === id
            ? customBorder
              ? customBorder
              : colors.darkBlue
            : colors.lavenderGray
        }
        size={13}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default EllipsisText;
