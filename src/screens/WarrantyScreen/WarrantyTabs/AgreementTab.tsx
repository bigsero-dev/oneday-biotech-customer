import Text from "components/Text";
import React from "react";
import { Image, View } from "react-native";

const AgreementTab = ({ agreementData }: any) => {
    return (
        <View
            style={{
                flex: 1,
                // paddingHorizontal: 20
            }}
        >
            {agreementData ? (
                <Image source={{ uri: agreementData?.imgUrl }} style={{ height: 600, width: "auto" }} resizeMode="contain" />

            ) : (
                <Text size={13} style={{ marginTop: 20, marginHorizontal: 20 }} color="#999">등록된 정보가 없습니다.</Text>

            )}
        </View>
    );
}

export default AgreementTab;
