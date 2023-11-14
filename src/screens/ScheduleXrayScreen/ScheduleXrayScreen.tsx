import Options from "components/CarouselXray/Options";
import CarouselXray from "components/CarouselXray";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import globalStyles from "utils/GlobalStyles";
import Text from "components/Text";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import NavigationService from "utils/NavigationService";
import icons from "configs/icons";
import images from "configs/images";

interface ScheduleXrayScreenProps { }

const ScheduleXrayScreen = (props: ScheduleXrayScreenProps) => {
    const ref = React.useRef<ICarouselInstance>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const exampleImages = [
        images.exampleImplant,
        images.exampleImplant,
        images.exampleImplant,
        // "https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Panoramic-dental-xray-300x200.jpg",
        // "https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Panoramic-dental-xray-300x200.jpg",
        // "https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Panoramic-dental-xray-300x200.jpg",
    ];
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
                {exampleImages.length > 0 ? (
                    <View style={{ flex: 1 }}>
                        <CarouselXray
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
        </View>
    );
};

export default ScheduleXrayScreen;
