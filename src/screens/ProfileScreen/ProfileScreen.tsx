import Section from "components/Section";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native"
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { getVersion } from "react-native-device-info";
import BaseModal from "components/BaseModal";
import Button from "components/Button";
import NavigationService from "utils/NavigationService";
import { useAuth } from "utils/hooks/UseAuth";
import { wait } from "utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { onGetNotification } from "stores/persist/notificationSlice";
import { StoreStateType } from "stores";
import api from "configs/api";

const ProfileScreen = () => {

  const { isGetNotification } = useSelector((state: StoreStateType) => state.notification)

  const [isRadioOn, setIsRadioOn] = useState(isGetNotification);
  const [openModal, setOpenModal] = useState(false);
  const { postLogout, userData, token } = useAuth();
  const dispatch = useDispatch();
  const [metaNotification, setMetaNotification] = useState({} as any);

  const menuInformation = [
    {
      title: "병원 목록",
      onPress: () => {
        NavigationService.navigate("HospitalListScreen")
      },
      type: "",
      rightIcon: true,
    },
    {
      title: "보증서 목록",
      onPress: () => {
        NavigationService.navigate("WarrantyListScreen")
      },
      type: "",
      rightIcon: true,
    },
    {
      title: "알림설정",
      onPress: () => {
        dispatch(onGetNotification(!isRadioOn))
        setIsRadioOn(!isRadioOn)
      },
      type: "radio",
      rightIcon: false,
    },
    {
      title: "버전 정보",
      onPress: () => { },
      type: "version",
      rightIcon: false,
    },
    {
      title: "로그아웃",
      onPress: () => {
        setOpenModal(true)
      },
      type: "",
      rightIcon: true,
    },
  ];

  const renderPhone = (phone: string) => {
    let result = ''
    const cleanPhoneNumber = phone?.replace(/-/g, '');

    const lengthData = cleanPhoneNumber?.length;
    const split = Math.floor(lengthData / 2);

    let part1 = cleanPhoneNumber?.slice(0, split);
    let part2 = cleanPhoneNumber?.slice(split);

    let remainingLength = part2?.length - 1;
    let replacement = '*'.repeat(remainingLength);
    result = part1 + '-' + part2?.[0] + replacement;
    return result;
  }

  const _getDataNotifications = async () => {
    await api.getCheckNotificationUser(token).then((result) => {
      setMetaNotification(result?.data?.data)
    });
  }

  useEffect(() => {
    _getDataNotifications();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <BaseModal
        contentStyle={{ paddingBottom: 0, paddingHorizontal: 0, borderRadius: 2, height: 250 }}
        showModal={openModal}
        animation="slide"
        onBackdropPress={() => setOpenModal(false)}
        onBackButtonPress={() => setOpenModal(false)}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
        >
          <Text size={18} style={{ fontWeight: "bold" }}>로그아웃</Text>
          <Space height={25} />
          <Text textAlign="center" size={14} style={{ lineHeight: 21 }}>
            로그아웃 하시겠습니까? {"\n"}
            자동 로그아웃 설정이 해제됩니다.
          </Text>
          <Space height={32} />
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <Button
              onPress={() => setOpenModal(false)}
              title="취소"
              textStyle={{
                color: colors.black,
                fontWeight: "bold"
              }}
              style={{
                width: 125,
                height: 45,
                borderRadius: 5,
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: "#767676"
              }}
            />
            <Space width={12} />
            <Button
              onPress={() => {
                postLogout(() => {
                  setOpenModal(false);
                  wait(1000).then(() => {
                    NavigationService.jump("LoginScreen");
                  });
                })
              }}
              textStyle={{
                color: colors.black,
                fontWeight: "bold"
              }}
              title="로그아웃"
              style={{
                width: 125,
                height: 45,
                borderRadius: 5,
                backgroundColor: "#f2dca8",
                borderWidth: 1,
                borderColor: "#e9ce8f"
              }}
            />
          </View>
        </View>
      </BaseModal>
      <View
        style={{
          paddingHorizontal: scaledHorizontal(20),
          paddingVertical: scaledVertical(18),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 55,
        }}>
        <View>
          <Text style={{ fontWeight: "bold" }}>마이페이지</Text>
        </View>
        <TouchableOpacity
          onPress={() => NavigationService.navigate("NotificationScreen")}
          style={{ width: 18, height: 20, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={icons.bell} style={{ width: 18, height: 20 }} resizeMode="contain" />
          {metaNotification?.notReadCount > 0 && (
            <View style={{ width: 7, height: 7, backgroundColor: "#e11818", borderRadius: 7 / 2, position: "absolute", top: 0, right: 0 }}>

            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={{
        paddingHorizontal: scaledHorizontal(20),
        paddingVertical: scaledVertical(28),
        backgroundColor: "#0f1e3d",
        height: 100,
        justifyContent: "center",
      }}>
        <Text color="#fff" size={18} style={{ fontWeight: "bold" }}>{userData?.name}</Text>
        {/* <Text color="#fff" size={16}>{userData?.contact}</Text> */}
        <Text color="#fff" size={16}>{renderPhone(userData?.citizenNo)}</Text>
      </View>
      <Space height={30} />
      <View style={{ backgroundColor: colors.white, marginHorizontal: scaledHorizontal(20) }}>
        {menuInformation.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={item.onPress}
              key={index}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 15,
                borderRadius: 2,
                // borderWidth: Platform.OS === "android" ? 0.5 : 0.3,
                borderColor: colors.gainsboro,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 3,
                backgroundColor: "#fff"
              }}
            >
              <Section
                leftText={item?.title}
                isBold={true}
                textSize={14}
                arrowRight={item?.rightIcon}
                withRadio={item?.type === "radio" ? true : false}
                isRadioOn={item?.type === "radio" ? isRadioOn : false}
                onPressRightText={item?.onPress}
                rightText={
                  item?.type === "version"
                    ? `V.${getVersion()}`
                    : ""
                }
                isVersion={item?.type === "version"}
                textRightSize={item?.type === "version" ? 14 : 13}
                withLeftTextBlue={item?.type === "version" ? true : false}
                withLeftTextBlueBold={false}
                leftTextBlue={
                  item?.type === "version" ? "(업데이트 필요)" : ""
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
