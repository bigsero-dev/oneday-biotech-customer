import Text from "components/Text";
import React, { useState } from "react";
import { Image, View } from "react-native";
import Options from "components/CarouselXray/Options";
import CarouselXray from "components/CarouselXray";
import { ICarouselInstance } from "react-native-reanimated-carousel";

const TreatmentWarrantyTab = ({ treatmentData }: any) => {
    const ref = React.useRef<ICarouselInstance>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {treatmentData?.length > 0 ? (
                <>
                    <CarouselXray
                        items={treatmentData?.map((item: any) => {
                            return item?.imgUrl
                        })}
                        carouselRef={ref}
                        setCurrentIndex={setCurrentIndex}
                    />
                    {treatmentData.length > 1 && (
                        <Options
                            images={treatmentData?.map((item: any) => {
                                return item?.imgUrl
                            })}
                            carouselRef={ref}
                            currentIndex={currentIndex}
                            customOption={true}
                        />
                    )}
                </>
                // <Image source={{ uri: treatmentData?.imgUrl }} style={{ height: 600, width: "auto" }} resizeMode="contain" />

            ) : (
                <Text size={13} style={{ marginTop: 20, marginHorizontal: 20 }} color="#999">등록된 정보가 없습니다.</Text>

            )}
        </View>
    );
}

export default TreatmentWarrantyTab;
