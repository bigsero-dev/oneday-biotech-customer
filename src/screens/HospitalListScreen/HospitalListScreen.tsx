import Space from "components/Space";
import Text from "components/Text";
import icons from "configs/icons";
import React from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

const HospitalListScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{
                height: 55,
                paddingHorizontal: scaledHorizontal(20),
                paddingVertical: scaledVertical(18),
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <View style={{ flexDirection: "row", }}>
                        <TouchableOpacity
                            onPress={() => NavigationService.back()}
                            style={{
                                width: 10,
                                height: 18,
                                marginRight: 16
                            }}
                        >
                            <Image source={icons.arrowLeft} style={{ width: 10, height: 18 }} resizeMode="cover" />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: "bold" }}>병원 목록</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: 139,
                            height: 29,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 5,
                            backgroundColor: "#4471c4"
                        }}
                    >
                        <Text size={12} color="#fff">임플란트 병원 변경하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Space height={10} />
            <View
                style={{
                    paddingHorizontal: 20
                }}
            >
                <Text size={13} color="#555">더보기를 누르면, 병원 상세정보를 볼 수 있습니다.</Text>
                <Space height={18} />
                <ScrollView>
                    <TouchableOpacity
                        style={{
                            height: 70,
                            backgroundColor: "#0f1e3d",
                            borderRadius: 2,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingHorizontal: 15,
                            paddingVertical: 26,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                            elevation: 3,
                            marginHorizontal: 1,
                            marginBottom: 12
                        }}
                    >
                        <Text style={{ fontWeight: "bold" }} size={15} color="#f2dca8">원데이 치과</Text>
                        <Image tintColor={"#fff"} style={{ width: 7, height: 12 }} source={icons.arrowRight} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 70,
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingHorizontal: 15,
                            paddingVertical: 26,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                            elevation: 3,
                            marginHorizontal: 1,
                            marginBottom: 12
                        }}
                    >
                        <Text style={{ fontWeight: "bold" }} size={15}>원데이 치과</Text>
                        <Image tintColor={"#0f1e3d"} style={{ width: 7, height: 12 }} source={icons.arrowRight} resizeMode="contain" />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
        ;
}

export default HospitalListScreen;
