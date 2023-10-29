import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import { scaledVertical, scaledHorizontal } from "utils/ScaledService";

interface TwoTableProps {
  index: number;
  title: string;
  value: string;
  numberOfLine?: number;
  textAlign?: "left" | "center" | "right";
}

const TwoTable = ({
  index,
  title,
  value,
  numberOfLine,
  textAlign,
}: TwoTableProps) => {
  return (
    <View style={{ flexDirection: "row" }} key={index}>
      <View
        style={{
          flex: 0.4,
          backgroundColor: colors.flashWhite,
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: colors.gainsboro,
          paddingVertical: scaledVertical(15),
          justifyContent: textAlign !== "center" ? "center" : "flex-start",
        }}
      >
        <Text
          textAlign={textAlign || "center"}
          size={13}
          style={{
            paddingHorizontal:
              textAlign !== "center" ? scaledHorizontal(15) : 0,
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 0.6,
          paddingVertical: scaledVertical(15),
          borderStyle: "solid",
          borderLeftWidth: 0,
          borderWidth: 1,
          borderColor: colors.gainsboro,
          paddingHorizontal: scaledHorizontal(10),
        }}
      >
        <Text size={13} textAlign="left" numberOfLines={numberOfLine || 1}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default TwoTable;
