import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import { scaledVertical } from "utils/ScaledService";

const EmptyInquiry = () => {
  return (
    <View
      style={{
        marginTop: scaledVertical(30),
        width: "100%",
        backgroundColor: colors.brightGray,
        height: scaledVertical(200),
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
        등록된 문의가 없습니다.
      </Text>
    </View>
  );
};

export default EmptyInquiry;
