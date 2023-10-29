import BaseActionSheet from "components/ActionSheet";
import Button from "components/Button";
import Line from "components/Line";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import { Platform, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { CartTypes } from "types/CartTypes";
import { scaledVertical, scaledHorizontal } from "utils/ScaledService";
import { convertPrice } from "utils/Utils";

interface CartActionSheetProps {
  detailPrice: { label: string; price: string }[];
  actionSheetRef: any;
  dataCart: CartTypes[];
  onPressCheckout: () => void;
}

const CartActionSheet = ({
  detailPrice,
  actionSheetRef,

  dataCart,
  onPressCheckout,
}: CartActionSheetProps) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <BaseActionSheet
      actionSheetRef={actionSheetRef}
      onPressHeader={() => {
        SheetManager.hide("base-action");
      }}
      setClose={() => {
        SheetManager.hide("base-action");
      }}
    >
      <View
        style={{
          paddingTop: scaledVertical(20),
          paddingBottom: scaledVertical(-20),
          paddingHorizontal: scaledHorizontal(25),
          zIndex: 9999,

          // height:
          //   Platform.OS === "android"
          //     ? 210 + scaledVertical(130)
          //     : 210 + bottom,
          //flexDirection: "row",
          width: "100%",
          backgroundColor: colors.white,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          elevation: 7,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          marginBottom:
            Platform.OS === "ios" ? -bottom - scaledVertical(20) : 0,
        }}
      >
        <Space height={5} />
        {detailPrice.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: scaledVertical(10),
              }}
            >
              <Text
                size={14}
                style={{ letterSpacing: -0.28 }}
                color={colors.davyGrey}
              >
                {item.label}
              </Text>
              <Text
                size={14}
                style={{ letterSpacing: -0.28, lineHeight: 19 }}
                color={colors.davyGrey}
              >
                {item.price}
              </Text>
            </View>
          );
        })}
        <Space height={5} />
        <Line />
        <Space height={10} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: scaledVertical(10),
          }}
        >
          <Text color={colors.black} type="bold" size={18}>
            총 결제금액
          </Text>

          <Text
            color={colors.cinnabar}
            type="bold"
            size={18}
            style={{ fontWeight: "900" }}
          >
            {String(
              convertPrice(
                dataCart.reduce(
                  (sum, product) =>
                    sum +
                    (product.isSelectedToCheckout === true
                      ? product?.product?.price * product?.qnt +
                        product?.product?.productGroup?.deliveryFee
                      : 0),
                  0,
                ),
              ),
            ) + "원"}
          </Text>
        </View>
        <Space height={10} />
        <Text size={12} color={colors.spanishGray}>
          ※ 주문 상품을 선택 후, 주문서 작성을 눌러주세요.
        </Text>
        <Space height={20} />
        <Button
          onPress={onPressCheckout}
          style={{
            marginHorizontal: scaledHorizontal(-25),
            backgroundColor: colors.mediumChampagne,
            paddingVertical: scaledVertical(30),
            borderRadius: 0,
          }}
          title={"결제하기"}
          textType="bold"
          textStyle={{ color: colors.black, fontWeight: "900" }}
        />
      </View>
    </BaseActionSheet>
  );
};

export default CartActionSheet;
