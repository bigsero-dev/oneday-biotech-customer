import BaseCard from "components/BaseCard";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

const mockData = [
    {
        id: 1,
        date: "오늘",
        data_notif: [
            {
                title: "초진검진(1회차) 예약 - 1일 전",
                description: "2022년 11월 14일 09:30 예약 1일 전입니다. 예약 시간에 방문해주시기를 바랍니다. 만약 예약 변경이 필요할 경우, 병원으로 연락해주세요.",
                created_at: "2022.11.14 09:30"
            }
        ],
    },
    {
        id: 2,
        date: "2022.11.07",
        data_notif: [
            {
                title: "초진검진(1회차) 예약 - 7일 전",
                description: "2022년 11월 14일 09:30 예약 7일 전입니다. 예약 변경이 필요할 경우, 병원으로 연락해주세요.",
                created_at: "2022.11.07 09:00"
            }
        ],
    },
    {
        id: 3,
        date: "2022.11.01",
        data_notif: [
            {
                title: "예약일정 변경",
                description: "검진(1회차)이 2022년 11월 14일 09:30으로 일정이 변경되었습니다.",
                created_at: "2022.11.01 13:45"
            },
            {
                title: "초진검진(1회차) 예약",
                description: "2022년 11월 15일 13:30에 예약되었습니다.",
                created_at: "2022.11.01 09:14"
            }
        ],
    },
    {
        id: 4,
        date: "2022.11.02",
        data_notif: [
            {
                title: "휴대전화 번호 변경 완료",
                description: "한마음임플란트치과에서 2022년 11월 02일 17:30에 로그인 계정 정보인 '휴대전화 번호'가 변경되었습니다. 앞으로 변경된 휴대전화 번호로 로그인해주세요.",
                created_at: "2022.11.01 13:45"
            }
        ],
    }
];
const NotificationScreen = () => {

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
                        <Text style={{ fontWeight: "bold" }}>알림</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Space height={10} />
            <ScrollView
                style={{
                    paddingHorizontal: 20
                }}
            >
                {mockData && mockData?.map((item, idx) => (
                    <View key={item?.id}>
                        <Text size={15} style={{ fontWeight: "bold" }}>{item?.date}</Text>
                        <Space height={10} />
                        {item?.data_notif?.map((itm, id) => (
                            <BaseCard
                                key={id}
                                style={{
                                    backgroundColor: colors.white,
                                    paddingHorizontal: 15,
                                    paddingVertical: 17,
                                    marginHorizontal: 1,
                                    marginBottom: 18
                                }}
                            >
                                <Text size={14} style={{ fontWeight: "bold" }}>{itm?.title}</Text>
                                <Text size={13} color="#555">{itm?.description}</Text>
                                <Space height={10} />
                                <Text size={12} color="#999">{itm?.created_at}</Text>
                            </BaseCard>
                        ))}
                        <Space height={38} />
                    </View>
                ))}
                <Text textAlign="center" color="#999" size={12}>최대 15일 간의 내역만 조회 됩니다.</Text>
                <Space height={48} />
            </ScrollView>
        </SafeAreaView>
    )
        ;
}

export default NotificationScreen;
