import BaseModal from "components/BaseModal";
import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

interface ModalMonthProps {
  showModal: boolean;
  animation: "zoom" | "slide";
  onHide?: () => void;
  data: any;
  selectedValue: any;
  onPress?: any;
  customMargin?: number;
}

const ModalMonth = ({
  showModal,
  animation,
  onHide,
  data,
  selectedValue,
  onPress,
  customMargin,
}: ModalMonthProps) => {
  return (
    <BaseModal
      showModal={showModal}
      animation={animation}
      onModalHide={onHide}
      onBackdropPress={onHide}
      onBackButtonPress={onHide}
      contentStyle={{
        paddingBottom: 0,
        paddingTop: 0,
        paddingHorizontal: 0,
        borderRadius: 2,
        maxHeight: "70%",
        marginHorizontal: customMargin ? scaledHorizontal(customMargin) : 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ maxHeight: "70%", backgroundColor: colors.white }}>
          {data.length > 0
            ? data.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onPress && onPress(item)}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingVertical: scaledVertical(25),
                      paddingHorizontal: scaledHorizontal(25),
                      borderBottomWidth: 0.5,
                      borderBottomColor: colors.gainsboro,
                    }}
                  >
                    <Text size={13} style={{ marginLeft: 5 }}>
                      {item.cardHolderName || item.title}
                    </Text>
                    {item.title ? (
                      <Image
                        source={
                          selectedValue.title === item.title
                            ? icons.radioSelect
                            : icons.radioUnselect
                        }
                        style={{ height: 16, width: 16, resizeMode: "cover" }}
                      />
                    ) : (
                      <Image
                        source={
                          selectedValue.cardHolderName === item.cardHolderName
                            ? icons.radioSelect
                            : icons.radioUnselect
                        }
                        style={{ height: 16, width: 16, resizeMode: "cover" }}
                      />
                    )}
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
      </ScrollView>
    </BaseModal>
  );
};

export default ModalMonth;
