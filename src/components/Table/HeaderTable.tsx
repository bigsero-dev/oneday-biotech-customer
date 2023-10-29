import Text from "components/Text";
import TickBox from "components/TickBox";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import { scaledVertical } from "utils/ScaledService";

interface HeaderTableProps {
  onPressAll: () => void;
  checkedAll: boolean;
}

const HeaderTable = ({ onPressAll, checkedAll }: HeaderTableProps) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          flex: 0.15,
          backgroundColor: colors.flashWhite,
          paddingVertical: scaledVertical(15),
          alignItems: "center",
          borderLeftColor: colors.gainsboro,
          borderLeftWidth: 1,
          borderTopColor: colors.gainsboro,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderBottomColor: colors.gainsboro,
        }}
      >
        <TickBox isSelected={checkedAll} onSelected={onPressAll} />
      </View>
      <View
        style={{
          flex: 0.55,
          backgroundColor: colors.flashWhite,
          paddingVertical: scaledVertical(15),

          borderWidth: 1,
          borderColor: colors.gainsboro,
        }}
      >
        <Text size={13} type="bold" textAlign="center">
          상품명
        </Text>
      </View>
      <View
        style={{
          flex: 0.3,
          backgroundColor: colors.flashWhite,
          paddingVertical: scaledVertical(15),
          borderRightColor: colors.gainsboro,
          borderRightWidth: 1,
          borderTopColor: colors.gainsboro,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderBottomColor: colors.gainsboro,
        }}
      >
        <Text size={13} type="bold" textAlign="center">
          결제금액
        </Text>
      </View>
    </View>
  );
};

export default HeaderTable;
