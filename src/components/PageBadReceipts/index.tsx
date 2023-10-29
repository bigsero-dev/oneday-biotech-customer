import Button from "components/Button";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import type { ProductOrderDefectType } from "types/OrderTypes";
import { scaledVertical, scaledHorizontal } from "utils/ScaledService";
import { convertDate } from "utils/Utils";

interface BadReceiptsProps {
  isEmpty?: boolean;
  data?: ProductOrderDefectType | any;
}

const PageBadReceipts = ({ isEmpty, data }: BadReceiptsProps) => {
  return (
    <View
      style={{
        minHeight: scaledVertical(320),
        paddingHorizontal: scaledHorizontal(15),
        paddingTop: scaledVertical(30),
        paddingBottom: scaledVertical(30),
      }}
    >
      <Button
        title="불량접수 신청"
        textStyle={{ fontSize: 13, fontWeight: "700", color: colors.black }}
        style={{
          backgroundColor: colors.mediumChampagne,
          paddingVertical: scaledVertical(20),
          borderRadius: 0,
        }}
      />
      <Space height={10} />
      {isEmpty ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: scaledVertical(70),
          }}
        >
          <Text size={13} color={colors.spanishGray}>
            등록된 내역이 없습니다.
          </Text>
        </View>
      ) : (
        <View
          style={{
            paddingHorizontal: scaledHorizontal(20),
            paddingTop: scaledVertical(25),
            paddingBottom: scaledVertical(25),
            borderWidth: 0.5,
            borderColor: colors.gainsboro,
          }}
        >
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",
              gap: 5,
            }}
          >
            <Text size={13} style={{ fontWeight: "900" }}>
              {convertDate(data?.createdAt)}
            </Text>
            <View
              style={{
                height: "70%",
                backgroundColor: colors.black,
                width: 1,
              }}
            />
            <Text size={13} style={{ fontWeight: "900" }}>
              총 접수 수량 : {data?.qnt}개
            </Text>
          </View>

          <Space height={10} />
          <Text numberOfLines={1} size={13} style={{ lineHeight: 18 }}>
            카테고리 : {data?.product?.productGroup?.productGroupCategory?.name}
          </Text>

          <Space height={3} />
          <Text numberOfLines={2} size={14} style={{ lineHeight: 18 }}>
            {data?.product?.name}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PageBadReceipts;
