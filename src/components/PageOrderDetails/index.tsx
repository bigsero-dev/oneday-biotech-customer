import ProductPayment from "components/ProductPayment";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import type { ProductOrderType } from "types/OrderTypes";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { convertDate } from "utils/Utils";

type PageOrderDetails = {
  isEmpty?: boolean;
  data: ProductOrderType | any;
};

const PageOrderDetails = ({ isEmpty, data }: PageOrderDetails) => {
  return (
    <View style={{ minHeight: scaledVertical(320) }}>
      <Space height={20} />
      {isEmpty ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: scaledVertical(90),
          }}
        >
          <Text size={13} color={colors.spanishGray}>
            주문된 내역이 없습니다.
          </Text>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: scaledHorizontal(15),
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
              결제완료
            </Text>
          </View>

          <ProductPayment
            productGroupCategoryName={
              data?.product?.productGroup?.productGroupCategory?.name
            }
            productName={data?.product?.name}
            qnt={data?.qnt}
            price={data?.product?.price * data?.qnt}
          />
          <Space height={20} />
        </>
      )}
    </View>
  );
};

export default PageOrderDetails;
