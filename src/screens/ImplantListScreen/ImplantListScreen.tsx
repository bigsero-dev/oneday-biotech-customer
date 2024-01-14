import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import BaseCard from "components/BaseCard";
import Space from "components/Space";
import Text from "components/Text";
import api from "configs/api";
import colors from "configs/colors";
import icons from "configs/icons";
import images from "configs/images";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "types/NavigatorTypes";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { ConvertTeethPosition, convertDate } from "utils/Utils";
import { useAuth } from "utils/hooks/UseAuth";

type ImplantListScreenRouteType = RouteProp<RootStackParamList, "ImplantListScreen">;

type ImplantListScreenNavigationProps = StackNavigationProp<
    RootStackParamList,
    "ImplantListScreen"
>;

type Prop = {
    route: ImplantListScreenRouteType;
    navigation: ImplantListScreenNavigationProps;
};

const ImplantListScreen = ({ route }: Prop) => {
    const { historyId } = route?.params;
    const { token } = useAuth();
    const [dataSurgery, setDataSurgery] = useState({} as any);
    const [firstSurgery, setDataFirstSurgery] = useState([] as any);
    const [isLoading, setIsLoading] = useState(false);

    const renderPhone = (phone: string) => {
        let result = ''
        const cleanPhoneNumber = phone?.replace(/-/g, '');

        const lengthData = cleanPhoneNumber?.length;
        const split = Math.floor(lengthData / 2);

        let part1 = cleanPhoneNumber?.slice(0, split);
        let part2 = cleanPhoneNumber?.slice(split);

        let remainingLength = part2?.length - 1;
        let replacement = '*'.repeat(remainingLength);
        result = part1 + '-' + part2?.[0] + replacement;
        return result;
    }

    const getDataSurgery = async () => {
        setIsLoading(true);
        const result = await api.getUserSurgeryHistory(token, historyId || "");
        if (result?.data?.ok) {
            setDataSurgery(result?.data?.data);

            const firstSurgeryData = result?.data?.data?.userSurgeryDetail?.filter((item: any) => item?.type === 2);
            setDataFirstSurgery(firstSurgeryData);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getDataSurgery();
    }, []);

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
                    <TouchableOpacity onPress={() => NavigationService.back()} style={{ flexDirection: "row", }}>
                        <View
                            style={{
                                width: 10,
                                height: 18,
                                marginRight: 16
                            }}
                        >
                            <Image source={icons.arrowLeft} style={{ width: 10, height: 18 }} resizeMode="cover" />
                        </View>
                        <Text style={{ fontWeight: "bold" }}>임플란트 목록</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {isLoading ? (
                <ActivityIndicator
                    size={30}
                    color={colors.darkBlue}
                />
            ) : (
                <>
                    <Space height={22} />
                    <View
                        style={{
                            paddingHorizontal: 20
                        }}
                    >
                        <BaseCard
                            style={{
                                backgroundColor: colors.white,
                                paddingHorizontal: 15,
                                paddingVertical: 17
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    marginBottom: 11
                                }}
                            >
                                <Text size={13} color="#555">환자명</Text>
                                <Text size={13} color="#000">{dataSurgery?.user?.name} / {renderPhone(dataSurgery?.user?.citizenNo)}</Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    marginBottom: 11
                                }}
                            >
                                <Text size={13} color="#555">1차 수술일</Text>
                                {firstSurgery?.length > 0 ? (
                                    <Text size={13} color="#000">{convertDate(firstSurgery?.[0]?.reservatedAt)}</Text>
                                ) : (
                                    <Text size={13} color="#000">-</Text>

                                )}
                            </View>
                            <View
                                style={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row"
                                }}
                            >
                                <Text size={13} color="#555">수술예정 치아 수량</Text>
                                <Text size={13} color="#000">총 <Text size={13} color="#ec524f">{dataSurgery?.userTeeth?.length || 0}</Text>개</Text>
                            </View>
                        </BaseCard>
                    </View>
                    <Space height={30} />
                    <ScrollView>
                        <View>
                            {dataSurgery?.userTeeth && dataSurgery?.userTeeth.map((item: any, idx: any) => (
                                <View key={idx} style={{ paddingHorizontal: 20 }}>
                                    <Text size={13}
                                        style={{
                                            marginBottom: 10,
                                            fontWeight: "bold"
                                        }}>
                                        {idx + 1}. [{item?.teethNo}] {ConvertTeethPosition(item?.teethNo)}
                                    </Text>
                                    <View
                                        style={{
                                            height: 102,
                                            borderRadius: 5,
                                            backgroundColor: "#fff",
                                            borderWidth: 1,
                                            borderColor: "#ddd",
                                            flexDirection: "row",
                                            marginBottom: 19,
                                        }}
                                    >
                                        <View
                                            style={{
                                                borderTopRightRadius: 0,
                                                borderBottomRightRadius: 0,
                                                backgroundColor: item?.productLot?.product?.color || colors.darkGray,
                                                width: 18,
                                                marginRight: 18,
                                                borderTopLeftRadius: 5,
                                                borderBottomLeftRadius: 5
                                            }}
                                        >
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                marginRight: 12,
                                                width: 290,
                                            }}
                                        >
                                            <Image source={item?.productLot?.product?.productGroup?.mainImage ? { uri: item?.productLot?.product?.productGroup?.mainImage } : images.abutmentExample} style={{ width: 70, height: 70, alignSelf: "center" }} />
                                            <View
                                                style={{
                                                    paddingHorizontal: 12,
                                                    marginTop: 15,
                                                    width: '76%'
                                                }}
                                            >
                                                <Text size={12} color="#616161">{item?.productLot?.product?.productGroup ? item?.productLot?.product?.productGroup?.productGroupCategory?.name?.toUpperCase() : '-'}</Text>
                                                <Text size={13} style={{ fontWeight: "bold", marginTop: 5 }} numberOfLines={2}>{item?.productLot?.product?.name}</Text>
                                                <Text size={12} color="#aaa" numberOfLines={2} style={{ position: "absolute", bottom: 10, left: 12 }}>{item?.createdAt ? convertDate(item?.createdAt) : '-'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </>
            )}

        </SafeAreaView>
    );
}

export default ImplantListScreen;
