import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import { scaledVertical } from "utils/ScaledService";

interface EmptyReviewProps {
  isCustom?: boolean;
  title: string;
}

const EmptyReview = ({ isCustom, title }: EmptyReviewProps) => {
  return (
    <View
      style={{
        //marginTop: scaledVertical(30),
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
        {title}
      </Text>
    </View>
  );
};

export default EmptyReview;
