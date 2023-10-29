import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { scaledHorizontal } from "utils/ScaledService";

interface SectionProps {
  leftText: string;
  rightText?: string;
  onPressRightText?: () => void;
  textSize?: number;
  arrowDown?: boolean;
  arrowRight?: boolean;
  isBold?: boolean;
  withRadio?: boolean;
  isRadioOn?: boolean;
  isVersion?: boolean;
  textRightSize?: number;
  withLeftTextBlue?: boolean;
  leftTextBlue?: string;
}

const Section = ({
  leftText,
  rightText,
  onPressRightText,
  textSize,
  arrowDown,
  arrowRight,
  isBold = true,
  withRadio,
  isRadioOn,
  isVersion,
  textRightSize = 13,
  withLeftTextBlue,
  leftTextBlue,
}: SectionProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        size={textSize ? textSize : 18}
        type="bold"
        style={{ fontWeight: isBold ? "900" : "normal" }}
      >
        {leftText}
        {"  "}
        {withLeftTextBlue ? (
          <Text
            size={textSize ? textSize : 18}
            type="bold"
            color={colors.brandBlue}
            style={{ fontWeight: isBold ? "900" : "normal" }}
          >
            {leftTextBlue}
          </Text>
        ) : null}
      </Text>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => onPressRightText && onPressRightText()}
      >
        <Text size={textRightSize}>{rightText}</Text>
        {withRadio ? (
          <Image
            source={isRadioOn ? icons.radioOn : icons.radioOff}
            style={{
              height: 21,
              width: 43,

              marginRight: scaledHorizontal(-5),
            }}
            resizeMode="contain"
          />
        ) : null}
        {arrowRight ? (
          <Image
            source={icons.arrowRight}
            style={{
              height: 12,
              width: 12,
              tintColor: colors.graniteGray,
              marginLeft: 5,
            }}
            resizeMode="contain"
          />
        ) : null}

        {!isVersion && rightText && !arrowDown ? (
          <Image
            source={icons.next}
            style={{
              height: 12,
              width: 12,
              tintColor: colors.black,
              marginLeft: 5,
            }}
            resizeMode="contain"
          />
        ) : null}
        {!isVersion && rightText && arrowDown ? (
          <Image
            source={icons.arrowDown}
            style={{
              height: 12,
              width: 12,
              tintColor: colors.black,
              marginLeft: 5,
            }}
            resizeMode="contain"
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default Section;
