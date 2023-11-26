import BaseModal from "components/BaseModal";
import Button from "components/Button";
import Space from "components/Space";
import Text from "components/Text";
import api from "configs/api";
import colors from "configs/colors";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { onSaveHospital } from "stores/hospital/hospitalSlice";
import { ListUserHospitalType } from "types/UserTypes";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { useAuth } from "utils/hooks/UseAuth";

const PickHospitalScreen = () => {
    const [openModal, setOpenModel] = useState(false);
    const [itemSelected, setItemSelected] = useState({} as any);
    const [dataHospital, setDataHospital] = useState({} as ListUserHospitalType);
    const { token } = useAuth();
    const dispatch = useDispatch();

    const _getDataHospital = async () => {
        const result = await api.getHospital(token);
        if (result?.data?.ok) {
            setDataHospital(result?.data);
            if (result?.data?.data?.length > 0) {
                setItemSelected(result?.data?.data[0])
                dispatch(onSaveHospital(result?.data?.data[0]));
            }
        }
    }

    const selectHospital = (item: any) => {
        setItemSelected(item);
        dispatch(onSaveHospital(item));
    }

    useEffect(() => {
        _getDataHospital();
    }, []);

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
                                NavigationService.jump("TabNavigator");
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
                    {dataHospital?.data?.length > 0 && dataHospital?.data?.map((item, idx) => (
                        <TouchableOpacity
                            onPress={() => {
                                selectHospital(item)
                            }}
                            // onPress={() => NavigationService.navigate("HospitalDetailScreen")}
                            key={idx}
                            style={{
                                height: 70,
                                backgroundColor: itemSelected?.id === item?.id ? "#0f1e3d" : "#fff",
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
                            <Text style={{ fontWeight: "bold" }} size={15} color={itemSelected?.id === item?.id ? "#f2dca8" : "#000"}>{item?.name}</Text>
                            {/* <Image tintColor={idx === 0 ? "#fff" : "#0f1e3d"} style={{ width: 7, height: 12 }} source={icons.arrowRight} resizeMode="contain" /> */}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <Button
                onPress={() => {
                    setOpenModel(true)
                }}
                title="선택완료"
                textStyle={{
                    color: "#000",
                    fontWeight: "bold"
                }}
                disabled={!itemSelected}
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
