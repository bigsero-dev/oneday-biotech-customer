import BaseCard from "components/BaseCard";
import HightlightedText from "components/HighlightedText";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

interface CustomerCardProps {
  searchText: string;
}

const CustomerCard = ({ searchText }: CustomerCardProps) => {
  return (
    <BaseCard
      style={{
        backgroundColor: colors.white,
        marginHorizontal: scaledHorizontal(25),
        borderRadius: 2,
        paddingVertical: scaledVertical(25),
        paddingHorizontal: scaledHorizontal(15),
      }}
    >
      <Text style={{ fontWeight: "900" }}>
        <HightlightedText
          text={"영등포 참사랑 약국"}
          search={searchText}
          color={colors.blueBonnet}
        />
      </Text>

      <Space height={3} />
      <Text size={13}>서울 강남구 봉은사로2길 31 W빌딩</Text>
      <Space height={14} />
      <Text size={13} color={colors.spanishGray}>
        010-1111-2222
      </Text>
    </BaseCard>
  );
};

export default CustomerCard;
