import Space from "components/Space";
import Text from "components/Text";
import icons from "configs/icons";
import { FlatList, ImageBackground, TouchableOpacity, View } from "react-native"
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, widthPercentage } from "utils/ScaledService";
import { convertDateHours } from "utils/Utils";

const Ongoing = ({ data, handleLoadMore }: any) => {
    return (
        <View>
            <View style={{ paddingHorizontal: scaledHorizontal(20) }}>
                <Text>총 <Text style={{ fontWeight: "bold" }}>{data?.length}</Text>건</Text>
            </View>
            <Space height={12} />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => NavigationService.navigate("DetailTreatmentScreen", {
                            type: "ongoing"
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
                            elevation: 3,
                            backgroundColor: "#fff",
                            marginBottom: 10
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
                            <Text size={13} style={{ fontWeight: "bold" }}>{convertDateHours(item?.reservatedAt)}</Text>
                            <View style={{ height: 10, width: 1, backgroundColor: "#ececec", marginHorizontal: scaledHorizontal(8) }}>
                            </View>
                            <Text size={13}>총 <Text color="#ec524f" size={13}>{item?.userTeeth?.length}</Text>개</Text>
                        </View>
                        <View style={{ position: "absolute", right: -6, top: 10 }}>
                            <ImageBackground source={icons.markYellow} style={{ flex: 1, justifyContent: 'center', alignItems: "center", width: 90, height: 28 }} resizeMode="cover">
                                <Text size={13}>본뜨기</Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                )}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1} // Adjust as needed
            />
        </View>
    );
}

export default Ongoing;
