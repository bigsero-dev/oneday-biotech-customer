import Text from "components/Text";
import TickBox from "components/TickBox";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { convertPrice } from "utils/Utils";

interface BodyTableProps {
  index: number;
  name: string;
  price: number;
  onPress: () => void;
  checked: boolean;
}

const BodyTable = ({
  index,
  name,
  price,
  onPress,
  checked,
}: BodyTableProps) => {
  return (
    <View style={{ flexDirection: "row" }} key={index}>
      <View
        style={{
          flex: 0.15,
          backgroundColor: colors.white,
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
        <TickBox isSelected={checked} onSelected={onPress} />
      </View>
      <View
        style={{
          flex: 0.55,
          backgroundColor: colors.white,
          paddingVertical: scaledVertical(15),

          borderWidth: 1,
          borderColor: colors.gainsboro,
        }}
      >
        <Text
          size={13}
          textAlign="center"
          numberOfLines={1}
          style={{ paddingHorizontal: scaledHorizontal(2) }}
        >
          {name}
        </Text>
      </View>
      <View
        style={{
          flex: 0.3,
          backgroundColor: colors.white,
          paddingVertical: scaledVertical(15),
          borderRightColor: colors.gainsboro,
          borderRightWidth: 1,
          borderTopColor: colors.gainsboro,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderBottomColor: colors.gainsboro,
        }}
      >
        <Text size={13} textAlign="center" numberOfLines={1}>
          {convertPrice(price)}
        </Text>
      </View>
    </View>
  );
};

export default BodyTable;
