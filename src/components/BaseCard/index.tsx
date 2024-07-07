import React from "react";
import type { ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native";

interface BaseCardProps {
  children: any;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
}

const BaseCard = (props: BaseCardProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        props.style,
        {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
          //backgroundColor: colors.white,
          //borderRadius: 2,
        },
      ]}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default BaseCard;
