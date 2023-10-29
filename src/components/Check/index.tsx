import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import type { ViewStyle } from "react-native";
import { TouchableOpacity, Image } from "react-native";
import { scaledHorizontal } from "utils/ScaledService";

interface CheckProps {
  state: boolean;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
}

const Check = ({ style, state = false, onPress }: CheckProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          backgroundColor: state ? colors.mediumChampagne : "none",
          borderRadius: 8,
          height: 16,
          width: 16,
          alignItems: "center",
          justifyContent: "center",
          marginRight: scaledHorizontal(4),
        },
      ]}
    >
      {state && (
        <Image
          source={icons.check}
          resizeMode="contain"
          style={{
            height: 10,
            width: 10,
            tintColor: state ? colors.black : colors.spanishGray,
          }}
        />
      )}

    </TouchableOpacity>
  );
};

export default Check;
