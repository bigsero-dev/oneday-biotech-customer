import BaseModal from "components/BaseModal";
import Button from "components/Button";
import Line from "components/Line";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import NavigationService from "utils/NavigationService";
import { scaledVertical } from "utils/ScaledService";

interface ModalQrProps {
  showModal: boolean;
  onHide?: () => void;
}

const ModalQr = ({ showModal, onHide }: ModalQrProps) => {
  return (
    <BaseModal
      showModal={showModal}
      animation={"zoom"}
      onModalHide={onHide}
      onBackdropPress={onHide}
      onBackButtonPress={onHide}
      contentStyle={{ paddingHorizontal: 0, paddingTop: 15 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <Text size={15} style={{ fontWeight: "900" }}>
          QR 스캔 선택
        </Text>
        <TouchableOpacity onPress={onHide}>
          <Image
            source={icons.xClose}
            style={{
              height: 15,
              width: 15,
              resizeMode: "contain",
              tintColor: colors.black,
            }}
          />
        </TouchableOpacity>
      </View>
      <Space height={15} />
      <Line style={{ height: 1, backgroundColor: colors.flashWhite }} />
      <View style={{ paddingHorizontal: 20 }}>
        <Space height={15} />
        <Button
          onPress={() => {
            onHide && onHide();
            NavigationService.navigate("FixtureRegisterScreen");
          }}
          title="1차 수술 등록 (Fixture)"
          style={{
            paddingVertical: scaledVertical(25),
            borderRadius: 2,
          }}
          textStyle={{
            fontSize: 13,
          }}
        />
        <Space height={15} />
        <Button
          title="Fixture 외 재고 차감"
          style={{
            paddingVertical: scaledVertical(25),
            borderRadius: 2,
          }}
          textStyle={{
            fontSize: 13,
          }}
        />
      </View>
    </BaseModal>
  );
};

export default ModalQr;
