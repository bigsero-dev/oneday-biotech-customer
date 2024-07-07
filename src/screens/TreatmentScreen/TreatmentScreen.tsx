import Space from "components/Space";
import Text from "components/Text";
import icons from "configs/icons";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native"
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import Ongoing from "./TreatmentTab/Ongoing";
import Completed from "./TreatmentTab/Completed";
import NavigationService from "utils/NavigationService";
import api from "configs/api";
import { useAuth } from "utils/hooks/UseAuth";
import { ObjectToURLSnake } from "utils/Utils";

const TreatmentScreen = () => {
    const [tab, setTab] = useState("치료중");
    const { token, userData } = useAuth();
    const [dataOngoing, setDataOngoing] = useState([] as any);
    const [pageOngoing, setPageOngoing] = useState(1);
    const [dataCompleted, setDataCompleted] = useState([] as any);
    const [pageCOmpleted, setPageCompleted] = useState(1);
    const [metaNotification, setMetaNotification] = useState({} as any);

    const _getDataNotifications = async () => {
        const params = {
            page: 1,
            pageSize: 10,
        } as any;
        const queryParams = ObjectToURLSnake(params);
        await api.getNotifications(token, queryParams).then((result) => {
            setMetaNotification(result?.data?.metadata)
        });
    }

    const _getDataOngoing = async () => {
        const params = {
            page: pageOngoing,
            pageSize: 10,
            surgeryStatus: 'RESERVATION',
            orderBy: 'RESERVATED_AT_DESC'
        } as any;
        const queryParams = ObjectToURLSnake(params);
        const result = await api.getHistorySurgery(token, queryParams);
        if (result?.data?.ok) {
            setDataOngoing((prevData: any) => [...prevData, ...result?.data?.data]);
        }
    }

    const _getDataCompleted = async () => {
        const params = {
            page: pageCOmpleted,
            pageSize: 10,
            surgeryStatus: 'COMPLETE',
            orderBy: 'RESERVATED_AT_DESC'
        } as any;
        const queryParams = ObjectToURLSnake(params);

        const result = await api.getHistorySurgery(token, queryParams);
        if (result?.data?.ok) {
            setDataCompleted((prevData: any) => [...prevData, ...result?.data?.data]);
        }
    }

    const handleLoadMoreOngoing = () => {
        setPageOngoing(pageOngoing + 1);
    };

    const handleLoadMoreCompleted = () => {
        setPageCompleted(pageCOmpleted + 1);
    };

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

    useEffect(() => {
        _getDataOngoing();
        _getDataCompleted();
        _getDataNotifications();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View
                style={{
                    paddingHorizontal: scaledHorizontal(20),
                    paddingVertical: scaledVertical(18),
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 55,
                }}>
                <View>
                    <Text style={{ fontWeight: "bold" }}>진료내역</Text>
                </View>
                <TouchableOpacity
                    onPress={() => NavigationService.navigate("NotificationScreen")}
                    style={{ width: 18, height: 20, justifyContent: "center", alignItems: "center" }}
                >
                    <Image source={icons.bell} style={{ width: 18, height: 20 }} resizeMode="contain" />
                    {metaNotification?.totalUnread > 0 && (
                        <View style={{ width: 7, height: 7, backgroundColor: "#e11818", borderRadius: 7 / 2, position: "absolute", top: 0, right: 0 }}>

                        </View>
                    )}

                </TouchableOpacity>
            </View>
            <View style={{
                paddingHorizontal: scaledHorizontal(20),
                paddingVertical: scaledVertical(28),
                backgroundColor: "#0f1e3d",
                height: 100,
                justifyContent: "center",
            }}>
                <Text color="#fff" size={18} style={{ fontWeight: "bold" }}>{userData?.name}</Text>
                {/* <Text color="#fff" size={16}>{userData?.contact}</Text> */}
                <Text color="#fff" size={16}>{renderPhone(userData?.citizenNo)}</Text>
            </View>
            <Space height={20} />
            <View style={{
                paddingHorizontal: scaledHorizontal(20),
                paddingTop: scaledVertical(12),
                borderBottomColor: "#ddd",
                borderBottomWidth: 1,
                height: 40,
                flexDirection: "row"
            }}>
                <TouchableOpacity onPress={() => setTab("치료중")} style={{
                    borderBottomColor: "#000",
                    borderBottomWidth: tab === "치료중" ? 1 : 0,
                    marginRight: scaledHorizontal(30)
                }}>
                    <Text color={tab === "치료중" ? "#000" : "#767676"} size={14} style={{ fontWeight: tab === "치료중" ? "bold" : "500" }} >치료중</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab("완료")} style={{
                    borderBottomColor: "#000",
                    borderBottomWidth: tab === "완료" ? 1 : 0
                }}>
                    <Text color={tab === "완료" ? "#000" : "#767676"} size={14} style={{ fontWeight: tab === "완료" ? "bold" : "500" }}>완료</Text>
                </TouchableOpacity>
            </View>
            <Space height={23} />
            <View>
                {tab === "치료중" ? (
                    <Ongoing data={dataOngoing} handleLoadMore={handleLoadMoreOngoing} />
                ) : (
                    <Completed data={dataCompleted} handleLoadMore={handleLoadMoreCompleted} />
                )}
            </View>
        </SafeAreaView>
    );
}

export default TreatmentScreen;
