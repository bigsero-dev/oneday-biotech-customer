import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import images from "configs/images";
import React from "react";
import { View, Image } from "react-native";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { convertPrice } from "utils/Utils";

interface ProductPaymentProps {
  image?: string;
  productGroupCategoryName?: string;
  productName?: string;
  qnt?: number;
  price?: number;
  withImage?: boolean;
  withPrice?: boolean;
}

const ProductPayment = ({
  image,
  productGroupCategoryName,
  productName,
  qnt,
  price,
  withImage,
  withPrice = true,
}: ProductPaymentProps) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.brightGray,
        marginHorizontal: withImage
          ? scaledHorizontal(25)
          : scaledHorizontal(15),
        marginTop: withImage ? scaledVertical(35) : scaledVertical(20),
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: scaledHorizontal(15),
            paddingVertical: scaledVertical(30),
          }}
        >
          {withImage ? (
            <Image
              source={image ? { uri: image } : images.placeholderImage}
              style={{
                width: 45,
                height: 45,
                borderWidth: 1,
                borderColor: colors.brightGray,
              }}
              resizeMode="contain"
            />
          ) : null}

          <View style={{ paddingLeft: withImage ? scaledHorizontal(15) : 0 }}>
            <Text numberOfLines={1} size={13} style={{ lineHeight: 18 }}>
              카테고리 : {productGroupCategoryName}
            </Text>
            <Space height={2} />
            <Text numberOfLines={2} size={14} style={{ lineHeight: 18 }}>
              {productName}
            </Text>
          </View>
        </View>
        {withPrice ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: scaledHorizontal(15),
              backgroundColor: colors.flashWhite,
              paddingVertical: scaledVertical(25),
            }}
          >
            <Text size={14} style={{ fontWeight: "900" }}>
              주문 수량 : {String(qnt)}개
            </Text>
            <Text size={14} style={{ fontWeight: "900" }}>
              {convertPrice((qnt || 0) * (price || 0))}{" "}
              <Text size={14} style={{ fontWeight: "400" }}>
                원
              </Text>
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default ProductPayment;
