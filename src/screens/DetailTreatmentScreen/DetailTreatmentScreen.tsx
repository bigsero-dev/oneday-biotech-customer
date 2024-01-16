import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import BaseModal from "components/BaseModal";
import Button from "components/Button";
import Space from "components/Space";
import Text from "components/Text";
import api from "configs/api";
import colors from "configs/colors";
import icons from "configs/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "types/NavigatorTypes";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { ConvertStepToText } from "utils/Utils";
import { useAuth } from "utils/hooks/UseAuth";

type DetailTreatmentScreenRouteType = RouteProp<RootStackParamList, "DetailTreatmentScreen">;

type DetailTreatmentScreenNavigationProps = StackNavigationProp<
    RootStackParamList,
    "DetailTreatmentScreen"
>;

type Prop = {
    route: DetailTreatmentScreenRouteType;
    navigation: DetailTreatmentScreenNavigationProps;
};

const DetailTreatmentScreen = ({ route }: Prop) => {
    const { type, userHistoryDetail } = route?.params;
    const dataHistory = userHistoryDetail?.userSurgeryDetail?.slice(-2);
    const dataOngoing = dataHistory?.[dataHistory?.length - 1];
    const { token } = useAuth();

    const [tab, setTab] = useState("예약관리");
    const [xray, setXray] = useState([] as any);
    const [dataWarranty, setDataWarranty] = useState([] as any);
    const [openModalEmpty, setOpenModalEmpty] = useState(false);

    const getDataSurgery = async () => {
        const result = await api.getUserSurgeryHistory(token, userHistoryDetail?.id || "");
        if (result?.data?.ok) {
            const xrayData = result?.data?.data?.userSurgeryHistoryForm?.filter((item: any) => item?.type === "XRAY");
            const warrantyData = result?.data?.data?.userSurgeryHistoryForm?.filter((item: any) => item?.type !== "XRAY");
            setXray(xrayData);
            setDataWarranty(warrantyData);
        }
    }

    useEffect(() => {
        getDataSurgery();
    }, []);

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#fff"
        }}>
            <View style={{
                height: 55,
                paddingHorizontal: scaledHorizontal(20),
                paddingVertical: scaledVertical(18),
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
            }}>
                <TouchableOpacity
                    onPress={() => NavigationService.back()}
                    style={{
                        flexDirection: "row",
                    }}>
                    <View
                        style={{
                            width: 10,
                            height: 18,
                            marginRight: 16
                        }}
                    >
                        <Image source={icons.arrowLeft} style={{ width: 10, height: 18 }} resizeMode="cover" />
                    </View>
                    <Text style={{ fontWeight: "bold" }}>진료상세</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity
                        onPress={() => NavigationService.navigate("TabNavigator", { screen: "Home" })}
                        style={{
                            width: 25,
                            height: 22
                        }}
                    >
                        <Image source={icons.home} style={{ width: 25, height: 22 }} resizeMode="cover" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={{
                    paddingHorizontal: scaledHorizontal(20),
                    paddingTop: scaledVertical(12),
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                    height: 40,
                    flexDirection: "row"
                }}>
                    <TouchableOpacity onPress={() => setTab("예약관리")} style={{
                        borderBottomColor: "#000",
                        borderBottomWidth: tab === "예약관리" ? 1 : 0,
                        marginRight: scaledHorizontal(30)
                    }}>
                        <Text size={13} color={tab === "예약관리" ? "#000" : "#767676"} style={{ fontWeight: tab === "예약관리" ? "bold" : "500" }} >예약관리</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab("상세내역")}
                        style={{
                            borderBottomColor: "#000",
                            borderBottomWidth: tab === "상세내역" ? 1 : 0
                        }}>
                        <Text size={13} color={tab === "상세내역" ? "#000" : "#767676"} style={{ fontWeight: tab === "상세내역" ? "bold" : "500" }}>상세내역</Text>
                    </TouchableOpacity>
                </View>
                <Space height={24} />
                <View
                    style={{
                        flexDirection: "row",
                        marginHorizontal: scaledHorizontal(20),
                        justifyContent: "center"
                    }}
                >
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                            elevation: 5,
                            width: 185,
                            height: 60
                        }}
                    >
                        <Text size={13}>수술예정 치아 수량</Text>
                        <Text size={13} style={{ fontWeight: "bold" }}>총 <Text color="#ec524f">{userHistoryDetail?.userTeeth?.length || 0}</Text>개</Text>
                    </View>
                    <Space width={10} />
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                            elevation: 5,
                            width: 125,
                            height: 60
                        }}
                    >
                        <Text size={13}>주치의</Text>
                        <Text size={13} style={{ fontWeight: "bold" }}>{userHistoryDetail?.hospitalMember?.name}</Text>
                    </View>
                </View>

                <Space height={12} />

                <TouchableOpacity
                    onPress={() => NavigationService.navigate("ImplantListScreen", { historyId: userHistoryDetail?.id })}
                    style={{
                        height: 35,
                        backgroundColor: (userHistoryDetail?.userTeeth?.length || 0) < 1 ? "#ddd" : "#fff",
                        borderWidth: 1,
                        borderColor: (userHistoryDetail?.userTeeth?.length || 0) < 1 ? "#ccc" : "#0070ef",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 320,
                        marginHorizontal: scaledHorizontal(20),
                        alignSelf: "center"
                    }}
                    disabled={(userHistoryDetail?.userTeeth?.length || 0) < 1}
                >
                    <Text size={13} color={(userHistoryDetail?.userTeeth?.length || 0) < 1 ? "#707070" : "#0070ef"}>임플란트 목록 확인</Text>
                </TouchableOpacity>

                <Space height={40} />

                {type === "completed" ? (
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 30
                        }}
                    >
                        <Image source={icons.check2} style={{ height: 75, width: 75 }} />
                        <Space height={22} />
                        <Text size={22} style={{ fontWeight: "bold" }}>완료되었습니다.</Text>
                        <Space height={10} />
                        <Text size={14} color="#555" textAlign="center">해당 임플란트 수술이 모두 완료되었습니다. {"\n"}자세한 사항은 병원에 문의해주세요!</Text>
                    </View>
                ) : (
                    <View style={{
                        paddingHorizontal: scaledHorizontal(20),
                    }}>
                        <View>
                            <Text style={{ fontWeight: "bold" }}>이번 진료일정</Text>
                            <Space height={10} />
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 2,
                                    elevation: 5,
                                    height: 92,
                                    justifyContent: "space-between"
                                }}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <View
                                        style={{
                                            width: 8,
                                            backgroundColor: "#83abff",
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
                                        <Text color="#000" size={13}>{new Date(dataOngoing?.reservatedAt || '') >= new Date() ? moment(dataOngoing?.reservatedAt).format('Y.M.D H:m') : "(미등록)"}</Text>
                                        <Space height={8} />
                                        <Text color="#000" size={13}>{new Date(dataOngoing?.reservatedAt || '') >= new Date() ? ConvertStepToText(userHistoryDetail?.step || '') : "(미등록)"}</Text>
                                        <Space height={8} />
                                        <Text color="#000" size={13}>{new Date(dataOngoing?.reservatedAt || '') >= new Date() ? ConvertStepToText(userHistoryDetail?.step || '') : "(미등록)"}</Text>
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
                                            borderRadius: 50 / 2
                                        }}
                                    >
                                        <Image source={icons.clipBoard} style={{ width: 50, height: 50 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Space height={36} />
                        <View>
                            <Text style={{ fontWeight: "bold" }}>다음 진료일정</Text>
                            <Space height={10} />
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 2,
                                    elevation: 5,
                                    height: 92,
                                    justifyContent: "space-between",
                                }}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <View
                                        style={{
                                            width: 8,
                                            backgroundColor: "#dddddd",
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
                                        <Text color="#000" size={13}>(미등록)</Text>
                                        <Space height={8} />
                                        <Text color="#000" size={13}>(미등록)</Text>
                                        <Space height={8} />
                                        <Text color="#000" size={13}>(미등록)</Text>
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
                        </View>
                        <Space height={10} />
                        <Text color="#999" size={12}>※ 예약일정 변경은 병원에 문의해주세요.</Text>
                    </View>
                )
                }

                {/* <View style={{
                    paddingHorizontal: scaledHorizontal(20),

                }}>
                    <Space height={10} />
                    <Text color="#999" size={12}>※ 예약일정 변경은 병원에 문의해주세요.</Text>
                </View> */}

            </ScrollView>
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    height: 50,
                    width: '100%',
                    flexDirection: "row"
                }}
            >
                <TouchableOpacity
                    onPress={() => dataWarranty?.length > 0 ? NavigationService.navigate("WarrantyScreen", { historyId: userHistoryDetail?.id }) : setOpenModalEmpty(true)}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#0f1e3d",
                        height: 50,
                        width: '50%'
                    }}
                >
                    <Text color="#fff" style={{ fontWeight: "bold" }}>보증서 보기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => xray?.length > 0 ? NavigationService.navigate("ScheduleXrayScreen", { historyId: userHistoryDetail?.id }) : setOpenModalEmpty(true)}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f2dca8",
                        height: 50,
                        width: '50%'
                    }}
                >
                    <Text color="#000" style={{ fontWeight: "bold" }}>엑스레이 보기</Text>
                </TouchableOpacity>
            </View>
            <BaseModal
                contentStyle={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingHorizontal: 0,
                    borderRadius: 2,
                    minHeight: 114,
                    width: 320,
                    alignSelf: "center"
                }}
                showModal={openModalEmpty}
                animation="slide"
                onBackdropPress={() => setOpenModalEmpty(false)}
                onBackButtonPress={() => setOpenModalEmpty(false)}
            >
                <View
                    style={{
                        backgroundColor: colors.white,
                        // flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 18
                    }}
                >
                    <Text size={15} color="#000" style={{ marginBottom: 23 }} textAlign="center">{"등록된 정보가 없습니다.\n병원에서 등록해야만 열람이 가능합니다.\n병원에 문의해주세요."}</Text>
                    <Button
                        onPress={() => setOpenModalEmpty(false)}
                        title="확인"
                        textStyle={{
                            color: "#fff",
                            // fontWeight: "bold",
                            fontSize: 13
                        }}
                        style={{
                            borderRadius: 2,
                            height: 30,
                            width: 80,
                            paddingHorizontal: 17,
                            // paddingVertical: 7,
                            backgroundColor: "#0f1e3d"
                        }}
                    />
                </View>
            </BaseModal>
        </SafeAreaView>
    );
}

export default DetailTreatmentScreen;