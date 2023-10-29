import { useNavigation } from "@react-navigation/core";
import Button from "components/Button";
import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import { useAuth } from "hooks/useAuth";
import React, { memo } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import type { ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

interface HeaderProps {
  withCart?: boolean;
  withNotification?: boolean;
  withBack?: boolean;

  withMenu?: boolean;

  withShare?: boolean;

  withBackTitle?: boolean;
  backTitle?: string;
  onBackFunction?: () => void;

  withHome?: boolean;
  onHomePress?: () => void;
  withBorder?: boolean;
  withSearch?: boolean;
  titleOnly?: boolean;

  isCustom?: boolean;
  isBold?: boolean;
  withProgress?: boolean;
  progress?: string;
  textTitleColor?: string;
  iconBackTintColor?: string;
  withClose?: boolean;
  onClose?: () => void;
  titleCenter?: string;
  withButtonLeft?: boolean;
  onPressButtonleft?: () => void;
  buttonLeftDisabled?: boolean;
}

const Header = ({
  withCart,
  withNotification,
  withBack,
  withHome,
  withMenu,
  withBackTitle,
  backTitle,
  withShare,
  withBorder,
  withSearch,
  onBackFunction,
  titleOnly,
  onHomePress,
  isCustom,
  isBold,
  withProgress,
  progress,
  textTitleColor,
  iconBackTintColor,
  withClose,
  onClose,
  titleCenter,
  withButtonLeft,
  onPressButtonleft,
  buttonLeftDisabled,
}: HeaderProps) => {
  const navigation: any = useNavigation();
  const border: ViewStyle = withBorder
    ? {
        borderBottomWidth: 0.3,
        borderColor: colors.spanishGray,
      }
    : {};
  const { top } = useSafeAreaInsets();
  const { token } = useAuth();
  return (
    <View
      style={[
        border,
        {
          paddingHorizontal: scaledHorizontal(23),
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: scaledVertical(20) + (isCustom ? top : 0),
          paddingBottom: scaledVertical(30),
          alignItems: "center",
          alignContent: "center",
          backgroundColor: colors.white,
          zIndex: 999,
        },
      ]}
    >
      {withProgress && progress ? (
        <View
          style={{
            position: "absolute",
            width: progress,
            height: 2,
            backgroundColor: colors.black,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      ) : null}

      {withBack ? (
        <TouchableOpacity
          onPress={() => {
            //clearTimeout(timeout.current);
            //timeout.current = setTimeout(() => {
            if (onBackFunction) {
              onBackFunction();
            } else {
              NavigationService.back();
            }
            //}, 300);
          }}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={icons.arrowLeft}
            style={{
              height: 18,
              width: 18,
              tintColor: iconBackTintColor || "black",
            }}
            resizeMode="contain"
          />
          {withBackTitle ? (
            <Text
              style={{
                paddingLeft: scaledHorizontal(10),
                marginTop: -2,
                fontWeight: "900",
              }}
              color={textTitleColor || "black"}
              size={16}
              type="bold"
            >
              {backTitle ? backTitle : "Back"}
            </Text>
          ) : null}
        </TouchableOpacity>
      ) : null}

      {titleOnly ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {withBackTitle ? (
            <Text
              style={{
                //paddingLeft: scaledHorizontal(10),
                fontWeight: isBold ? "900" : "bold",
                marginTop: scaledVertical(1),
              }}
              size={16}
              type="bold"
            >
              {backTitle ? backTitle : "Back"}
            </Text>
          ) : null}
        </View>
      ) : null}

      {withMenu ? (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={icons.menu}
            style={{ height: 18, width: 18 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}

      {titleCenter ? (
        <Text
          style={{
            //paddingLeft: scaledHorizontal(10),
            fontWeight: isBold ? "900" : "bold",
            marginTop: scaledVertical(1),
          }}
          size={16}
          type="bold"
        >
          {titleCenter ? titleCenter : "Back"}
        </Text>
      ) : null}

      <View style={{ flexDirection: "row" }}>
        {withSearch && token ? (
          <TouchableOpacity
            style={{ paddingRight: scaledHorizontal(25) }}
            onPress={() => NavigationService.navigate("SearchScreen")}
          >
            <Image
              source={icons.search}
              style={{
                marginTop: 2,
                height: 18,
                width: 18,
                tintColor: colors.black,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
        {withCart && token ? (
          <TouchableOpacity
            style={{ paddingRight: scaledHorizontal(25) }}
            onPress={() => NavigationService.navigate("CartScreen")}
          >
            <Image
              source={icons.cart}
              style={{
                height: 18,
                width: 18,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}

        {withNotification && token ? (
          <TouchableOpacity style={{ paddingRight: 5 }}>
            <Image
              source={icons.bell}
              style={{ height: 18, width: 18 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
        {withHome && token ? (
          <TouchableOpacity
            style={{ paddingRight: 5 }}
            onPress={() => onHomePress && onHomePress()}
          >
            <Image
              source={icons.home}
              style={{ height: 22, width: 22 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
        {withShare && token ? (
          <TouchableOpacity style={{ paddingRight: 5 }}>
            <Image
              source={icons.share}
              style={{ height: 18, width: 18 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
        {withClose ? (
          <TouchableOpacity
            style={{ paddingRight: 5 }}
            onPress={() => onClose && onClose()}
          >
            <Image
              source={icons.xClose}
              style={{ height: 18, width: 18, tintColor: colors.white }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
        {withButtonLeft && onPressButtonleft && (
          <Button
            disabled={buttonLeftDisabled}
            title="등록완료"
            style={{
              paddingVertical: scaledVertical(10),
              borderRadius: 3,
              paddingHorizontal: scaledHorizontal(10),
              backgroundColor: buttonLeftDisabled
                ? colors.gainsboro
                : colors.white,
              borderWidth: buttonLeftDisabled ? 0 : 1,
              borderColor: colors.black,
            }}
            textStyle={{
              fontSize: 13,
              fontWeight: "900",
              color: buttonLeftDisabled ? colors.sonicSilver : colors.black,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default memo(Header);
