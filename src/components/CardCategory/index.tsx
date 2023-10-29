import BaseCard from "components/BaseCard";
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import type { CategoryType } from "types/CategoryTypes";
import { scaledVertical, scaledHorizontal } from "utils/ScaledService";

interface CardCategoryProps {
  index: number;
  item: CategoryType;
  onSelectedCategory: (id: string, name: string) => void;
}

const CardCategory = ({
  item,
  index,
  onSelectedCategory,
}: CardCategoryProps) => {
  return (
    <TouchableOpacity
      onPress={() => onSelectedCategory(item.id, item.name)}
      style={{
        width: "48%",
        marginRight: index % 2 === 0 ? scaledHorizontal(15) : 0,
        marginTop: scaledVertical(30),
      }}
    >
      <BaseCard key={index} style={{ backgroundColor: colors.white }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: scaledVertical(20),
            paddingHorizontal: scaledHorizontal(10),
            flex: 1,
          }}
        >
          <Text
            type="bold"
            size={14}
            style={{
              flex: 0.8,
              paddingRight: scaledHorizontal(5),
              paddingLeft: 3,
            }}
            numberOfLines={2}
          >
            {item?.name}
          </Text>
          <Image
            source={{ uri: item?.img }}
            style={{
              width: 40,
              height: 50,
              flex: 0.5,
            }}
            resizeMode="cover"
          />
        </View>
      </BaseCard>
    </TouchableOpacity>
  );
};

export default CardCategory;
