import Text from "components/Text";
import React from "react";
import { Image, View } from "react-native";

const CautionTab = ({ cautionData }: any) => {
    return (
        <View
            style={{
                flex: 1,
                // paddingHorizontal: 20
            }}
        >
            {cautionData ? (
                <Image source={{ uri: cautionData?.imgUrl }} style={{ height: 600, width: "auto" }} resizeMode="contain" />

            ) : (
                <Text size={13} style={{ marginTop: 20, marginHorizontal: 20 }} color="#999">등록된 정보가 없습니다.</Text>

            )}
        </View>
    );
}

export default CautionTab;
