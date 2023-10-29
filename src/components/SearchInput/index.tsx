import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { Image, View, TextInput, TouchableOpacity } from "react-native";

interface SearchInputProps {
  value: string;
  searchRef?: any;
  placeholder: string;
  onChange?: (e: any) => void;
  onChangeText?: (text: string) => void;
  onDeleteInput?: () => void;
  onSubmit?: (event: any) => void;
  isEditable?: boolean;
  borderBottomColor?: string;
  withoutButton?: boolean;
}

const SearchInput = ({
  value,
  searchRef,
  onChange,
  onChangeText,
  onSubmit,
  onDeleteInput,
  placeholder,
  isEditable,
  borderBottomColor,
  withoutButton,
}: SearchInputProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 2,
        //paddingHorizontal: 15,
        paddingVertical: 2,
        borderBottomWidth: 1,
        borderBottomColor: borderBottomColor || colors.black,
      }}
    >
      <TextInput
        placeholderTextColor={colors.spanishGray}
        placeholder={placeholder || ""}
        underlineColorAndroid="transparent"
        value={value}
        onChange={onChange}
        onChangeText={onChangeText}
        returnKeyType="search"
        ref={searchRef}
        editable={isEditable}
        style={{
          flex: 1,
          fontSize: 14,
          lineHeight: 15,
          height: 40,
          //paddingRight: scaledHorizontal(5),
          marginTop: 4,
          // paddingTop: 10,
          color: colors.black,
          //height: scaledVertical(35),
          textAlignVertical: "center",
        }}
        onSubmitEditing={event => onSubmit && onSubmit(event)}
        // editable={isNavigateSearchScreen ? false : true}
      />
      {value !== "" && !withoutButton ? (
        <TouchableOpacity onPress={onDeleteInput}>
          <Image
            source={icons.clearIcon}
            style={{ height: 23, width: 18, tintColor: colors.spanishGray }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      ) : null}
      {!withoutButton ? (
        <Image
          source={icons.search}
          style={[
            {
              marginHorizontal: 5,
              height: 23,
              width: 18,
              tintColor: colors.black,
            },
          ]}
          resizeMode={"contain"}
        />
      ) : null}
    </View>
  );
};

export default SearchInput;
