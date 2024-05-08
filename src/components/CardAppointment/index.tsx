import Space from "components/Space";
import Text from "components/Text";
import icons from "configs/icons";
import React from "react";
import { Image, TouchableOpacity, View, ViewStyle } from "react-native";
import { scaledHorizontal } from "utils/ScaledService";

interface CardHomeProps {
    index: number;
    sideColor: string;
    date: string;
    status: string;
    step: string;
    style?: ViewStyle;
}

const CardAppointment = ({ index, sideColor, date, status, step, style }: CardHomeProps) => {
    return (
        <View
            key={index}
            style={[style, {
                flexDirection: "row",
                backgroundColor: "#fff",
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 5,
                height: 92,
                justifyContent: "space-between",
            }]}
        >
            <View style={{ flexDirection: "row" }}>
                <View
                    style={{
                        width: 8,
                        backgroundColor: sideColor,
                        height: 92,
                        marginRight: scaledHorizontal(18)
                    }}
                >
                </View>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: scaledHorizontal(18)
                }}>
                    <Text color="#555" size={13}>예약일시</Text>
                    <Space height={8} />
                    <Text color="#555" size={13}>수술과정</Text>
                    <Space height={8} />
                    <Text color="#555" size={13}>진행상황</Text>
                </View>
                <View style={{
                    justifyContent: "center",
                    marginRight: scaledHorizontal(18)
                }}>
                    <Text color="#000" size={13}>{date}</Text>
                    <Space height={8} />
                    <Text color="#000" size={13}>{status}</Text>
                    <Space height={8} />
                    <Text color="#000" size={13}>{step}</Text>
                </View>
            </View>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: scaledHorizontal(18)
                }}
            >
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 50,
                        height: 50,
                        // backgroundColor: "#f2f2f4",
                        borderRadius: 50 / 2
                    }}
                >
                    <Image source={icons.clipBoard} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CardAppointment;
