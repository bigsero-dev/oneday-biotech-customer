import BaseModal from "components/BaseModal";
import Button from "components/Button";
import Text from "components/Text";
import icons from "configs/icons";
import images from "configs/images";
import React, { useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

const WarrantyDetailScreen = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#fff"
            }}
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
                        <Text style={{ fontWeight: "bold" }}>하얀마음치과 임플란트 보증서</Text>
                    </TouchableOpacity>
                    <Text size={14} style={{ fontWeight: "bold" }}>1/1</Text>
                </View>
            </View>
            {/* <View> */}
            <Image source={images.implant1} style={{ width: "100%", height: 600 }} resizeMode="contain" />
            <Button
                onPress={() => {
                    setOpenModal(true)
                    setTimeout(() => {
                        setOpenModal(false);
                    }, 5000);
                }}
                title="보증서 다운"
                textStyle={{
                    color: "#000",
                    fontWeight: "bold"
                }}
                style={{
                    borderRadius: 2,
                    height: 55,
                    backgroundColor: "#f2dca8",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    zIndex: 9999
                }}
            />
            {/* </View> */}
            <BaseModal
                contentStyle={{
                    paddingBottom: 0,
                    paddingHorizontal: 0,
                    borderRadius: 22,
                    height: 45,
                    width: 200,
                    backgroundColor: "#000",
                    opacity: 0.6,
                    alignSelf: "center",
                    justifyContent: "center"

                }}
                backdropOpacity={0}
                showModal={openModal}
                animation="slide"
                onBackdropPress={() => setOpenModal(false)}
                onBackButtonPress={() => setOpenModal(false)}
            >
                <View style={{ height: 45 }}>
                    <Text textAlign="center" size={14} color="#fff">다운이 완료됐습니다.</Text>
                </View>
            </BaseModal>
        </SafeAreaView>
    );
}

export default WarrantyDetailScreen;
