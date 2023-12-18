import Text from "components/Text";
import React, { useState } from "react";
import { Image, View } from "react-native";
import Options from "components/CarouselXray/Options";
import CarouselXray from "components/CarouselXray";
import { ICarouselInstance } from "react-native-reanimated-carousel";

const OthersTab = ({ otherData }: any) => {
    const ref = React.useRef<ICarouselInstance>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View
            style={{
                flex: 1,
                // paddingHorizontal: 20
            }}
        >
            {otherData?.length > 0 ? (
                <>
                    <CarouselXray
                        items={otherData?.map((item: any) => {
                            return item?.imgUrl
                        })}
                        carouselRef={ref}
                        setCurrentIndex={setCurrentIndex}
                    />
                    {otherData.length > 1 && (
                        <Options
                            images={otherData?.map((item: any) => {
                                return item?.imgUrl
                            })}
                            carouselRef={ref}
                            currentIndex={currentIndex}
                            customOption={true}
                        />
                    )}
                </>
                // <Image source={{ uri: otherData?.imgUrl }} style={{ height: 600, width: "auto" }} resizeMode="contain" />

            ) : (
                <Text size={13} style={{ marginTop: 20, marginHorizontal: 20 }} color="#999">등록된 정보가 없습니다.</Text>

            )}
        </View>
    );
}

export default OthersTab;
