import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { scaledVertical, scaledHorizontal } from "utils/ScaledService";

interface SectionPaymentProps {
  title: string;
  withTotal?: boolean;
  isOpen?: boolean;
  setIsOpen?: () => void;
  onlyTitle?: boolean;
  totalItem?: number;
}

const SectionPayment = ({
  title,
  withTotal,
  isOpen,
  setIsOpen,
  onlyTitle,
  totalItem,
}: SectionPaymentProps) => {
  return (
    <TouchableOpacity
      activeOpacity={onlyTitle ? 1 : 0}
      onPress={setIsOpen}
      style={{
        borderBottomWidth: 1.5,
        borderBottomColor: colors.brightGray,
        paddingVertical: scaledVertical(33),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{ paddingLeft: scaledHorizontal(25), fontWeight: "900" }}
        size={14}
        type="bold"
      >
        {title}
      </Text>
      {onlyTitle ? null : (
        <View
          style={{
            paddingRight: scaledHorizontal(25),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {withTotal ? <Text size={13}>{totalItem}건</Text> : null}

          <Image
            source={isOpen ? icons.arrowUp : icons.arrowDown}
            style={{
              height: 12,
              width: 12,
              tintColor: colors.black,
              marginLeft: 5,
              paddingLeft: 10,
            }}
            resizeMode="contain"
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SectionPayment;
