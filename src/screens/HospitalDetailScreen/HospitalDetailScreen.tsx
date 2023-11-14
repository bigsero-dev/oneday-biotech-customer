import Button from "components/Button";
import Space from "components/Space";
import Text from "components/Text";
import icons from "configs/icons";
import images from "configs/images";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import NavigationService from "utils/NavigationService";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import CarouselHospital from "components/CarouselHospital";
import Options from "components/CarouselHospital/Options";

const HospitalDetailScreen = () => {

    const ref = React.useRef<ICarouselInstance>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const exampleImages = [
        images.hospitalExample,
        images.hospitalExample,
        images.hospitalExample,
    ];

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "#fff" }}
        >
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
                        <TouchableOpacity
                            style={{
                                width: 10,
                                height: 18,
                                marginRight: 16
                            }}
                        >
                            <Image source={icons.arrowLeft} style={{ width: 10, height: 18 }} resizeMode="cover" />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: "bold" }}>원데이 치과</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View
                    style={{
                        height: 200
                    }}
                >
                    {exampleImages.length > 0 ? (
                        <View>
                            <CarouselHospital
                                items={exampleImages}
                                carouselRef={ref}
                                setCurrentIndex={setCurrentIndex}
                            />
                            {exampleImages.length > 1 && (
                                <Options
                                    images={exampleImages}
                                    carouselRef={ref}
                                    currentIndex={currentIndex}
                                    customOption={true}
                                />
                            )}
                        </View>
                    ) : null}
                </View>
                <Space height={30} />
                <View
                    style={{
                        marginHorizontal: 20,
                        flexDirection: "row",
                    }}
                >
                    <Image source={icons.location} style={{ width: 13, height: 15, marginRight: 7 }} />
                    <View
                        style={{
                            width: "95%",
                        }}
                    >
                        <Text size={16} style={{ fontWeight: "bold", marginBottom: 7 }}>주소</Text>
                        <Text size={13} style={{ lineHeight: 19, marginBottom: 7 }}>서울특별시 영등포구 국제금융로 10(여의도동,금천건물 국제금융로)</Text>
                        <Text size={13} color="#aaa" style={{ marginBottom: 14 }}>지번: 서울 강남구 역삼동 813-4 (행정동:역삼1동)</Text>
                        <Image source={images.locationExample} style={{ height: 175, width: "100%" }} resizeMode="contain" />
                    </View>
                </View>
                <Space height={30} />
                <View
                    style={{
                        marginHorizontal: 20,
                        flexDirection: "row",
                    }}
                >
                    <Image source={icons.clock} style={{ width: 15, height: 15, marginRight: 7 }} />
                    <View
                        style={{
                            width: "95%",
                        }}
                    >
                        <Text size={16} style={{ fontWeight: "bold", marginBottom: 7 }}>영업시간</Text>
                        <Text size={12} color="#333">
                            평일 09:30 - 18:30 {"\n"}
                            월/목 저녁7시~9시 야간진료{"\n"}
                            토요일 09:30 - 15:00 {"\n"}
                            일요일/공휴일 휴무
                        </Text>
                    </View>
                </View>
                <Space height={30} />
                <View
                    style={{
                        marginHorizontal: 20,
                        flexDirection: "row",
                    }}
                >
                    <Image source={icons.message} style={{ width: 15, height: 15, marginRight: 7 }} />
                    <View
                        style={{
                            width: "95%",
                        }}
                    >
                        <Text size={16} style={{ fontWeight: "bold", marginBottom: 7 }}>상세정보</Text>
                        <Text size={12} color="#333" style={{ marginBottom: 6 }}>http://www.onedaydent.co.kr</Text>
                        <Text size={12} color="#333">
                            어쩌구 저쩌구 우리 병원은 100년 전통을 자랑하는 {"\n"}
                            고객만족도 1위 치과입니다. 최고의 치과의사가 신뢰와 전문성을 바탕으로 고객님께{"\n"}
                            감동을 드리겠습니다.
                        </Text>
                    </View>
                </View>
                <Space height={70} />
            </ScrollView>
            <Button
                title="전화 문의"
                textStyle={{
                    color: "#fff",
                    fontWeight: "bold"
                }}
                style={{
                    borderRadius: 2,
                    height: 55,
                    backgroundColor: "#0f1e3d",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                }}
            />
        </SafeAreaView>
    );
}

export default HospitalDetailScreen;
