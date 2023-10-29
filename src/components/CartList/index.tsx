import Check from "components/Check";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { Image, View, TextInput, TouchableOpacity } from "react-native";
import type { CartTypes } from "types/CartTypes";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { convertPrice } from "utils/Utils";

interface CartListProps {
  index: number;
  item: CartTypes;
  changeQuantity: (qnt: string, id: string) => void;
  deleteCartItem: (id: string) => void;
  selectCartItem: (selected: boolean, id: string) => void;
}

const CartList = ({
  index,
  item,
  changeQuantity,
  deleteCartItem,
  selectCartItem,
}: CartListProps) => {
  const increaseCounter = (id: string) => {
    changeQuantity && changeQuantity(String(item.qnt + 1), id);
  };

  const decreaseCounter = (id: string) => {
    if (item.qnt > 0) {
      item.qnt = item.qnt;
      changeQuantity && changeQuantity(String(item.qnt - 1), id);
    }
  };

  return (
    <View
      key={index}
      style={{
        borderRadius: 2,
        borderWidth: 1,
        borderColor: colors.brightGray,
        padding: 10,
        marginVertical: scaledVertical(20),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={{ flexDirection: "row", flex: 0.87 }}>
          <Check
            state={item?.isSelectedToCheckout}
            onPress={() =>
              selectCartItem(!item?.isSelectedToCheckout, item?.id)
            }
          />
          <Text size={13} numberOfLines={1} style={{ paddingLeft: 5 }}>
            카테고리 : {item?.product?.productGroup?.productGroupCategory?.name}
          </Text>
        </View>
        <TouchableOpacity
          style={{ flex: 0.04 }}
          onPress={() => deleteCartItem(item?.product?.id)}
        >
          <Image
            source={icons.xButton}
            style={{ height: 14, width: 14 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Space height={5} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: 16,
              width: 16,
              marginRight: scaledHorizontal(10),
            }}
          />
          <Text
            size={13}
            style={{
              marginRight: scaledHorizontal(10),
              lineHeight: 18,
            }}
          >
            {item?.product?.name}
          </Text>
        </View>
        <View style={{ marginLeft: 10, height: 14, width: 14 }} />
      </View>
      <Space height={10} />
      <View
        style={{
          backgroundColor: colors.flashWhite,
          flexDirection: "row",
          flex: 1,
          marginHorizontal: -10,
          marginBottom: -10,
          //paddingVertical: 17,
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            flexDirection: "row",
            marginVertical: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              decreaseCounter(item?.id);
            }}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 17,
              backgroundColor: colors.platinum,
              margin: 3,
            }}
          >
            <Text size={14}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={{
              width: 45,
              //height: scaledVertical(60),
              //height: scaledVertical(59.5),
              height: "85%",
              borderWidth: 1,
              borderColor: colors.chineseSilver,
              alignSelf: "center",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: scaledVertical(10),
              color: colors.black,
            }}
            textAlign="center"
            value={String(item.qnt)}
            keyboardType="number-pad"
            onChangeText={(e: string) => {
              changeQuantity(e, item.id);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              increaseCounter(item?.id);
            }}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 17,
              backgroundColor: colors.platinum,
              margin: 3,
            }}
          >
            <Text size={14}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text type="bold" numberOfLines={1}>
            {convertPrice(item?.product?.price)}
          </Text>
          <Text size={12} style={{ paddingLeft: 2 }} numberOfLines={1}>
            원
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartList;
