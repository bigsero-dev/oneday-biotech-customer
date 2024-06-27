import BaseCard from "components/BaseCard";
import Space from "components/Space";
import Text from "components/Text";
import api from "configs/api";
import colors from "configs/colors";
import icons from "configs/icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { StoreStateType } from "stores";
import { useAuth } from "utils/hooks/UseAuth";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { convertDateHours, ObjectToURLSnake } from "utils/Utils";

const NotificationScreen = () => {
    const { token } = useAuth();
    const [dataNotification, setDataNotification] = useState([] as any);
    const [metaNotification, setMetaNotification] = useState({} as any);
    const [isLoading, setLoading] = useState(false);
    const { isGetNotification } = useSelector((state: StoreStateType) => state.notification)

    const _getDataNotifications = async (page: 1) => {
        setLoading(true);

        const params = {
            page: page,
            pageSize: 10,
        } as any;
        const queryParams = ObjectToURLSnake(params);
        await api.getNotifications(token, queryParams).then((result) => {
            setDataNotification((prevData: any) => [...prevData, ...result?.data?.data])
            setMetaNotification(result?.data?.metadata)
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        if (isGetNotification) {
            _getDataNotifications(1);

        }
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
            ) : dataNotification?.length > 0 ? (
                <FlatList
                    data={dataNotification}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <BaseCard
                            key={item?.id}
                            style={{
                                backgroundColor: colors.white,
                                paddingHorizontal: 15,
                                paddingVertical: 17,
                                marginHorizontal: 1,
                                marginBottom: 18
                            }}
                        >
                            <Text size={14} style={{ fontWeight: "bold", marginBottom: 8 }}>{item?.title}</Text>
                            <Text size={13} color="#555" style={{ lineHeight: 22 }}>{item?.contents}</Text>
                            <Space height={10} />
                            <Text size={12} color="#999">{item?.sentAt ? convertDateHours(item?.sentAt) : ""}</Text>
                        </BaseCard>
                    )}
                    onEndReached={() => _getDataNotifications(metaNotification?.page + 1)}
                    onEndReachedThreshold={0.1}
                />
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
        </SafeAreaView>
    );
}

export default NotificationScreen;
