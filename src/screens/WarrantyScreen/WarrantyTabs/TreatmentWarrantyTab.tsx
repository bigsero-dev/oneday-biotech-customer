import images from "configs/images";
import React from "react";
import { Image, View } from "react-native";

const TreatmentWarrantyTab = () => {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Image source={images.implant2} style={{ height: 600, width: "auto" }} resizeMode="contain" />
        </View>
    );
}

export default TreatmentWarrantyTab;
