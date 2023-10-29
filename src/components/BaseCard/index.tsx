import React from "react";
import type { ViewStyle } from "react-native";
import { View } from "react-native";

interface BaseCardProps {
  children: any;
  style?: ViewStyle | ViewStyle[];
}

const BaseCard = (props: BaseCardProps) => {
  return (
    <View
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
    </View>
  );
};

export default BaseCard;
