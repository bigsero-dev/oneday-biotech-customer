import BaseModal from "components/BaseModal";
import Button from "components/Button";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

const mockData = [
    {
        id: 1,
        title: "원데이 치과"
    },
    {
        id: 2,
        title: "원데이 치과"
    },
];
const HospitalListScreen = () => {
    const [openModal, setOpenModel] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <BaseModal
                contentStyle={{ paddingBottom: 0, paddingHorizontal: 0, borderRadius: 2, height: 280 }}
                showModal={openModal}
                animation="slide"
                onBackdropPress={() => setOpenModel(false)}
                onBackButtonPress={() => setOpenModel(false)}
            >
                <View
                    style={{
                        backgroundColor: colors.white,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 41
                    }}
                >
                    <Text size={18} style={{ fontWeight: "bold" }}>병원 정보 확인</Text>
                    <Space height={25} />
                    <Text size={14} color="#616161">변경할 병원 정보가 없습니다.</Text>
                    <Space height={25} />
                    <Text size={14} textAlign="center" color="#c91b17">※ 이용 중인 병원이 1곳인 경우에는 다른 병원으로 변경하기가 불가능합니다.</Text>
                </View>
                <Button
                    onPress={() => setOpenModel(false)}
                    title="확인"
                    textStyle={{
                        color: "#000",
                        fontWeight: "bold"
                    }}
                    style={{
                        borderRadius: 2,
                        height: 55,
                        backgroundColor: "#f2dca8"
                    }}
                />
            </BaseModal>
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
                    <TouchableOpacity onPress={() => NavigationService.back()} style={{ flexDirection: "row", }}>
                        <TouchableOpacity
                            style={{
                                width: 10,
                                height: 18,
                                marginRight: 16
                            }}
                        >
                            <Image source={icons.arrowLeft} style={{ width: 10, height: 18 }} resizeMode="cover" />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: "bold" }}>병원 목록</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (mockData.length > 1) {
                                NavigationService.navigate("ChangeHospitalScreen")
                            } else {
                                setOpenModel(true)
                            }
                        }}
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
                    {mockData && mockData.map((item, idx) => (
                        <TouchableOpacity
                            key={idx}
                            style={{
                                height: 70,
                                backgroundColor: idx === 0 ? "#0f1e3d" : "#fff",
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
                            <Text style={{ fontWeight: "bold" }} size={15} color={idx === 0 ? "#f2dca8" : "#000"}>{item?.title}</Text>
                            <Image tintColor={idx === 0 ? "#fff" : "#0f1e3d"} style={{ width: 7, height: 12 }} source={icons.arrowRight} resizeMode="contain" />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
        ;
}

export default HospitalListScreen;
