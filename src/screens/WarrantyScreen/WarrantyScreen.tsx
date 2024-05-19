import Text from "components/Text";
import icons from "configs/icons";
import React, { useEffect, useState } from "react";
import { Alert, Image, PermissionsAndroid, Platform, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import ImplantWarrantyTab from "./WarrantyTabs/ImplantWarrantyTab";
import TreatmentWarrantyTab from "./WarrantyTabs/TreatmentWarrantyTab";
import AgreementTab from "./WarrantyTabs/AgreementTab";
import CautionTab from "./WarrantyTabs/CautionTab";
import Button from "components/Button";
import BaseModal from "components/BaseModal";
import api from "configs/api";
import { useAuth } from "utils/hooks/UseAuth";
import { RouteProp } from "@react-navigation/core";
import { RootStackParamList } from "types/NavigatorTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import OthersTab from "./WarrantyTabs/OthersTab";
import RNFetchBlob from 'rn-fetch-blob'
import { createPdf } from 'react-native-images-to-pdf';
import RNFS from 'react-native-fs';
import moment from "moment";
import notifee, { EventType } from '@notifee/react-native';

type WarrantyScreenRouteType = RouteProp<RootStackParamList, "WarrantyScreen">;

type WarrantyScreenNavigationProps = StackNavigationProp<
    RootStackParamList,
    "WarrantyScreen"
>;

type Prop = {
    route: WarrantyScreenRouteType;
    navigation: WarrantyScreenNavigationProps;
};

const WarrantyScreen = ({ route }: Prop) => {
    const { historyId } = route?.params;
    console.log("id ", historyId);
    const [tab, setTab] = useState("임플란트 보증서");
    const [openModal, setOpenModal] = useState(false);
    const [cautions, setCauions] = useState([] as any);
    const [treatments, setTreatments] = useState([] as any);
    const [_, setXray] = useState([] as any);
    const [agreements, setAgreements] = useState([] as any);
    const [others, setOthers] = useState([] as any);
    const [warranty, setDataWarranty] = useState([] as any);

    const { token } = useAuth();

    const checkPermission = async () => {

        if (Platform.OS === 'ios') {
            downloadConvertAndSaveToPDF();
            // urlFiles?.map((item: any) => downloadFile(item))

            // downloadFile();
        } else {
            try {
                let permission = [
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ] as any

                const granted = await PermissionsAndroid.requestMultiple(permission);
                if (granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED as any &&
                    granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED as any) {
                    // Once user grant the permission start downloading
                    downloadConvertAndSaveToPDF();
                    // urlFiles?.map((item: any) => downloadFile(item))
                } else {
                    // If permission denied then show alert
                    alert('Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.warn(err);
            }
        }
    };

    const downloadConvertAndSaveToPDF = async () => {
        try {
            let urlFiles = [];
            if (tab === "임플란트 보증서") {
                urlFiles = warranty?.map((item: any) => {
                    return item?.imgUrl
                })
            }

            if (tab === "시술 보증서") {
                urlFiles = treatments?.map((item: any) => {
                    return item?.imgUrl
                })
            }

            if (tab === "동의서") {
                urlFiles = agreements?.map((item: any) => {
                    return item?.imgUrl
                })
            }

            if (tab === "주의사항") {
                urlFiles = cautions?.map((item: any) => {
                    return item?.imgUrl
                })
            }

            if (tab === "기타") {
                urlFiles = others?.map((item: any) => {
                    return item?.imgUrl
                })
            }

            urlFiles.forEach(async (item: any) => {
                const response = await RNFetchBlob.config({ fileCache: true }).fetch('GET', item);
                const imagePath = response.path();

                const imageContent = await RNFS.readFile(imagePath, 'base64');
                const randomString = Math.floor(Math.random() * Date.now()).toString(36);
                const options = {
                    pages: [
                        { imagePath: imageContent }
                    ],
                    outputPath: `file://${RNFS.DownloadDirectoryPath}/warranty_${randomString}_${moment().format('YYYY_MM_DD_HH_mm_ss')}.pdf`,
                };

                createPdf(options)
                    .then((path) => {
                        setOpenModal(true);
                        setTimeout(() => {
                            setOpenModal(false);
                        }, 5000);
                        handleNotification(path)
                    })
                    .catch((error) => Alert.alert("Failed", "Failed converting " + error));
            })


        } catch (error) {
            Alert.alert("Failed", "Failed converting " + error)
        }
    };

    const getDataSurgery = async () => {
        const result = await api.getUserSurgeryHistory(token, historyId || "");

        if (result?.data?.ok) {
            if (result?.data?.data?.userSurgeryHistoryForm?.length > 0) {
                const xrayData = result?.data?.data?.userSurgeryHistoryForm?.filter((item: any) => item?.type === "XRAY");
                setXray(xrayData);

                const otherData = result?.data?.data?.userSurgeryHistoryForm?.filter((item: any) => item?.type === "OTHER");
                setOthers(otherData);

                const agreementData = result?.data?.data?.userSurgeryHistoryForm?.filter((item: any) => item?.type === "AGREEMENT");
                setAgreements(agreementData);

                const treatData = result?.data?.data?.userSurgeryHistoryForm?.filter((item: any) => item?.type === "TREATMENT");
                setTreatments(treatData);

                const cautionData = result?.data?.data?.userSurgeryHistoryForm?.filter((item: any) => item?.type === "CAUTION"); // satu lagi warranty
                setCauions(cautionData);

                const warrantyData = result?.data?.data?.userSurgeryHistoryForm?.filter((item: any) => item?.type === "WARRANTY"); // satu lagi warranty
                setDataWarranty(warrantyData);

            }
        }
    }

    const renderTotalImage = () => {
        let total = "0/0";

        if (others?.length > 0 && tab === "기타") {
            total = `${others?.length}/${others?.length}`
        }

        if (cautions?.length > 0 && tab === "주의사항") {
            total = `${cautions?.length}/${cautions?.length}`
        }

        if (treatments?.length > 0 && tab === "시술 보증서") {
            total = `${treatments?.length}/${treatments?.length}`
        }

        if (agreements?.length > 0 && tab === "동의서") {
            total = `${agreements?.length}/${agreements?.length}`
        }

        if (warranty?.length > 0 && tab === "임플란트 보증서") {
            total = `${warranty?.length}/${warranty?.warranty}`
        }

        return total;
    }

    const handleNotification = async (outputPath: any) => {
        await notifee.requestPermission()

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        await notifee.displayNotification({
            title: 'File Downloaded!',
            body: 'Your file saved in Download Folder.',
            android: {
                channelId,
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
            data: {
                path: outputPath
            }
        });
    }

    useEffect(() => {
        getDataSurgery();

        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED:
                    break;
                case EventType.PRESS:
                    if (Platform.OS === "android") {
                        RNFetchBlob.android.actionViewIntent(detail?.notification?.data?.path, "application/pdf");
                    }

                    if (Platform.OS === "ios") {
                        RNFetchBlob.ios.previewDocument("file://" + detail?.notification?.data?.path)
                    }
                    break;
            }
        });
    }, []);

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
                    <Text style={{ fontWeight: "bold" }}>
                        {renderTotalImage()}
                    </Text>
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
                    <TouchableOpacity onPress={() => setTab("기타")}
                        style={{
                            borderBottomColor: "#000",
                            borderBottomWidth: tab === "기타" ? 1 : 0,
                            marginRight: scaledHorizontal(30)
                        }}>
                        <Text size={13} color={tab === "기타" ? "#000" : "#767676"} style={{ fontWeight: tab === "기타" ? "bold" : "500" }}>기타</Text>
                    </TouchableOpacity>
                </ScrollView>
                {/* <Space height={30} /> */}

                {tab === "임플란트 보증서" && (
                    <ImplantWarrantyTab warrantyData={warranty} />
                )}

                {tab === "시술 보증서" && (
                    <TreatmentWarrantyTab treatmentData={treatments} />
                )}

                {tab === "동의서" && (
                    <AgreementTab agreementData={agreements} />
                )}

                {tab === "주의사항" && (
                    <CautionTab cautionData={cautions} />
                )}

                {tab === "기타" && (
                    <OthersTab otherData={others} />
                )}
            </ScrollView>

            {(cautions?.length > 0 && tab === "주의사항") ||
                (agreements?.length > 0 && tab === "동의서") ||
                (treatments?.length > 0 && tab === "시술 보증서") ||
                (others?.length > 0 && tab === "기타") ||
                (warranty?.length > 0 && tab === "임플란트 보증서") ? (
                <Button
                    onPress={() => {
                        // downloadConvertAndSaveToPDF();
                        checkPermission();
                        // setOpenModal(true)
                        // setTimeout(() => {
                        //     setOpenModal(false);
                        // }, 5000);
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
