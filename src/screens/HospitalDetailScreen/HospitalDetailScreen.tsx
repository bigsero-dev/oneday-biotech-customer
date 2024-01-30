import Button from "components/Button";
import Space from "components/Space";
import Text from "components/Text";
import icons from "configs/icons";
import images from "configs/images";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View, Linking } from "react-native";
import NavigationService from "utils/NavigationService";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import CarouselHospital from "components/CarouselHospital";
import Options from "components/CarouselHospital/Options";
import { RouteProp } from "@react-navigation/core";
import { RootStackParamList } from "types/NavigatorTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import api from "configs/api";
import { useAuth } from "utils/hooks/UseAuth";
import WebView from "react-native-webview";
import colors from "configs/colors";

type DetailHospitalRouteType = RouteProp<RootStackParamList, "HospitalDetailScreen">;
type DetailHospitalNavigationProps = StackNavigationProp<
    RootStackParamList,
    "HospitalDetailScreen"
>;

type Prop = {
    route: DetailHospitalRouteType;
    navigation: DetailHospitalNavigationProps;
};
const HospitalDetailScreen = ({ route }: Prop) => {

    const { id } = route?.params;
    const { token } = useAuth();
    const ref = React.useRef<ICarouselInstance>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [detailHospital, setDetailHospital] = useState({} as any);
    const [imageCarousel, setImageCarousel] = useState([] as any);
    const exampleImages = [
        images.hospitalExample,
        images.hospitalExample,
        images.hospitalExample,
    ];

    const _getDetailHospital = async () => {
        console.log("ini Id nya", id);
        const result = await api.getDetailHospital(token, id);
        if (result?.data?.ok) {
            setDetailHospital(result?.data?.data);
            setImageCarousel(result?.data?.data?.images);
        }
    }

    const _handleCallPress = () => {
        const phoneUrl = `tel:${detailHospital?.contact}`;
        Linking.openURL(phoneUrl)
            .then((supported) => {
                if (!supported) {
                    console.warn('Panggilan telepon tidak didukung pada perangkat ini');
                }
            })
            .catch((error) => {
                console.error('Error saat membuka aplikasi panggilan telepon:', error);
            });

    }

    useEffect(() => {
        _getDetailHospital();
    }, []);

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
                        <View
                            style={{
                                width: 10,
                                height: 18,
                                marginRight: 16
                            }}
                        >
                            <Image source={icons.arrowLeft} style={{ width: 10, height: 18 }} resizeMode="cover" />
                        </View>
                        <Text style={{ fontWeight: "bold" }}>{detailHospital?.name}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        height: 200
                    }}
                >
                    {imageCarousel.length > 0 ? (
                        <View>
                            <CarouselHospital
                                items={imageCarousel}
                                carouselRef={ref}
                                setCurrentIndex={setCurrentIndex}
                            />
                            {exampleImages.length > 1 && (
                                <Options
                                    images={imageCarousel}
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
                        <Text size={13} style={{ lineHeight: 19, marginBottom: 7 }}>{detailHospital?.address || '-'}</Text>
                        <Text size={13} color="#aaa" style={{ marginBottom: 14 }}>{detailHospital?.addressDetail || '-'}</Text>
                        <View
                            style={{
                                backgroundColor: colors.antiFlashWhite,
                                flex: 1,
                                width: '100%',
                                height: 300
                            }}
                        >
                            <WebView
                                style={{ minHeight: 200, height: 300, flex: 1, opacity: 0.99 }}
                                originWhitelist={['*']}
                                androidLayerType="hardware"
                                javaScriptEnabled={true}
                                scrollEnabled={false}
                                androidHardwareAccelerationDisabled={true}
                                source={{ uri: 'https://onedaybiotech.vercel.app/maps/37.3595704/127.105399/' }}
                            />

                        </View>

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
                        {detailHospital?.openHours?.length > 0 && detailHospital?.openHours?.map((item: any, idx: number) => (
                            <Text size={12} color="#333" key={idx}>
                                {item}
                            </Text>
                        ))}

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
                        <Text size={12} color="#333" style={{ marginBottom: 6 }}>
                            {detailHospital?.details || "-"}
                        </Text>

                    </View>
                </View>
                <Space height={70} />
            </ScrollView>
            <Button
                onPress={_handleCallPress}
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
