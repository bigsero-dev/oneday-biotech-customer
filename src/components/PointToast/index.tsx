import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { View, Image, Platform, TouchableOpacity } from "react-native";
import Toast from "react-native-root-toast";
import { scaledVertical, scaledHorizontal } from "utils/ScaledService";
import { wait } from "utils/Utils";

interface PointToastProps {
  isOpenToast: boolean;
  setIsOpenToast: (arg: boolean) => void;
}

const PointToast = ({ isOpenToast, setIsOpenToast }: PointToastProps) => {
  return (
    <Toast
      visible={isOpenToast}
      position={
        Toast.positions.TOP + scaledVertical(Platform.OS === "ios" ? 320 : 240)
      }
      duration={2}
      shadow={true}
      animation={true}
      hideOnPress={true}
      backgroundColor={"white"}
      opacity={1.0}
      containerStyle={{
        width: "90%",
        height: 115,
        backgroundColor: "white",
        borderRadius: 10,
      }}
      onShown={() =>
        wait(2000).then(() => {
          setIsOpenToast(false);
        })
      }
      onHide={() => setIsOpenToast(false)}
    >
      <View
        style={{
          paddingLeft: scaledHorizontal(10),

          paddingTop: scaledVertical(15),
          width: "108%",
        }}
      >
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => setIsOpenToast(false)}
        >
          <Image
            source={icons.xClose}
            style={{
              height: 12,
              width: 12,
              tintColor: colors.sonicSilver,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        <View>
          <Text size={15} style={{ fontWeight: "900" }} lineHeight={20}>
            적립 예정 포인트 안내
          </Text>
          <Space height={5} />
          <Text size={13} lineHeight={20}>
            - 결제완료 후 ‘구매확정’이 되면, 적립이 될 예정 포인트
          </Text>
          <Text size={13} lineHeight={20}>
            - 만약 구매확정 전 환불이 발생되면 적립되지 않습니다.
          </Text>
        </View>
      </View>
    </Toast>
  );
};

export default PointToast;
