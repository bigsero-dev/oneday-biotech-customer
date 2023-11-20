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
const PickHospitalScreen = () => {
    const [openModal, setOpenModel] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <BaseModal
                contentStyle={{ paddingBottom: 0, paddingHorizontal: 0, borderRadius: 2, height: 332 }}
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
                    <Text textAlign="center" size={14} color="#616161">선택된 병원으로 진료 일정을{"\n"}
                        연결하시겠습니까? </Text>
                    <Space height={25} />
                    <Text size={14} textAlign="center" color="#c91b17">※ 다른 병원으로 변경하실 경우,{"\n"}
                        '마이페이지&gt;병원 목록'에서 {"\n"}
                        '병원 변경하기'를 해주세요.</Text>
                    <Space height={32} />
                    <View
                        style={{
                            flexDirection: "row"
                        }}
                    >
                        <Button
                            onPress={() => setOpenModel(false)}
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
                                setOpenModel(false);
                                NavigationService.navigate("TabNavigator", { screen: "Home" });
                            }}
                            textStyle={{
                                color: colors.black,
                                fontWeight: "bold"
                            }}
                            title="선택완료"
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
                    <TouchableOpacity style={{ flexDirection: "row", }}>
                        <Text style={{ fontWeight: "bold" }}>병원 목록 선택</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Space height={10} />
            <View
                style={{
                    paddingHorizontal: 20
                }}
            >
                <Text size={13} color="#555">HOME에 연결하기 위한 병원을 선택해주세요.</Text>
                <Space height={18} />
                <ScrollView>
                    {mockData && mockData.map((item, idx) => (
                        <TouchableOpacity
                            // onPress={() => NavigationService.navigate("HospitalDetailScreen")}
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
                            {/* <Image tintColor={idx === 0 ? "#fff" : "#0f1e3d"} style={{ width: 7, height: 12 }} source={icons.arrowRight} resizeMode="contain" /> */}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <Button
                onPress={() => {
                    setOpenModel(true)
                }}
                title="보증서 다운"
                textStyle={{
                    color: "#000",
                    fontWeight: "bold"
                }}
                style={{
                    borderRadius: 2,
                    height: 55,
                    backgroundColor: "#f2dca8",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    zIndex: 9999
                }}
            />
        </SafeAreaView>
    )
        ;
}

export default PickHospitalScreen;
