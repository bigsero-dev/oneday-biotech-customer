import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

const PointText = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: scaledHorizontal(25),
        alignItems: "center",
        paddingVertical: scaledVertical(25),
        borderTopWidth: 1,
        borderTopColor: colors.brightGray,
        borderBottomWidth: 1,
        borderBottomColor: colors.brightGray,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text size={14} lineHeight={20}>
          포인트 사용 (상품 결제)
        </Text>
        <Space height={3} />
        <Text size={12} color={colors.spanishGray}>
          2021.07.20 11:20:22
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          textAlign="right"
          color={colors.carBlue}
          style={{ fontWeight: "900" }}
        >
          -999,999,999
        </Text>
      </View>
    </View>
  );
};

export default PointText;
