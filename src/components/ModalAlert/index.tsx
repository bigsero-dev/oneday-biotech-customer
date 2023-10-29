/* eslint-disable no-nested-ternary */
import BaseModal from "components/BaseModal";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

interface ModalAlertProps {
  showModal: boolean;
  animation: "zoom" | "slide";
  title?: string;
  onHide?: () => void;
  leftText?: string;
  leftFunction?: () => void;
  rightText?: string;
  rightFunction?: () => void;
  withIcon?: boolean;
  iconImage?: any;
  withPrice?: boolean;
  isCustomCompletePayment?: boolean;
  isCustomRegisterPatient?: boolean;
  isRegisterProduct?: boolean;
  isCustomSubmitRegister?: boolean;
}

const ModalAlert = ({
  showModal,
  animation,
  onHide,
  leftText,
  rightText,
  leftFunction,
  rightFunction,
  title,
  withIcon,
  iconImage,
  isCustomCompletePayment,
  isCustomRegisterPatient,
  isRegisterProduct,
  isCustomSubmitRegister,
}: ModalAlertProps) => {
  return (
    <BaseModal
      showModal={showModal}
      animation={animation}
      onModalHide={onHide}
      onBackdropPress={onHide}
      onBackButtonPress={onHide}
    >
      {withIcon ? (
        <View
          style={{
            alignItems: "center",
            marginBottom: scaledVertical(20),
          }}
        >
          <FastImage
            source={iconImage}
            style={{ height: 60, width: 60 }}
            resizeMode={"contain"}
          />
        </View>
      ) : (
        <></>
      )}

      <Space height={5} />
      {isCustomCompletePayment ? (
        <View style={{ paddingHorizontal: scaledHorizontal(25) }}>
          <Text
            size={15}
            textAlign={"left"}
            color={colors.black}
            lineHeight={20}
          >
            홈 화면으로 이동하시겠습니까?
          </Text>
          <Space height={15} />
          <Text
            size={15}
            textAlign={"left"}
            color={colors.cinnabar}
            lineHeight={20}
          >
            * 주문내역 확인하는 방법 안내
          </Text>
          <Text
            size={15}
            textAlign={"left"}
            color={colors.black}
            lineHeight={20}
          >
            {
              "1. 병원APP : 마이페이지>주문내역 관리\n2. 병원WEB : 주문관리>주문내역 관리"
            }
          </Text>
        </View>
      ) : isCustomRegisterPatient ? (
        <View style={{ paddingHorizontal: scaledHorizontal(25) }}>
          <Text
            size={15}
            textAlign={"center"}
            color={colors.black}
            lineHeight={20}
          >
            해당 환자로 등록하시겠습니까?
          </Text>

          <Text
            size={15}
            textAlign={"center"}
            color={colors.brandBlue}
            lineHeight={20}
          >
            {
              "등록할 경우, STEP 2에서 수술할 임플란트\n 치아 번호를 선택합니다."
            }
          </Text>
          <Space height={15} />
          <Text
            size={15}
            textAlign={"center"}
            color={colors.black}
            lineHeight={20}
          >
            {
              "STEP 1에서 환자를 잘못 등록할 경우,\n STEP 3에서는 환자명 변경이 불가능하여\n 처음부터 다시 등록해야 합니다.\n 정확히 확인 부탁드립니다."
            }
          </Text>
        </View>
      ) : isRegisterProduct ? (
        <View style={{ paddingHorizontal: scaledHorizontal(25) }}>
          <Text
            size={15}
            textAlign={"center"}
            color={colors.black}
            lineHeight={20}
          >
            {
              "해당 임플란트 정보를 삭제하시겠습니까? \n 연동된 임플란트가 1개인 경우,"
            }
          </Text>

          <Text
            size={15}
            textAlign={"center"}
            color={colors.brandBlue}
            lineHeight={20}
          >
            'STEP 2. 임플란트 등록'
            <Text
              size={15}
              textAlign={"center"}
              color={colors.black}
              lineHeight={20}
            >
              {" 화면으로 이동됩니다."}
            </Text>
          </Text>
        </View>
      ) : isCustomSubmitRegister ? (
        <View style={{ marginHorizontal: scaledHorizontal(-10) }}>
          <Text size={15} textAlign={"center"} color={colors.black}>
            1차 수술을 등록하시겠습니까?
          </Text>

          <Text size={15} textAlign={"center"} color={colors.brandBlue}>
            등록 할 경우, 임플란트 보증서가 연동됩니다.
          </Text>

          <Text size={15} textAlign={"center"} color={colors.black}>
            {"\n초진검진이 예약된 환자인 경우, '진행완료' 되어\n"}
            {"1차 수술(1회차)가 예약됩니다.\n"}
            {"최초로 등록한 경우, 초진검진(1회차)는 자동으로\n"}
            {"'진행완료'되며, 1차 수술(1회차)가 예약됩니다."}
          </Text>
        </View>
      ) : (
        <Text
          size={15}
          textAlign={"center"}
          color={colors.black}
          lineHeight={20}
        >
          {title}
        </Text>
      )}

      <View
        style={{
          flexDirection: "row",
          marginTop: scaledVertical(50),
          justifyContent: "center",
        }}
      >
        {leftText && leftFunction ? (
          <TouchableOpacity
            style={{
              borderColor: colors.sonicSilver,
              borderWidth: 0.3,
              paddingVertical: scaledVertical(15),
              justifyContent: "center",
              borderRadius: 1,
              marginRight: 5,
              //marginHorizontal: scaledHorizontal(5),
              paddingHorizontal: scaledHorizontal(30),
            }}
            onPress={leftFunction}
          >
            <Text textAlign={"center"} size={13} color={colors.black}>
              {leftText}
            </Text>
          </TouchableOpacity>
        ) : null}

        {rightText && rightFunction ? (
          <TouchableOpacity
            style={{
              backgroundColor: colors.darkBlue,
              justifyContent: "center",
              borderColor: colors.darkBlue,
              borderWidth: 0.3,
              borderRadius: 1,
              marginLeft: 5,
              //marginHorizontal: scaledHorizontal(5),
              paddingVertical: scaledVertical(15),
              paddingHorizontal: scaledHorizontal(30),
            }}
            onPress={rightFunction}
          >
            <Text
              textAlign={"center"}
              size={13}
              color={colors.white}
              type="bold"
            >
              {rightText}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </BaseModal>
  );
};

export default ModalAlert;
