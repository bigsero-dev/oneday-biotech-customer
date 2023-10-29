import fonts from "configs/fonts";
import type { ReactNode } from "react";
import React, { memo } from "react";
import type {
  TextStyle,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from "react-native";
import { Text } from "react-native";

interface Props {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number | undefined;
  onPress?: () => void;
  type?: "light" | "reguler" | "bold" | "extrabold";
  color: string;
  size: number;
  opacity: number;
  lineHeight?: number;
  textAlign: "left" | "center" | "right";
  onTextLayout?: (e: NativeSyntheticEvent<TextLayoutEventData>) => void;
}

const Component = ({
  style,
  children,
  numberOfLines,
  onPress,
  type,
  color,
  size,
  opacity,
  lineHeight,
  textAlign,
  onTextLayout,
}: Props) => {
  const _type = () => {
    // if (type === "light") {
    //   return fonts.nanumGothicLight;
    // }
    // if (type === "semibold") {
    //   return fonts.nanumGothicBold;
    // }
    if (type === "bold") {
      return fonts.NanumGothicBold;
    }
    if (type === "extrabold") {
      return fonts.NanumGothicExtraBold;
    }
    return fonts.NanumGothicRegular;
  };

  return (
    <Text
      style={[
        {
          fontFamily: `${_type()}`,
          color,
          fontSize: size,
          opacity,
          lineHeight,
          textAlign,
          letterSpacing: -0.26,
        },
        style,
      ]}
      lineBreakMode="middle"
      numberOfLines={numberOfLines}
      onPress={onPress}
      onTextLayout={onTextLayout}
    >
      {children}
    </Text>
  );
};

Component.defaultProps = {
  type: "reguler",
  color: "#000",
  size: 16,
  opacity: 1,
  textAlign: "left",
};

export default memo(Component);
