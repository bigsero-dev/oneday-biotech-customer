import Options from "components/CarouselXray/Options";
import CarouselXray from "components/CarouselXray";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import globalStyles from "utils/GlobalStyles";
import Text from "components/Text";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import NavigationService from "utils/NavigationService";
import icons from "configs/icons";
import { useAuth } from "utils/hooks/UseAuth";
import api from "configs/api";
import { RouteProp } from "@react-navigation/core";
import { RootStackParamList } from "types/NavigatorTypes";
import { StackNavigationProp } from "@react-navigation/stack";

type ScheduleXrayScreenRouteType = RouteProp<RootStackParamList, "ScheduleXrayScreen">;

type ScheduleXrayScreenNavigationProps = StackNavigationProp<
    RootStackParamList,
    "ScheduleXrayScreen"
>;

type Prop = {
    route: ScheduleXrayScreenRouteType;
    navigation: ScheduleXrayScreenNavigationProps;
};

const ScheduleXrayScreen = ({ route }: Prop) => {
    const { historyId } = route?.params;

    const ref = React.useRef<ICarouselInstance>(null);
    const { token } = useAuth();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [xray, setXray] = useState([] as any);

    const getDataSurgery = async () => {
        const result = await api.getUserSurgeryHistory(token, historyId || "");
        if (result?.data?.ok) {
            const xrayData = result?.data?.data?.userSurgeryHistoryForm?.filter((item: any) => item?.type === "XRAY");
            setXray(xrayData);
        }
    }

    useEffect(() => {
        getDataSurgery();
    }, []);

    return (
        <View style={[globalStyles().topSafeArea]}>
            <View style={{ flex: 1 }}>
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
                            <Text style={{ fontWeight: "bold" }}>엑스레이</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {xray.length > 0 ? (
                    <View style={{ flex: 1 }}>
                        <CarouselXray
                            items={xray?.map((item: any) => {
                                return item?.imgUrl
                            })}
                            carouselRef={ref}
                            setCurrentIndex={setCurrentIndex}
                        />
                        {xray.length > 1 && (
                            <Options
                                images={xray?.map((item: any) => {
                                    return item?.imgUrl
                                })}
                                carouselRef={ref}
                                currentIndex={currentIndex}
                                customOption={true}
                            />
                        )}
                    </View>
                ) : null}
            </View>
        </View>
    );
};

export default ScheduleXrayScreen;
