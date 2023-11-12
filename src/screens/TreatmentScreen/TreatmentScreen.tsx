import Space from "components/Space";
import Text from "components/Text";
import icons from "configs/icons";
import { useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native"
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import Ongoing from "./TreatmentTab/Ongoing";
import Completed from "./TreatmentTab/Completed";
import NavigationService from "utils/NavigationService";

const TreatmentScreen = () => {
    const [tab, setTab] = useState("치료중");

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
                    <View style={{ width: 7, height: 7, backgroundColor: "#e11818", borderRadius: 7 / 2, position: "absolute", top: 0, right: 0 }}>

                    </View>
                </TouchableOpacity>
            </View>
            <View style={{
                paddingHorizontal: scaledHorizontal(20),
                paddingVertical: scaledVertical(28),
                backgroundColor: "#0f1e3d",
                height: 100,
                justifyContent: "center",
            }}>
                <Text color="#fff" size={18} style={{ fontWeight: "bold" }}>Antony Santos</Text>
                <Text color="#fff" size={16}>910926-2******</Text>
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
                    <Ongoing />
                ) : (
                    <Completed />
                )}
            </View>
        </SafeAreaView>
    );
}

export default TreatmentScreen;
