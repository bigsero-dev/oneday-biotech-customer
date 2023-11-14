import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import {
    View,
    TouchableOpacity,
    Image,
    useWindowDimensions,
} from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import {
    scaledVertical,
    scaledHorizontal,
    widthPercentage,
} from "utils/ScaledService";

interface OptionsProps {
    carouselRef: ICarouselInstance | any;
    currentIndex: number;
    isBest?: boolean;
    isNew?: boolean;
    customOption?: boolean;
    images: string[];
}

const Options = ({
    carouselRef,
    currentIndex,
    isBest,
    customOption,
    images,
    isNew,
}: OptionsProps) => {
    const { height } = useWindowDimensions();
    return (
        <>
            {images?.length > 1 ? (
                <TouchableOpacity
                    style={{
                        top: 200 / 2.5,
                        position: "absolute",
                        left: 0,
                        backgroundColor: "#000",
                        opacity: 0.7,
                        width: 26,
                        height: 26,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={() => {
                        carouselRef.current?.scrollTo({ count: -1, animated: true });
                    }}
                >
                    <Image
                        source={icons.previousIcon}
                        style={{
                            height: 8,
                            width: 14,
                            resizeMode: "contain",
                            tintColor: colors.white,
                        }}
                    />
                </TouchableOpacity>
            ) : null}
            {images?.length > 1 ? (
                <TouchableOpacity
                    style={{
                        top: 200 / 2.5,
                        right: 0,
                        position: "absolute",
                        backgroundColor: "#000",
                        opacity: 0.7,
                        width: 26,
                        height: 26,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={() => {
                        carouselRef.current?.scrollTo({ count: 1, animated: true });
                    }}
                >
                    <Image
                        source={icons.nextIcon}
                        style={{
                            height: 8,
                            width: 14,
                            resizeMode: "contain",
                            tintColor: colors.white,
                        }}
                    />
                </TouchableOpacity>
            ) : null}

            <View
                style={{
                    width: 40,
                    height: 20,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#222",
                    opacity: 0.4,
                    position: "absolute",
                    top: 200 / 1.3,
                    right: 20
                }}
            >
                <Text size={10} color="#fff">1/5</Text>
            </View>

            {/* <View
        style={{
          top: 330,
          right: customOption ? scaledHorizontal(40) : scaledHorizontal(30),
          position: "absolute",
          backgroundColor: colors.black,
          flexDirection: "row",
          paddingVertical: scaledVertical(8),
          paddingHorizontal: scaledHorizontal(10),
          borderRadius: 100,
        }}
      >
        <Text color={colors.white} size={11}>
          {currentIndex >= 9 ? "" : "0"}
          {currentIndex + 1} /{" "}
        </Text>
        <Text color={colors.white} size={11} style={{ opacity: 0.7 }}>
          {placeholder >= 9 ? "" : "0"}
          {placeholder}
        </Text>
      </View> */}
        </>
    );
};

export default Options;
