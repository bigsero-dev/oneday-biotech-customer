import React from "react";
import { View } from "react-native";
import { VerticalList } from "components/List";
import type { OtherVariantType } from "types/ProductTypes";

import HeaderTable from "./HeaderTable";
import BodyTable from "./BodyTable";

interface TableProps {
  variants: OtherVariantType[];
  onPress: (arg: OtherVariantType) => void;
  selectedItem: OtherVariantType[];
  onPressAll: () => void;
}

const Table = ({ variants, onPress, selectedItem, onPressAll }: TableProps) => {
  return (
    <View>
      <HeaderTable
        onPressAll={onPressAll}
        checkedAll={selectedItem?.length === variants?.length}
      />
      <VerticalList
        data={variants}
        renderItem={({
          item,
          index,
        }: {
          item: OtherVariantType;
          index: number;
        }) => {
          return (
            <BodyTable
              index={index}
              name={item?.name}
              price={item?.price}
              onPress={() => onPress(item)}
              checked={selectedItem.some(si => si?.id === item?.id)}
            />
          );
        }}
        isShowVerticalIndicator={false}
      />
    </View>
  );
};

export default Table;
