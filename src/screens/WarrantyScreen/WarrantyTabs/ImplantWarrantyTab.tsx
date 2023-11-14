import images from "configs/images";
import React from "react";
import { Image, View } from "react-native";

const ImplantWarrantyTab = () => {
    return (
        <View
            style={{
                flex: 1
            }}
        >
            {/* <Text size={13} color="#999">등록된 정보가 없습니다.</Text> */}
            <Image source={images.implant1} style={{ height: 600, width: "auto" }} resizeMode="contain" />
        </View>
    );
}

export default ImplantWarrantyTab;
