import Check from "components/Check";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import type { CartTypes } from "types/CartTypes";
import { scaledVertical } from "utils/ScaledService";

interface CartHeaderProps {
  cart: CartTypes[];
  selectAllCartItem: (selected: boolean) => void;
  deleteSelectedCart: () => void;
  onPressUserGuide?: () => void;
}

const CartHeader = ({
  cart,
  selectAllCartItem,
  deleteSelectedCart,
  onPressUserGuide,
}: CartHeaderProps) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: scaledVertical(30),
        }}
      >
        <Check
          state={
            cart?.filter(item => item.isSelectedToCheckout === true).length ===
            cart?.length
          }
          onPress={() =>
            selectAllCartItem(
              !(
                cart?.filter(item => item.isSelectedToCheckout === true)
                  .length === cart?.length
              ),
            )
          }
        />
        <Space width={10} />
        <Text type="bold" size={13}>
          전체선택 (
          {cart?.filter(item => item.isSelectedToCheckout === true).length}/
          {cart?.length})
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: scaledVertical(30),
        }}
      >
        <TouchableOpacity
          onPress={() => onPressUserGuide && onPressUserGuide()}
        >
          <Text color={colors.brandBlue} size={13}>
            이용 가이드
          </Text>
        </TouchableOpacity>
        <Space width={18} />
        <TouchableOpacity onPress={deleteSelectedCart}>
          <Text color={colors.spanishGray} size={13}>
            선택삭제
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartHeader;
