import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import type { MetaTypes } from "types/MetaTypes";
import { scaledVertical, scaledHorizontal } from "utils/ScaledService";

interface PaginationProps {
  currentPage: number;
  metaData: MetaTypes;
  onNext: () => void;
  onPrevious: () => void;
  onPreviousLast: () => void;
  onNextLast: () => void;
  onPressNumber: (val: number) => void;
  type: "right" | "center";
}

const Pagination = ({
  currentPage,
  metaData,
  onNext,
  onPrevious,
  onPreviousLast,
  onNextLast,
  onPressNumber,
  type,
}: PaginationProps) => {
  const renderDataNumber = () => {
    const component = [];
    let idx = 1;
    let index = 1;
    const page = metaData.lastPage - currentPage;

    if (page < 5) {
      for (let a = 1; a <= metaData.lastPage; a++) {
        if (index >= metaData.lastPage - 4) {
          component.push(
            <TouchableOpacity
              onPress={() => {
                onPressNumber(a);
              }}
              key={index}
              style={{
                borderWidth: 0.3,
                borderColor: colors.spanishGray,
                width: scaledVertical(44),
                height: scaledHorizontal(30),
                justifyContent: "center",
                alignItems: "center",
                marginRight: 5,
                backgroundColor:
                  index === currentPage ? colors.darkBlue : colors.white,
              }}
            >
              <Text
                size={12}
                type={index === currentPage ? "bold" : "reguler"}
                color={index === currentPage ? colors.white : colors.black}
              >
                {a}
              </Text>
            </TouchableOpacity>,
          );
        }
        index++;
      }
    } else {
      for (let i = currentPage; i <= metaData.lastPage; i++) {
        if (idx <= 5) {
          component.push(
            <TouchableOpacity
              onPress={() => {
                onPressNumber(i);
              }}
              key={idx}
              style={{
                borderWidth: 0.3,
                borderColor: colors.spanishGray,
                width: scaledVertical(44),
                height: scaledHorizontal(30),
                justifyContent: "center",
                alignItems: "center",
                marginRight: 5,
                backgroundColor: idx === 1 ? colors.darkBlue : colors.white,
              }}
            >
              <Text
                size={12}
                type={idx === 1 ? "bold" : "reguler"}
                color={idx === 1 ? colors.white : colors.black}
              >
                {i}
              </Text>
            </TouchableOpacity>,
          );
        }

        idx++;
      }
    }

    return component;
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: type === "center" ? "center" : "flex-end",
      }}
    >
      <TouchableOpacity
        onPress={onPreviousLast}
        style={{
          borderWidth: 0.3,
          borderColor: colors.spanishGray,
          width: scaledVertical(44),
          height: scaledHorizontal(30),
          justifyContent: "center",
          alignItems: "center",
          marginRight: 5,
        }}
      >
        <Image
          source={icons.doubleLeft}
          style={{ width: 12, height: 12, tintColor: colors.black }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPrevious}
        style={{
          borderWidth: 0.3,
          borderColor: colors.spanishGray,
          width: scaledVertical(44),
          height: scaledHorizontal(30),
          justifyContent: "center",
          alignItems: "center",
          marginRight: 5,
        }}
      >
        <Image
          source={icons.previous}
          style={{ width: 12, height: 12, tintColor: colors.black }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {renderDataNumber()}
      <TouchableOpacity
        onPress={onNext}
        style={{
          borderWidth: 0.3,
          borderColor: colors.spanishGray,
          width: scaledVertical(44),
          height: scaledHorizontal(30),
          justifyContent: "center",
          alignItems: "center",
          marginRight: 5,
        }}
      >
        <Image
          source={icons.next}
          style={{ width: 12, height: 12, tintColor: colors.black }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onNextLast}
        style={{
          borderWidth: 0.3,
          borderColor: colors.spanishGray,
          width: scaledVertical(44),
          height: scaledHorizontal(30),
          justifyContent: "center",
          alignItems: "center",
          marginRight: 5,
        }}
      >
        <Image
          source={icons.doubleRight}
          style={{ width: 12, height: 12, tintColor: colors.black }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
