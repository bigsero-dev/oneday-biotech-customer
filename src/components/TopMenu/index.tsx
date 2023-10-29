/* eslint-disable no-nested-ternary */
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { TouchableOpacity } from "react-native";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

interface TopMenuProps {
  title: string;
  index: number;
  onPress?: (index: number) => void;
  selectedIndex: number;
  isCustom?: boolean;
}

const TopMenu = ({
  title,
  index,
  onPress,
  selectedIndex,
  isCustom,
}: TopMenuProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(index)}
      key={index}
      style={{
        borderBottomWidth: selectedIndex === index ? 2 : 0,
        borderBottomColor: colors.black,
        paddingVertical: scaledVertical(20),
        //marginHorizontal: scaledHorizontal(25),
        marginLeft: index === 0 ? scaledHorizontal(25) : scaledHorizontal(47),
        // marginLeft:
        //   index === 0
        //     ? scaledHorizontal(25)
        //     : isCustom
        //     ? scaledHorizontal(50)
        //     : scaledHorizontal(25),
      }}
    >
      <Text
        type="bold"
        size={14}
        color={
          isCustom
            ? index === 0
              ? colors.darkBlue
              : colors.lavenderGray
            : selectedIndex === index
            ? colors.darkBlue
            : colors.lavenderGray
        }
        style={{ fontWeight: "900" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TopMenu;
