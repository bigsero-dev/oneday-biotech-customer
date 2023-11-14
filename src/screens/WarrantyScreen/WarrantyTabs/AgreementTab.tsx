import Text from "components/Text";
import React from "react";
import { View } from "react-native";

const AgreementTab = () => {
    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 20
            }}
        >
            <Text size={13} style={{ marginTop: 20 }} color="#999">등록된 정보가 없습니다.</Text>
        </View>
    );
}

export default AgreementTab;
