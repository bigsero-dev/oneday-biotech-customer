import Space from "components/Space";
import Text from "components/Text";
import { schedule } from "configs/schedule";
import { Image, TouchableOpacity, View } from "react-native"
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, widthPercentage } from "utils/ScaledService";

const Completed = () => {
    return (
        <View>
            <View style={{ paddingHorizontal: scaledHorizontal(20) }}>
                <Text>총 <Text style={{ fontWeight: "bold" }}>2</Text>건</Text>
            </View>
            <Space height={12} />
            <TouchableOpacity
                onPress={() => NavigationService.navigate("DetailTreatmentScreen", {
                    type: "completed"
                })}
                style={{
                    height: 49,
                    width: widthPercentage(98),
                    justifyContent: "space-between",
                    flexDirection: "row",
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 2,
                    backgroundColor: "#fff",
                    marginBottom: scaledHorizontal(16)
                }}
            >
                <View
                    style={{
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        height: 49,
                        alignItems: "center",
                        paddingHorizontal: scaledHorizontal(20),
                        backgroundColor: "fff",
                    }}
                >
                    <Text size={13} style={{ fontWeight: "bold" }}>2022.08.13 10:00</Text>
                    <View style={{ height: 10, width: 1, backgroundColor: "#ececec", marginHorizontal: scaledHorizontal(8) }}>
                    </View>
                    <Text size={13}>총 <Text size={13} color="#ec524f">18</Text>개</Text>
                </View>
                <View style={{ position: "absolute", right: -6, top: 10 }}>
                    <Image source={schedule.completion.checkup} style={{ width: 90, height: 28 }} resizeMode="cover" />
                    {/* <ImageBackground source={icons.markYellow} style={{flex: 1,justifyContent: 'center', alignItems: "center", width: 90, height: 28}} resizeMode="cover">
                        <Text size={13}>검진</Text>
                    </ImageBackground> */}
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => NavigationService.navigate("DetailTreatmentScreen", {
                    type: "completed"
                })}
                style={{
                    height: 49,
                    width: widthPercentage(98),
                    justifyContent: "space-between",
                    flexDirection: "row",
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 2,
                    backgroundColor: "#fff"
                }}
            >
                <View
                    style={{
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        height: 49,
                        alignItems: "center",
                        paddingHorizontal: scaledHorizontal(20),
                        backgroundColor: "fff"
                    }}
                >
                    <Text size={13} style={{ fontWeight: "bold" }}>2022.08.13 10:00</Text>
                    <View style={{ height: 10, width: 1, backgroundColor: "#ececec", marginHorizontal: scaledHorizontal(8) }}>
                    </View>
                    <Text size={13}>총 <Text size={13} color="#ec524f">18</Text>개</Text>
                </View>
                <View style={{ position: "absolute", right: -6, top: 10 }}>
                    <Image source={schedule.completion.checkup} style={{ width: 90, height: 28 }} resizeMode="cover" />
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Completed;
