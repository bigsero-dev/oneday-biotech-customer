import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import { scaledVertical } from "utils/ScaledService";

interface EmptyListToothProps {
  isCustom?: boolean;
}

const EmptyListTooth = ({ isCustom }: EmptyListToothProps) => {
  return (
    <View
      style={{
        marginTop: scaledVertical(30),
        width: "100%",
        backgroundColor: colors.brightGray,
        height: isCustom ? scaledVertical(150) : scaledVertical(400),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
      }}
    >
      <Text
        color={colors.spanishGray}
        size={13}
        style={{ letterSpacing: -0.26 }}
      >
        등록된 상품이 없습니다.
      </Text>
    </View>
  );
};

export default EmptyListTooth;
