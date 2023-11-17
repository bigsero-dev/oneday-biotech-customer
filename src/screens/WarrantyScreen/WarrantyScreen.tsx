import Text from "components/Text";
import icons from "configs/icons";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import ImplantWarrantyTab from "./WarrantyTabs/ImplantWarrantyTab";
import TreatmentWarrantyTab from "./WarrantyTabs/TreatmentWarrantyTab";
import AgreementTab from "./WarrantyTabs/AgreementTab";
import CautionTab from "./WarrantyTabs/CautionTab";
import Button from "components/Button";
import BaseModal from "components/BaseModal";

const WarrantyScreen = () => {
    const [tab, setTab] = useState("임플란트 보증서");
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
                        <Text style={{ fontWeight: "bold" }}>보증서</Text>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: "bold" }}>1/1</Text>
                </View>
            </View>
            <ScrollView>
                <ScrollView
                    horizontal={true}
                    style={{
                        paddingHorizontal: scaledHorizontal(20),
                        paddingTop: scaledVertical(12),
                        borderBottomColor: "#ddd",
                        borderBottomWidth: 1,
                        height: 40,
                        flexDirection: "row"
                    }}>
                    <TouchableOpacity onPress={() => setTab("임플란트 보증서")} style={{
                        borderBottomColor: "#000",
                        borderBottomWidth: tab === "임플란트 보증서" ? 1 : 0,
                        marginRight: scaledHorizontal(30)
                    }}>
                        <Text size={13} color={tab === "임플란트 보증서" ? "#000" : "#767676"} style={{ fontWeight: tab === "임플란트 보증서" ? "bold" : "500" }} >임플란트 보증서</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab("시술 보증서")}
                        style={{
                            borderBottomColor: "#000",
                            borderBottomWidth: tab === "시술 보증서" ? 1 : 0,
                            marginRight: scaledHorizontal(30)
                        }}>
                        <Text size={13} color={tab === "시술 보증서" ? "#000" : "#767676"} style={{ fontWeight: tab === "시술 보증서" ? "bold" : "500" }}>시술 보증서</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab("동의서")}
                        style={{
                            borderBottomColor: "#000",
                            borderBottomWidth: tab === "동의서" ? 1 : 0,
                            marginRight: scaledHorizontal(30)
                        }}>
                        <Text size={13} color={tab === "동의서" ? "#000" : "#767676"} style={{ fontWeight: tab === "동의서" ? "bold" : "500" }}>동의서</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab("주의사항")}
                        style={{
                            borderBottomColor: "#000",
                            borderBottomWidth: tab === "주의사항" ? 1 : 0,
                            marginRight: scaledHorizontal(30)
                        }}>
                        <Text size={13} color={tab === "주의사항" ? "#000" : "#767676"} style={{ fontWeight: tab === "주의사항" ? "bold" : "500" }}>주의사항</Text>
                    </TouchableOpacity>
                </ScrollView>
                {/* <Space height={30} /> */}

                {tab === "임플란트 보증서" && (
                    <ImplantWarrantyTab />
                )}

                {tab === "시술 보증서" && (
                    <TreatmentWarrantyTab />
                )}

                {tab === "동의서" && (
                    <AgreementTab />
                )}

                {tab === "주의사항" && (
                    <CautionTab />
                )}
            </ScrollView>

            {tab === "임플란트 보증서" || tab === "시술 보증서" ? (
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
            ) : (
                <></>
            )}

            <BaseModal
                contentStyle={{
                    paddingBottom: 0,
                    paddingHorizontal: 0,
                    borderRadius: 22,
                    height: 45,
                    width: 200,
                    backgroundColor: "rgba(0, 0, 0, 0.6);",
                    // opacity: 0.6,
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

export default WarrantyScreen;
