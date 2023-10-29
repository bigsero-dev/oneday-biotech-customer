import BaseModal from "components/BaseModal";
import Button from "components/Button";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React, { useRef, useState } from "react";
import { Animated, Image, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

interface ModalTimeProps {
  showModal: boolean;
  animation: "zoom" | "slide";
  onHide?: () => void;
  data: any;
  selectedValue: any;
  onPress?: any;
}

const ModalTime = ({
  showModal,
  animation,
  onHide,
  data,
  selectedValue,
  onPress,
}: ModalTimeProps) => {
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
  const [selectedTime, setSelectedTime] = useState(selectedValue);
  const scrollIndicator = useRef(new Animated.Value(0)).current;
  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight) /
        completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    extrapolate: "clamp",
    inputRange: [0, difference],
    outputRange: [0, difference],
  });

  const onContentSizeChange = (_: any, contentHeight: any) =>
    setCompleteScrollBarHeight(contentHeight);

  const onLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }: any) => {
    setVisibleScrollBarHeight(height);
  };
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
        marginHorizontal: 25,
        paddingHorizontal: 0,
        borderRadius: 2,
        height: "79%",
      }}
    >
      <View
        style={{
          paddingHorizontal: scaledHorizontal(25),
          paddingVertical: scaledVertical(30),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors.white,
        }}
      >
        <Text size={16} style={{ fontWeight: "900" }}>
          수술시간 선택
        </Text>
        <TouchableOpacity onPress={onHide}>
          <Image
            source={icons.xButton}
            style={{
              height: 18,
              width: 18,
              resizeMode: "contain",
              tintColor: colors.black,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "96%" }}
          onContentSizeChange={onContentSizeChange}
          onLayout={onLayout}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
        >
          <View
            style={{
              backgroundColor: colors.white,
            }}
          >
            <Space height={15} />
            {data.length > 0
              ? data.map((item: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedTime(item)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",

                        paddingHorizontal: scaledHorizontal(25),
                        paddingBottom: index === data.length - 1 ? 0 : 20,
                      }}
                    >
                      <Image
                        source={
                          selectedTime.title === item.title
                            ? icons.radioSelect
                            : icons.radioUnselect
                        }
                        style={{
                          height: 24,
                          width: 24,
                          resizeMode: "cover",
                          tintColor: colors.mediumChampagne,
                        }}
                      />
                      <Text size={15} style={{ marginLeft: 8 }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
          {/* <Space height={20} /> */}
        </ScrollView>
        <Animated.View
          style={{
            backgroundColor: colors.gainsboro,
            borderRadius: 3,
            height: "95%",
            width: 8,
            marginRight: 10,
            marginTop: scaledVertical(20),
            marginBottom: scaledVertical(20),
          }}
        >
          <Animated.View
            style={[
              {
                backgroundColor: "#bbbbbb",
                borderRadius: 3,
                width: 8,
                height: scrollIndicatorSize - 5,
                transform: [{ translateY: scrollIndicatorPosition }],
              },
            ]}
          />
        </Animated.View>
        <Space height={10} />
      </View>
      <Space height={15} />
      <Button
        onPress={() => {
          onPress(selectedTime.title);
          onHide && onHide();
        }}
        iconStyle={{ width: 24, height: 24, resizeMode: "contain" }}
        style={{
          borderRadius: 0,
          paddingVertical: scaledVertical(25),
          backgroundColor: colors.mediumChampagne,
        }}
        title="확인"
        textStyle={{
          color: colors.black,
          fontWeight: "900",
          fontSize: 16,
        }}
      />
    </BaseModal>
  );
};

export default ModalTime;
