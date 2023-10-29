import BaseCard from "components/BaseCard";
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import type { MenuCardHomeType } from "types/AppTypes";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

interface CardHomeProps {
  index: number;
  item: MenuCardHomeType;
}

const CardHome = ({ index, item }: CardHomeProps) => {
  return (
    <BaseCard
      key={index}
      style={{
        width: "48%",
        marginRight: index % 2 === 0 ? scaledHorizontal(15) : 0,
        marginBottom: scaledVertical(20),
        backgroundColor: colors.white,
      }}
    >
      <View
        style={{
          paddingHorizontal: scaledHorizontal(13),
          paddingVertical: scaledVertical(20),
        }}
      >
        <Text size={13}>{item.title}</Text>
        <Text
          size={18}
          type="bold"
          textAlign="right"
          style={{ paddingTop: scaledVertical(8) }}
          numberOfLines={1}
        >
          {item.value}
        </Text>
      </View>
    </BaseCard>
  );
};

export default CardHome;
