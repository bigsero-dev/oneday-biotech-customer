import React, { memo } from "react";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import color from "configs/colors";
import Text from "components/Text";

import styles from "./ButtonStyles";

interface Props {
  title?: string;
  type: "dark" | "light" | "disabled";
  isLoading: boolean;
  disabled: boolean;
  icon?: any;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  fontSize?: number;
  iconStyle?: ImageStyle | ImageStyle[];
  textStyle?: TextStyle | TextStyle[];
  textType?: "bold" | "reguler" | "light" | "extrabold";
  ButtonChange?: ViewStyle | ViewStyle[];
  numberOfLines?: number;
}

const Component = ({
  ButtonChange,
  title,
  type,
  isLoading,
  icon,
  onPress,
  disabled,
  style,
  fontSize,
  iconStyle,
  textStyle,
  textType,
  numberOfLines,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || isLoading}
      onPress={onPress}
      style={[
        styles.container,
        disabled && { backgroundColor: color.gainsboro },
        // type === "disabled" && { backgroundColor: color.underlay },
        type === "light" && {
          backgroundColor: color.white,
          borderWidth: 1,
          borderColor: color.darkBlue,
        },
        style,
        ButtonChange,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size={30}
          color={type === "light" ? color.darkBlue : color.white}
        />
      ) : (
        <View style={styles.wrapTitle}>
          {icon && (
            <Image
              source={icon}
              style={[
                styles.icon,

                {
                  tintColor: type === "light" ? color.darkBlue : color.white,
                },
                iconStyle,
              ]}
            />
          )}

          <Text
            color={type === "light" ? color.darkBlue : color.white}
            type={textType ? textType : "reguler"}
            size={fontSize || 14}
            style={textStyle}
            numberOfLines={numberOfLines}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

Component.defaultProps = {
  type: "dark",
  isLoading: false,
  disabled: false,
  textType: "bold",
};

export default memo(Component);
