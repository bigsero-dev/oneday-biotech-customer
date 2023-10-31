import Space from "components/Space";
import Text from "components/Text";
import icons from "configs/icons";
import { useState } from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

const DetailTreatmentScreen = () => {
    const [tab, setTab] = useState("예약관리");

    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor: "#fff"
        }}>
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
                }}>
                    <TouchableOpacity 
                        onPress={() => NavigationService.back()}
                        style={{
                            width: 10, 
                            height: 18,
                            marginRight: 16
                        }}
                    >
                        <Image source={icons.arrowLeft} style={{width: 10, height: 18}} resizeMode="cover"  />
                    </TouchableOpacity>
                    <Text>진료상세</Text>
                </View>
                <View>
                    <TouchableOpacity style={{
                        width: 25, 
                        height: 22
                    }}>
                        <Image source={icons.home} style={{width: 25, height: 22}} resizeMode="cover"  />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
            <View style={{
                paddingHorizontal: scaledHorizontal(20), 
                paddingTop: scaledVertical(12), 
                borderBottomColor: "#ddd",
                borderBottomWidth: 1,
                height: 40,
                flexDirection: "row"
            }}>
                <TouchableOpacity onPress={() => setTab("예약관리")} style={{
                    borderBottomColor: "#000",
                    borderBottomWidth: tab === "예약관리" ? 1 : 0,
                    marginRight: scaledHorizontal(30)
                }}>
                    <Text color={tab === "치료중" ? "#000" : "#767676"}>예약관리</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab("상세내역")} style={{
                    borderBottomColor: "#000",
                    borderBottomWidth: tab === "상세내역" ? 1 : 0
                }}>
                    <Text color={tab === "상세내역" ? "#000" : "#767676"}>상세내역</Text>
                </TouchableOpacity>
            </View>
            <Space height={24} />
            <View
                style={{
                    flexDirection: "row",
                    marginHorizontal: scaledHorizontal(20),
                    justifyContent: "center"
                }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,  
                        elevation: 5,
                        width: 185,
                        height: 60
                    }}
                >
                    <Text size={13}>수술예정 치아 수량</Text>
                    <Text size={13}>총 0개</Text>
                </View>
                <Space width={10} />
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,  
                        elevation: 5,
                        width: 125,
                        height: 60
                    }}
                >
                    <Text size={13}>주치의</Text>
                    <Text size={13}>김평강</Text>
                </View>
            </View>
            <Space height={12} />
            <View
                style={{
                    height: 35,
                    backgroundColor: "#dddddd",
                    borderWidth: 1,
                    borderColor: "#cccccc",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 320,
                    marginHorizontal: scaledHorizontal(20),
                    alignSelf: "center"
                }}
            >
                <Text size={13}>임플란트 목록 확인</Text>
            </View>
            <Space height={40} />
            <View
                style={{
                    marginHorizontal: scaledHorizontal(20),
                }}
            >
                <Text>이번 진료일정</Text>
                <Space height={10} />
                <View 
                    style={{
                        flexDirection: "row",
                        backgroundColor: "#fff",
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,  
                        elevation: 5,
                        height: 92
                    }}
                >
                    <View
                        style={{
                            width: 8,
                            backgroundColor: "#83abff",
                            height: 92,
                            marginRight: scaledHorizontal(18)
                        }}
                    >
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: scaledHorizontal(18)
                    }}>
                        <Text color="#555">예약일시</Text>
                        <Space height={8} />
                        <Text color="#555">수술과정</Text>
                        <Space height={8} />
                        <Text color="#555">진행상황</Text>
                    </View>
                    <View style={{
                        justifyContent: "center",
                        marginRight: scaledHorizontal(18)
                    }}>
                        <Text color="#000">2022.11.14 10:30</Text>
                        <Space height={8} />
                        <Text color="#000">초진검진</Text>
                        <Space height={8} />
                        <Text color="#000">초진검진</Text>
                    </View>
                    <Space width={56} />
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 50,
                                height: 50,
                                // backgroundColor: "#f2f2f4",
                                borderRadius: 50/2
                            }}
                        >
                            <Image source={icons.clipBoard} style={{width: 50, height: 50}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Space height={36} />
                <Text>이번 진료일정</Text>
                <Space height={10} />
                <View 
                    style={{
                        flexDirection: "row",
                        backgroundColor: "#fff",
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,  
                        elevation: 5,
                        height: 92
                    }}
                >
                    <View
                        style={{
                            width: 8,
                            backgroundColor: "#dddddd",
                            height: 92,
                            marginRight: scaledHorizontal(18)
                        }}
                    >
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: scaledHorizontal(18)
                    }}>
                        <Text color="#555">예약일시</Text>
                        <Space height={8} />
                        <Text color="#555">수술과정</Text>
                        <Space height={8} />
                        <Text color="#555">진행상황</Text>
                    </View>
                    <View style={{
                        justifyContent: "center",
                        marginRight: scaledHorizontal(18)
                    }}>
                        <Text color="#000">2022.11.14 10:30</Text>
                        <Space height={8} />
                        <Text color="#000">초진검진</Text>
                        <Space height={8} />
                        <Text color="#000">초진검진</Text>
                    </View>
                    <Space width={56} />
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 50,
                                height: 50,
                                // backgroundColor: "#f2f2f4",
                                borderRadius: 50/2
                            }}
                        >
                            <Image source={icons.clipBoard} style={{width: 50, height: 50}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Space height={10} />
                <Text color="#999">※ 예약일정 변경은 병원에 문의해주세요.</Text>
            </View>
            
            </ScrollView>
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    height: 50,
                    width: '100%',
                    flexDirection: "row"
                }}
            >
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#0f1e3d",
                        height: 50,
                        width: '50%'
                    }}
                >
                    <Text color="#fff">보증서 보기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f2dca8",
                        height: 50,
                        width: '50%'
                    }}
                >
                    <Text color="#000">엑스레이 보기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default DetailTreatmentScreen;