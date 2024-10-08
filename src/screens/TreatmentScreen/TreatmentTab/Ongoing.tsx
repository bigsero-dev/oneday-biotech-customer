import Space from "components/Space";
import Text from "components/Text";
import icons from "configs/icons";
import { FlatList, ImageBackground, TouchableOpacity, View } from "react-native"
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, widthPercentage } from "utils/ScaledService";
import { convertDateHours, ConvertStepToText } from "utils/Utils";

const Ongoing = ({ data, handleLoadMore }: any) => {
    return (
        <View>
            {data && data?.length > 0 ? (
                <>
                    <View style={{ paddingHorizontal: scaledHorizontal(20) }}>
                        <Text>총 <Text style={{ fontWeight: "bold" }}>{data?.length}</Text>건</Text>
                    </View>
                    <Space height={12} />
                    <FlatList
                        style={{ height: '70%' }}
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => NavigationService.navigate("DetailTreatmentScreen", {
                                    type: "ongoing",
                                    userHistoryDetail: item
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
                                        <Text size={13}>{ConvertStepToText(item?.step || '')}</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        )}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.1} // Adjust as needed
                    />
                </>
            ) : (
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 32
                }}>
                    <Text size={13} color="#999">등록된 진료내역이 없습니다.</Text>
                </View>
            )}

        </View>
    );
}

export default Ongoing;
