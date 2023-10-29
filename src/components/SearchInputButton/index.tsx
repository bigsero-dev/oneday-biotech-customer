import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import NavigationService from "utils/NavigationService";
import { scaledVertical } from "utils/ScaledService";

const SearchInputButton = () => {
  return (
    <TouchableOpacity
      onPress={() => NavigationService.navigate("SearchScreen")}
      style={{
        backgroundColor: colors.flashWhite,
        borderRadius: 2,
        paddingHorizontal: 15,
        paddingVertical: scaledVertical(22),
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <Text size={14} color={colors.spanishGray}>
        환자명 검색
      </Text>
      <Image
        source={icons.search}
        style={[
          {
            alignSelf: "flex-end",
            marginHorizontal: 5,
            marginTop: scaledVertical(-5),
            height: 23,
            width: 18,
            tintColor: colors.spanishGray,
          },
        ]}
        resizeMode={"contain"}
      />
    </TouchableOpacity>
  );
};

export default SearchInputButton;
