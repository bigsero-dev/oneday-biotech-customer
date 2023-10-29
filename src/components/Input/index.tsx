import React, { memo, useState } from "react";
import type {
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  TextInputChangeEventData,
} from "react-native";
import {
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import icons from "configs/icons";
import { scaledHorizontal } from "utils/ScaledService";
import Text from "components/Text";
import colors from "configs/colors";

import styles from "./InputStyles";

interface Props {
  placeholder: string;
  onChange?: (e: any) => void;
  value: any;
  type: "input" | "textarea";
  keyboardType: "default" | "number-pad" | "email-address" | "numeric";
  error?: any;
  secureTextEntry?: boolean;
  onClearButton?: boolean;
  onClear?: () => void;
  borderLess?: boolean;
  label?: string;
  useRef?: any;
  editable: boolean;
  labelColor?: any;
  bold?: boolean;
  isPhone?: boolean;
  maxLength?: number;
  onBlur?: () => void;
  onFocus?: () => void;
  isRequired?: boolean;
  autoCapitalize?: "none" | "sentences";
  focusInput?: boolean;
  confirmPasword?: boolean;
  textAreaHeight?: number | string;
  placeholderColor?: string;
  customBorder?: boolean;
  customText?: boolean;
  stylesBox?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  customButton?: boolean;
  customIcon?: ImageSourcePropType | any;
  customStyle?: ImageStyle | ImageStyle[];
  customPress?: () => void;
  wrapStyle?: any;
  heightBox?: number;
  customTextSecure?: boolean;
  onContentSizeChange?: (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => void;
  onChangeEvent?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  multiline?: boolean;
  onSubmitEditing?: (e: any) => void;
}

const Component = ({
  onChange,
  placeholder,
  secureTextEntry,
  value,
  onClearButton,
  onClear,
  type,
  borderLess,
  //label,
  error,
  keyboardType,
  useRef,
  editable,
  //labelColor,
  bold,
  isPhone,
  maxLength,
  onBlur,
  onFocus,
  //isRequired,
  autoCapitalize,
  focusInput,
  confirmPasword,
  textAreaHeight,
  placeholderColor,
  customBorder,
  customText,
  stylesBox,
  textStyle,
  customButton,
  customIcon,
  customStyle,
  customPress,
  wrapStyle,
  heightBox,
  customTextSecure = false,
  onContentSizeChange,
  onChangeEvent,
  multiline = false,
  onSubmitEditing,
}: Props) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <View
        style={[
          styles.container,
          borderLess && styles.borderLess,
          !borderLess ? {} : {},
          customBorder ? { borderWidth: 1, borderColor: colors.gainsboro } : {},
          //focusInput ? styles.borderContainer : {},
          error ? styles.borderError : {},
          stylesBox,
          heightBox ? { minHeight: heightBox } : { minHeight: 40 },
        ]}
      >
        {/* {label || focusInput ? (
          <View style={styles.label}>
            <Text color={labelColor && labelColor} size={10}>
              {label}
              {isRequired ? (
                <Text color={color.cinnabar} size={12}>
                  *
                </Text>
              ) : null}
            </Text>
          </View>
        ) : (
          <></>
        )} */}

        <View style={[styles.wrapInput, wrapStyle]}>
          {isPhone && (focusInput || value) ? (
            <Text
              size={16}
              style={{
                alignSelf: "center",
                paddingBottom: Platform.OS === "android" ? 2 : 0,
                marginRight: 4,
              }}
            >
              +62
            </Text>
          ) : (
            <></>
          )}
          <TextInput
            ref={useRef}
            style={[
              //styles.textInput,

              customText
                ? { fontSize: 15, height: 40, color: colors.black }
                : styles.textInput,
              type === "textarea" && {
                minHeight: textAreaHeight || 84,
                textAlignVertical: "top",
              },
              bold && { fontWeight: "bold" },
              isPhone
                ? { width: "80%" }
                : { width: confirmPasword ? "80%" : "100%" },
              editable
                ? { paddingLeft: 0 }
                : { paddingLeft: scaledHorizontal(-10) },
              textStyle,
            ]}
            placeholderTextColor={
              placeholderColor ? placeholderColor : colors.white
            }
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry && !visible}
            value={value}
            multiline={multiline ? multiline : type === "textarea"}
            editable={editable}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onFocus={onFocus}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            onContentSizeChange={e =>
              onContentSizeChange && onContentSizeChange(e)
            }
            onChange={e => onChangeEvent && onChangeEvent(e)}
            onSubmitEditing={e => onSubmitEditing && onSubmitEditing(e)}
          />

          <View style={{ flexDirection: "row", flex: 1 }}>
            {customButton ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.wrapIcon]}
                onPress={customPress}
              >
                <Image
                  source={customIcon}
                  style={customStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : null}
            {onClearButton ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.wrapIcon]}
                onPress={() => onClear && onClear()}
              >
                <Image
                  source={icons.clearIcon}
                  style={styles.clearIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : null}
            {secureTextEntry && !customTextSecure && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.wrapIcon}
                onPress={() => setVisible(!visible)}
              >
                <Image
                  source={visible ? icons.eye : icons.eyeSlash}
                  resizeMode={"contain"}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
            {customTextSecure && value.length > 0 && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: -7,
                }}
                onPress={() => setVisible(!visible)}
              >
                <Text
                  color={colors.brandBlue}
                  style={{ fontWeight: "900" }}
                  size={14}
                >
                  {!visible ? "비밀번호 표시" : "비밀번호 숨김"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {error && error !== "" ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text style={styles.errorText}>{""}</Text>
      )}
    </>
  );
};

Component.defaultProps = {
  placeholder: "Ketik disini",
  type: "input",
  error: "",
  keyboardType: "default",
  editable: true,
  isRequired: false,
  autoCapitalize: "none",
  focusInput: false,
};

export default memo(Component);
