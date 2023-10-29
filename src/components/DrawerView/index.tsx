import { DrawerActions, useNavigation } from "@react-navigation/core";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import Button from "components/Button";
import { VerticalList } from "components/List";
import ModalAlert from "components/ModalAlert";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import { useAuth } from "hooks/useAuth";
import React, { useState } from "react";
import { Image, StatusBar, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ModalAlertProps } from "types/AppTypes";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { dpToPx } from "utils/Utils";

const DrawerView = (_: DrawerContentComponentProps) => {
  const topSafe = useSafeAreaInsets().top;
  const [showModal, setShowModal] = useState({} as ModalAlertProps);
  const navigation = useNavigation();
  const { token, user, postLogout } = useAuth();
  const menu = [
    {
      title: "공지사항",
      navigation: "NoticeScreen",
    },
    {
      title: "마이페이지",
      navigation: "MyPageScreen",
    },
    {
      title: "1:1문의",
      navigation: "Inquiry",
    },
    {
      title: "병원 정보 수정",
      navigation: "EditHospitalScreen",
    },
    {
      title: "로그아웃",
      navigation: "logout",
    },
  ];

  const onLogout = () => {
    postLogout(() => {
      setShowModal({ showModal: false, title: "" });
      navigation.dispatch(DrawerActions.closeDrawer());
      NavigationService.navigate("TabNavigator", { screen: "Tooth" });
    });
  };

  const goToNavigation = (nav: string | any) => {
    if (nav === "logout") {
      setShowModal({
        showModal: true,
        title: "로그아웃 하시겠습니까?",
        leftText: "취소",
        leftFunction: () => setShowModal({ showModal: false, title: "" }),
        rightText: "확인",
        rightFunction: onLogout,
      });
    } else if (nav === "Inquiry") {
      NavigationService.navigate("InquiryListScreen", { index: 1 });
    } else {
      NavigationService.navigate(nav);
    }
  };

  const menuView = ({
    item,
    index,
  }: {
    item: { title: string; navigation: string };
    index: number;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => goToNavigation(item.navigation)}
        key={index}
        style={{
          borderBottomColor: colors.cultured,
          borderBottomWidth: 2,
          paddingLeft: scaledHorizontal(20),
        }}
      >
        <Text
          size={13}
          color={colors.black}
          style={{ paddingVertical: scaledVertical(25) }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[]}>
      <StatusBar barStyle={"dark-content"} backgroundColor={colors.white} />
      <View
        style={{
          backgroundColor: colors.darkBlue,
          paddingHorizontal: scaledHorizontal(20),
          paddingTop: topSafe + 10,
          paddingBottom: 5,
        }}
      >
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        >
          <Image
            source={icons.xButton}
            style={{
              tintColor: colors.spanishGray,
              width: dpToPx(7),
              height: dpToPx(7),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {token === "" ? (
          <>
            <Text
              type="bold"
              size={16}
              color={colors.white}
              style={{
                paddingTop: scaledVertical(3),
                paddingBottom: scaledVertical(40),
                fontWeight: "900",
              }}
            >
              반갑습니다.
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                onPress={() => NavigationService.navigate("LoginScreen")}
                type="light"
                title="로그인"
                style={{
                  borderRadius: 200,
                  flex: 1,
                  marginRight: scaledHorizontal(18),
                }}
                numberOfLines={1}
                textStyle={{
                  textAlign: "center",
                  paddingVertical: scaledVertical(16),
                  fontWeight: "900",
                }}
              />
              <Button
                type="light"
                title="회원가입"
                numberOfLines={1}
                style={{ borderRadius: 200, flex: 1 }}
                textStyle={{
                  textAlign: "center",
                  fontWeight: "900",
                  paddingVertical: scaledVertical(16),
                }}
              />
            </View>
          </>
        ) : (
          <>
            <Text
              type="bold"
              size={16}
              color={colors.white}
              style={{
                paddingTop: scaledVertical(3),
                paddingBottom: scaledVertical(50),
                fontWeight: "900",
              }}
            >
              회원님, 반갑습니다.
            </Text>

            <Text
              type="bold"
              size={13}
              color={colors.white}
              style={{ fontWeight: "900" }}
            >
              원데이치과
            </Text>
            <Space height={scaledVertical(10)} />

            <Text size={12} color={colors.spanishGray} style={{}}>
              {user?.email}
            </Text>
          </>
        )}

        {/*  */}
        <Space height={scaledVertical(40)} />
      </View>
      <View>
        {token === "" ? (
          <View style={{ paddingTop: scaledVertical(90) }}>
            <Text
              textAlign="center"
              size={13}
              color={colors.spanishGray}
              lineHeight={20}
            >
              로그인 혹은 회원가입 후{" \n "}
              <Text
                color={colors.spanishGray}
                size={13}
                style={{ paddingTop: 5 }}
              >
                서비스 이용이 가능합니다.
              </Text>
            </Text>
          </View>
        ) : (
          <VerticalList data={menu} renderItem={menuView} />
        )}
      </View>
      <ModalAlert
        onHide={() => setShowModal({ showModal: false, title: "" })}
        showModal={showModal?.showModal}
        animation={"zoom"}
        title={showModal?.title}
        leftFunction={showModal.leftFunction}
        rightFunction={showModal.rightFunction}
        leftText={showModal.leftText}
        rightText={showModal.rightText}
      />
    </View>
  );
};

export default DrawerView;
