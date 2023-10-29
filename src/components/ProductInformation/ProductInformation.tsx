import BaseCard from "components/BaseCard";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import images from "configs/images";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import type { FixtureProductQr } from "types/FixtureTypes";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { convertDate } from "utils/Utils";

interface ProductInformationProps {
  withButton?: boolean;
  onDelete?: () => void;
  onRescan?: () => void;
  dataProduct?: FixtureProductQr;
}

const ProductInformation = ({
  withButton,
  onDelete,
  onRescan,
  dataProduct,
}: ProductInformationProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: scaledHorizontal(25),
      }}
    >
      <View
        style={{
          backgroundColor: dataProduct?.product?.color
            ? dataProduct?.product?.color
            : colors.venetianRed,
          height: "102%",
          width: 18,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
        }}
      />

      <BaseCard
        style={{
          backgroundColor: colors.white,
          flex: 1,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: withButton ? 1 : 0,
            borderBottomColor: colors.flashWhite,
            paddingHorizontal: scaledHorizontal(25),
            paddingVertical: scaledVertical(30),
          }}
        >
          <Image
            source={
              dataProduct?.product?.productGroup?.mainImage
                ? { uri: dataProduct?.product?.productGroup?.mainImage }
                : images.placeholderImage
            }
            style={{
              width: 80,
              height: 80,
              resizeMode: "contain",
              marginRight: scaledHorizontal(20),
            }}
          />
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <Text size={12} color={colors.graniteGray}>
                {dataProduct?.product?.productGroup?.name}
              </Text>
              <Space height={5} />
              <Text
                size={14}
                style={{ fontWeight: "900", letterSpacing: -0.28 }}
                numberOfLines={2}
              >
                {dataProduct?.product?.name}
              </Text>
              <Space height={5} />
            </View>

            <Text size={12} color={colors.darkGray}>
              {dataProduct?.productLotInfo
                ? convertDate(dataProduct?.productLotInfo?.expireDate)
                : "-"}
            </Text>
          </View>
        </View>
        {onDelete && onRescan && withButton ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: scaledVertical(25),
            }}
          >
            <TouchableOpacity
              style={{ alignItems: "center", flex: 1 }}
              onPress={onDelete}
            >
              <Text size={12}>삭제</Text>
            </TouchableOpacity>
            <Text size={12} color={colors.gainsboro}>
              |
            </Text>
            <TouchableOpacity
              style={{ alignItems: "center", flex: 1 }}
              onPress={onRescan}
            >
              <Text size={12}>QR 재스캔</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </BaseCard>
    </View>
  );
};

export default ProductInformation;
