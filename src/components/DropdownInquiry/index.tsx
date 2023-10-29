import Button from "components/Button";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import type { ProductInquiry } from "types/ProductTypes";
import NavigationService from "utils/NavigationService";
import { scaledVertical, scaledHorizontal } from "utils/ScaledService";
import { convertDateTime } from "utils/Utils";

interface DropdownInquiryProps {
  // withButton?: boolean;
  // onDelete?: () => void;
  // onCorrection?: () => void;
  //withCommentText?: boolean;
  item: ProductInquiry;
  onDeleteInquiry: (args1: string) => void;
}

const DropdownInquiry = ({ item, onDeleteInquiry }: DropdownInquiryProps) => {
  return (
    <View style={{ paddingVertical: scaledVertical(25) }}>
      <Text size={13} style={{ lineHeight: 18 }}>
        {item?.question}
      </Text>
      <Space height={20} />
      {item?.answeredAt || item?.answer ? (
        <View
          style={{
            backgroundColor: colors.flashWhite,
            paddingHorizontal: scaledHorizontal(20),
            paddingVertical: scaledVertical(25),
          }}
        >
          <Text size={13} type="bold" style={{ lineHeight: 16.5 }}>
            관리자 ({convertDateTime(item?.answeredAt)})
          </Text>
          <Space height={5} />
          <Text size={13} style={{ lineHeight: 18 }}>
            {item?.answer}
          </Text>
        </View>
      ) : null}

      {item.status === "PENDING" && item.isMine ? (
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginTop: scaledVertical(25),
          }}
        >
          <Button
            onPress={() => onDeleteInquiry(item?.id)}
            title="삭제"
            textStyle={{ fontSize: 12, color: colors.black }}
            style={{
              backgroundColor: colors.white,
              flex: 1,
              paddingVertical: scaledVertical(18),
              borderRadius: 2,
              marginRight: 5,
              borderWidth: 1,
              borderColor: colors.gainsboro,
            }}
          />
          <Button
            onPress={() =>
              NavigationService.navigate("ProductInquiryScreen", {
                productGroupId: item?.productGroup?.id,
                productInquiry: item,
                mode: "write",
              })
            }
            title="수정"
            textStyle={{ color: colors.black, fontSize: 12 }}
            style={{
              backgroundColor: colors.mediumChampagne,
              flex: 1,
              paddingVertical: scaledVertical(18),
              borderRadius: 2,
              marginLeft: 5,
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default DropdownInquiry;
