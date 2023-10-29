import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import type { ViewStyle } from "react-native";

interface LineProps {
  style?: ViewStyle | ViewStyle[];
}

const Line = ({ style }: LineProps) => {
  const st = style
    ? style
    : {
        //borderWidth: 0.2,
        //borderColor: colors.sonicSilver,
        height: 0.6,
        opacity: 0.3,
        backgroundColor: colors.sonicSilver,
      };
  return <View style={[st]} />;
};

export default Line;
