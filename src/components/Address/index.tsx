import Check from "components/Check";
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import type { UserAddressType } from "types/UserTypes";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

interface AddressProps {
  item: UserAddressType;
  index: number;
  userSelectedAddress: UserAddressType;
  onChangeAddress: (address: UserAddressType) => void;
}

const Address = ({
  item,
  index,
  userSelectedAddress,
  onChangeAddress,
}: AddressProps) => {
  return (
    <View
      style={{
        marginTop: index > 0 ? scaledVertical(25) : 0,
        marginHorizontal: scaledHorizontal(25),
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gainsboro,
        paddingBottom: scaledVertical(25),
      }}
    >
      <View style={{ alignSelf: "flex-start", marginTop: scaledVertical(4) }}>
        <Check
          state={item?.id === userSelectedAddress?.id ? true : false}
          onPress={() =>
            item?.id === userSelectedAddress?.id ? null : onChangeAddress(item)
          }
        />
      </View>

      <View
        style={{
          flex: 1,
          paddingLeft: scaledHorizontal(15),
          paddingRight: scaledHorizontal(25),
        }}
      >
        <Text lineHeight={19} numberOfLines={1} size={13}>
          배송지{index + 1}
        </Text>
        <Text
          size={13}
          lineHeight={19}
          numberOfLines={1}
          style={{ paddingTop: 10 }}
        >
          ({item?.postalCode})
        </Text>
        <Text
          size={13}
          lineHeight={19}
          numberOfLines={2}
          style={{ paddingTop: 2 }}
        >
          도로명 : {item?.address}
        </Text>
        <Text
          size={13}
          lineHeight={19}
          numberOfLines={2}
          color={colors.darkGray}
          style={{ paddingTop: 2 }}
        >
          지번: {item?.addressDetail}
        </Text>
        <Text
          size={13}
          lineHeight={19}
          numberOfLines={1}
          style={{ paddingTop: 10 }}
        >
          {item?.phone}
        </Text>
      </View>
    </View>
  );
};

export default Address;
