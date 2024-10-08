import BaseCard from "components/BaseCard";
import Space from "components/Space";
import Text from "components/Text";
import api from "configs/api";
import colors from "configs/colors";
import icons from "configs/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreStateType } from "stores";
import { onGetUnreadNotification } from "stores/persist/notificationSlice";
import { useAuth } from "utils/hooks/UseAuth";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { convertDate, convertDateHours, ObjectToURLSnake } from "utils/Utils";

const NotificationScreen = () => {
    const dispatch = useDispatch();
    const { height } = Dimensions.get('window');
    const { token } = useAuth();
    const [firstLoad, setFirstLoad] = useState(true);
    const [dataNotification, setDataNotification] = useState({} as any);
    const [_, setMetaNotification] = useState({} as any);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const { isGetNotification } = useSelector((state: StoreStateType) => state.notification)

    const _getDataNotifications = async (page: any) => {
        setLoading(true);

        const params = {
            page: page,
            pageSize: 15,
        } as any;
        const queryParams = ObjectToURLSnake(params);
        await api.getNotifications(token, queryParams).then(async (result) => {

            const groupedNotifications: { [key: string]: any[] } = {};
            result?.data?.data?.map((value: any) => {
                const notificationDate = new Date(value.createdAt);
                let groupKey: string;

                if (isToday(notificationDate)) {
                    groupKey = '오늘';
                } else {
                    groupKey = notificationDate?.toISOString().split('T')[0] || ''; // Ambil tanggal ISO
                    groupKey = convertDate(groupKey);
                }

                if (!groupedNotifications[groupKey]) {
                    groupedNotifications[groupKey] = [];
                }

                groupedNotifications[groupKey]?.push(value);
            })

            console.log(groupedNotifications);
            setDataNotification(groupedNotifications);
            // setDataNotification((prevData: any) => [...prevData, ...result?.data?.data])
            setMetaNotification(result?.data?.metadata)
            setPage(result?.data?.metadata?.page)

            await api.readAllNotification(token).then(() => {
                dispatch(onGetUnreadNotification(0));
            });
        }).finally(() => {
            setLoading(false);
            setFirstLoad(false);
        });
    }

    const _renderTextNotification = (data: any) => {
        let title = "";
        let message = "";

        const surgeryConst: any = {
            1: {
                title: "초진검진"
            },
            2: {
                title: "1차 수술"
            },
            3: {
                title: "2차 수술"
            },
            4: {
                title: "본뜨기"
            },
            5: {
                title: "중간과정"
            },
            6: {
                title: "보철세팅"
            },
            7: {
                title: "검진"
            },
        };

        if (data?.message === "Surgery created.") {
            title = `${surgeryConst?.[data?.userSurgeryDetail?.type]?.title}(${data?.userSurgeryDetail?.sort}회차) 예약`;
            message = `${moment(data?.userSurgeryDetail?.reservatedAt).format("YYYY")}년 ${moment(data?.userSurgeryDetail?.reservatedAt).format("MM")}월 ${moment(data?.userSurgeryDetail?.reservatedAt).format("DD")}일 ${moment(data?.userSurgeryDetail?.reservatedAt).format("HH:mm")}에 예약되었습니다.`;
        }

        if (data?.message?.includes("Surgery schedule changed")) {
            const splitText = data?.message?.split(" ");
            title = `예약일정 변경`;
            message = `${surgeryConst?.[data?.userSurgeryDetail?.type]?.title}(${data?.userSurgeryDetail?.sort}회차)이 ${moment(splitText?.[4]).format("YYYY")}년 ${moment(splitText?.[4]).format("MM")}월 ${moment(splitText?.[4]).format("DD")}일 ${moment(splitText?.[4]).format("HH:mm")}으로 일정이 변경되었습니다.`;
        }

        if (data?.message === "One day prior notif.") {
            title = `${surgeryConst?.[data?.userSurgeryDetail?.type]?.title}(${data?.userSurgeryDetail?.sort}회차) 예약 - 1일 전`;
            message = `${moment(data?.userSurgeryDetail?.reservatedAt).format("YYYY")}년 ${moment(data?.userSurgeryDetail?.reservatedAt).format("MM")}월 ${moment(data?.userSurgeryDetail?.reservatedAt).format("DD")}일 ${moment(data?.userSurgeryDetail?.reservatedAt).format("HH:mm")} 예약 1일 전입니다. 예약 시간에 방문해주시기를 바랍니다. 만약 예약 변경이 필요할 경우, 병원으로 연락해주세요.`;
        }

        if (data?.message === "Seven days prior notif.") {
            title = `${surgeryConst?.[data?.userSurgeryDetail?.type]?.title}(${data?.userSurgeryDetail?.sort}회차) 예약 - 7일 전`;
            message = `${moment(data?.userSurgeryDetail?.reservatedAt).format("YYYY")}년 ${moment(data?.userSurgeryDetail?.reservatedAt).format("MM")}월 ${moment(data?.userSurgeryDetail?.reservatedAt).format("DD")}일 ${moment(data?.userSurgeryDetail?.reservatedAt).format("HH:mm")} 예약 7일 전입니다. 예약 변경이 필요할 경우, 병원으로 연락해주세요.`;
        }

        if (data?.message === "Phone number changed.") {
            title = `휴대전화 번호 변경 완료`;
            message = `${data?.user?.name}에서 ${moment(data?.createdAt).format("YYYY")}년 ${moment(data?.createdAt).format("MM")}월 ${moment(data?.createdAt).format("DD")}일 ${moment(data?.createdAt).format("HH:mm")}에 로그인 계정 정보인 '휴대전화 번호'가 변경되었습니다. 앞으로 변경된 휴대전화 번호로 로그인해주세요.`
        }

        return { title, message };
    }

    const _readNotification = async (id: string) => {
        await api.getNotificationDetail(token, id).then((result) => { });
    }

    function isToday(someDate: any) {
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear();
    }

    useEffect(() => {
        if (isGetNotification && firstLoad) {
            _getDataNotifications(page);
        }
    }, [isGetNotification]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", height: height }}>
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
                    width: "100%",
                }}>
                    <TouchableOpacity onPress={() => NavigationService.back()} style={{ flexDirection: "row", backgroundColor: "#fff" }}>
                        <View
                            style={{
                                width: 10,
                                height: 18,
                                marginRight: 16
                            }}
                        >
                            <Image source={icons.arrowLeft} style={{ width: 10, height: 18 }} resizeMode="cover" />
                        </View>
                        <Text>알림</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Space height={10} />
            {isLoading ? (
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <ActivityIndicator size={"large"} color={"#0f1e3d"} />
                </View>
            ) : dataNotification ? (
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 20
                    }}
                >
                    <ScrollView>
                        {Object.keys(dataNotification).map((dataKey, key) => (
                            <View key={key}>
                                <Text size={15} color="#000000" style={{fontWeight: "bold"}}>{dataKey}</Text>
                                <Space height={10} />
                                {dataNotification[dataKey]?.map((notification: any, idx: any) => (
                                    <BaseCard
                                        onPress={() => _readNotification(notification?.id)}
                                        key={notification?.id}
                                        style={{
                                            backgroundColor: colors.white,
                                            paddingHorizontal: 15,
                                            paddingVertical: 17,
                                            marginHorizontal: 1,
                                            marginBottom: 18
                                        }}
                                    >
                                        <Text size={14} style={{ fontWeight: "bold", marginBottom: 8 }}>{_renderTextNotification(notification).title}</Text>
                                        <Text size={13} color="#555" style={{ lineHeight: 22 }}>{_renderTextNotification(notification).message}</Text>
                                        <Space height={10} />
                                        <Text size={12} color="#999">{notification?.createdAt ? convertDateHours(notification?.createdAt) : ""}</Text>
                                    </BaseCard>

                                ))}
                            </View>


                        ))}
                        {/* {Object.keys(dataNotification).map((dataKey) => (
                            <>
                                <Text size={15} color="#000000" >{dataKey}</Text>
                                <Space height={10} />
                                {dataNotification[dataKey].map((notification: any) => (
                                    <BaseCard
                                        onPress={() => _readNotification(notification?.id)}
                                        key={notification?.id}
                                        style={{
                                            backgroundColor: colors.white,
                                            paddingHorizontal: 15,
                                            paddingVertical: 17,
                                            marginHorizontal: 1,
                                            marginBottom: 18
                                        }}
                                    >
                                        <Text size={14} style={{ fontWeight: "bold", marginBottom: 8 }}>{_renderTextNotification(notification).title}</Text>
                                        <Text size={13} color="#555" style={{ lineHeight: 22 }}>{_renderTextNotification(notification).message}</Text>
                                        <Space height={10} />
                                        <Text size={12} color="#999">{notification?.createdAt ? convertDateHours(notification?.createdAt) : ""}</Text>
                                    </BaseCard>
                                ))}
                            </>
                        ))} */}
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginVertical: 20
                            }}
                        >
                            <Text size={12} color="#999999">최대 15일 간의 내역만 조회 됩니다.</Text>
                        </View>
                    </ScrollView>
                    {/* <FlatList
                        data={dataNotification}
                        style={{
                            paddingHorizontal: 16,

                        }}
                        keyExtractor={(item) => item.id.toString()}
                        initialNumToRender={10}
                        renderItem={({ item }) => (
                            <BaseCard
                                onPress={() => _readNotification(item?.id)}
                                key={item?.id}
                                style={{
                                    backgroundColor: colors.white,
                                    paddingHorizontal: 15,
                                    paddingVertical: 17,
                                    marginHorizontal: 1,
                                    marginBottom: 18
                                }}
                            >
                                <Text size={14} style={{ fontWeight: "bold", marginBottom: 8 }}>{_renderTextNotification(item).title}</Text>
                                <Text size={13} color="#555" style={{ lineHeight: 22 }}>{_renderTextNotification(item).message}</Text>
                                <Space height={10} />
                                <Text size={12} color="#999">{item?.createdAt ? convertDateHours(item?.createdAt) : ""}</Text>
                            </BaseCard>
                        )}
                        // onEndReached={() => {
                        //     if (metaNotification?.lastPage > page) {
                        //         _getDataNotifications(page + 1);
                        //     }
                        // }}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() => (
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginVertical: 20
                                }}
                            >
                                <Text size={12} color="#999999">최대 15일 간의 내역만 조회 됩니다.</Text>
                            </View>
                        )}
                    /> */}
                </View>

            ) : (
                <View
                    style={{
                        marginTop: 120,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text color="#999" size={12}>최대 15일 간의 내역만 조회 됩니다.</Text>
                </View>
            )}

            {/* {dataNotification?.length > 0 ? (
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 20
                    }}
                >
                    <Text size={12} color="#999999">최대 15일 간의 내역만 조회 됩니다.</Text>
                </View>
            ) : (
                <></>
            )} */}

        </SafeAreaView>
    );
}

export default NotificationScreen;
