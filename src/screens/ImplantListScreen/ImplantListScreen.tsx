import BaseCard from "components/BaseCard";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import images from "configs/images";
import React from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

const mockData = [
    {
        id: 1,
        teeth_number: 17,
        title: "오른쪽큰어금니",
        category_name: "Fixture",
        description: "Fixture 4.5x11.5mm",
        date: "2021.07.20",
        status: 1
    },
    {
        id: 2,
        teeth_number: 26,
        title: "왼쪽큰어금니",
        category_name: "CategoryName",
        description: "상품명 나오는 텍스트 구역상품 명 나 오는 텍스트 구역 상품…",
        date: "2021.07.20",
        status: 2
    },
    {
        id: 3,
        teeth_number: 27,
        title: "왼쪽큰어금니",
        category_name: "CategoryName",
        description: "상품명 나오는 텍스트 구역상품 명 나 오는 텍스트 구역 상품…",
        date: "2021.07.20",
        status: 3
    }
];

const _renderColorStatus = (status: number) => {
    let colors = "#3ca8e4";

    if (status === 2) {
        colors = "#f7485e";
    }

    if (status === 3) {
        colors = "#63be10";
    }

    return colors
}

const ImplantListScreen = () => {
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
                        <Text size={13} color="#000">김한솔 / 920101-1******</Text>
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
                        <Text size={13} color="#000">2022.08.03</Text>
                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <Text size={13} color="#555">수술예정 치아 수량</Text>
                        <Text size={13} color="#000">총 <Text size={13} color="#ec524f">3</Text>개</Text>
                    </View>
                </BaseCard>
            </View>
            <Space height={30} />
            <ScrollView>
                <View>
                    {mockData && mockData.map((item, idx) => (
                        <View key={idx} style={{ paddingHorizontal: 20 }}>
                            <Text size={13}
                                style={{
                                    marginBottom: 10,
                                    fontWeight: "bold"
                                }}>
                                {idx + 1}. [{item?.teeth_number}] {item?.title}
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
                                        backgroundColor: _renderColorStatus(item?.status),
                                        width: 18,
                                        marginRight: 18
                                    }}
                                >
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginRight: 12,
                                        width: 260
                                    }}
                                >
                                    <Image source={images.abutmentExample} style={{ width: 70, height: 70, alignSelf: "center" }} />
                                    <View
                                        style={{
                                            paddingHorizontal: 12,
                                            marginTop: 15,
                                        }}
                                    >
                                        <Text size={12} color="#616161">{item?.category_name}</Text>
                                        <Text size={14} style={{ fontWeight: "bold" }} numberOfLines={2}>{item?.description}</Text>
                                        <Text size={12} color="#aaa" numberOfLines={2} style={{ position: "absolute", bottom: 12, left: 12 }}>{item?.date}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ImplantListScreen;
