import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

interface PaymentDropdownProps {
  title: string;
  onPress?: () => void;
}

const PaymentDropdown = ({ title, onPress }: PaymentDropdownProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={{
        borderWidth: 1,
        borderColor: colors.gainsboro,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: scaledHorizontal(20),
        alignItems: "center",
        paddingVertical: scaledVertical(20),
      }}
    >
      <Text size={14}>{title}</Text>
      <Image
        source={icons.arrowDown}
        style={{
          height: 12,
          width: 12,
          tintColor: colors.darkBlue,
          opacity: 0.3,
          marginLeft: 5,
          paddingLeft: 10,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default PaymentDropdown;
