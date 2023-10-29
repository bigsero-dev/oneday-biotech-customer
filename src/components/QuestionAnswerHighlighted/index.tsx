import HightlightedText from "components/HighlightedText";
import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import type { FaqType } from "types/FaqTypes";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

interface QuestionAnswerProps {
  item: FaqType;
  selectedList: FaqType;
  setSelectedList: (item: FaqType) => void;
  search: string;
}

const QuestionAnswer = ({
  selectedList,
  setSelectedList,
  item,
  search,
}: QuestionAnswerProps) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          flex: 1,
          gap: 5,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          alignContent: "flex-start",
          marginHorizontal: scaledHorizontal(25),
          borderBottomWidth: 0.8,
          borderBottomColor: colors.antiFlashWhite,
          paddingTop: scaledHorizontal(20),
          paddingBottom: scaledHorizontal(20),
        }}
        onPress={() => {
          if (selectedList.id === item?.id) {
            setSelectedList({} as FaqType);
          } else {
            setSelectedList(item);
          }
        }}
      >
        <View>
          <Text size={14} style={{ fontWeight: "900", lineHeight: 22 }}>
            Q.
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <HightlightedText text={item?.title} search={search} />
        </View>

        <Image
          source={icons.arrowRight}
          style={{
            width: 8,
            height: 13,
            resizeMode: "contain",
            marginTop: scaledVertical(12),
          }}
        />
      </TouchableOpacity>
      {selectedList?.id === item?.id ? (
        <View
          style={{
            backgroundColor: colors.antiFlashWhite,
            paddingHorizontal: scaledHorizontal(25),
            paddingVertical: scaledVertical(25),
          }}
        >
          <Text size={14} lineHeight={20}>
            {item?.contents}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default QuestionAnswer;
