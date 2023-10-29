import Space from "components/Space";
import Text from "components/Text";
import icons from "configs/icons";
import { useState } from "react";
import {Image, Platform, SafeAreaView, ScrollView, TouchableOpacity, View, useWindowDimensions} from "react-native"
import { heightPercentage, scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { Config } from "./config";

const HomeScreen = () => {
    const [dataTeeth, setDataTeeth] = useState(Config);
  const { height } = useWindowDimensions();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
            <View 
                style={{
                    paddingHorizontal: scaledHorizontal(20), 
                    paddingVertical: scaledVertical(18), 
                    flexDirection: "row", 
                    justifyContent: "flex-end",
                    alignItems: "center",
                    height: 55,
                }}>
                    <View style={{
                        marginRight: scaledHorizontal(18),
                        backgroundColor: "#568dff",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 11,
                        paddingVertical: 3,
                        borderRadius: 10
                    }}>
                        <Text size={12} color="#fff">진료내역</Text>
                    </View>
                    <TouchableOpacity
                        style={{width: 18, height: 20, justifyContent: "center", alignItems: "center"}}
                    >
                        <Image source={icons.bell} style={{width: 18, height: 20}} resizeMode="contain" />
                        <View style={{width: 7, height: 7, backgroundColor: "#e11818", borderRadius: 7/2, position: "absolute", top: 0, right: 0}}>

                        </View>
                    </TouchableOpacity>
            </View>
            <Space height={scaledVertical(28)} />
            <ScrollView>
                <View style={{
                    paddingHorizontal: scaledHorizontal(20)
                }}>
                    <Text>안녕하세요, 김하루님</Text>
                    <Space height={7} />
                    <Text size={22}>여의도 베스트1234 임플란트 병원 입니다.</Text>
                    <View
                        style={{
                            width: 110,
                            height: 32,
                            backgroundColor: "#ececec",
                            borderRadius: 16,
                            flexDirection: "row",
                            alignSelf: "flex-end"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 55,
                                height: 32,
                                borderRadius: 16,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#0f1e3d"
                            }}
                        >
                            <Text color="#fff" size={13}>완료</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 55,
                                height: 32,
                                borderRadius: 16,
                                justifyContent: "center",
                                alignItems: "center",
                                // backgroundColor: "#0f1e3d"
                            }}
                        >
                            <Text color="#0f1e3d" size={13}>치료중</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                        //position: "absolute",
                        marginTop:
                            Platform.OS === "android" ? (height < 720 ? "15%" : "20%") : 0,
                        justifyContent:
                            Platform.OS === "android" ? "flex-start" : "center",

                        height:
                            Platform.OS === "ios"
                            ? height * ((height < 720 ? 10 : 23) / 100)
                            : heightPercentage(75),
                        //height: height,
                        width: "100%",
                        alignItems: "center",
                        }}
                    >   
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute", 
                                top:240,
                                width: 100,
                            }}
                        >
                            <Text size={13} color="#555" textAlign="center">병원에 예약일정을 문의해주세요.</Text>
                        </View>
                        {dataTeeth.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                flexDirection: "row",
                                position: "absolute",
                                justifyContent: "center",
                                alignItems: "center",
                                //gap: scaledHorizontal(item.gap),
                                //top: item.top,
                                //zIndex: item.zIndex,
                                //backgroundColor: index === 0 ? "red" : "blue",
                                backgroundColor: "red",
                                }}
                            >
                                {item.teeth &&
                                    item.teeth.map((img, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            style={{
                                                position: "absolute", 
                                                top: img.imageInfoUnselect.top,
                                                left: img.imageInfoUnselect.left
                                            }}
                                        >
                                            <Image 
                                                source={img.imageInfoUnselect.image}
                                                style={{
                                                    height: img.imageInfoUnselect.height,
                                                    width: img.imageInfoUnselect.width
                                                }}
                                                resizeMode="cover"
                                            />
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        ))}
                    </View>
                </View>
                <Space height={scaledVertical(820)}/>
                <View style={{
                    paddingHorizontal: scaledHorizontal(20)
                }}>
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
                            <Text color="#555">등록된 일정이 없습니다.</Text>
                        </View>
                        <Space width={98} />
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
                                    width: 40,
                                    height: 40,
                                    backgroundColor: "#f2f2f4",
                                    borderRadius: 40/2
                                }}
                            >
                                <Image source={icons.calendar} style={{width: 20, height: 20}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Space height={120} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;
