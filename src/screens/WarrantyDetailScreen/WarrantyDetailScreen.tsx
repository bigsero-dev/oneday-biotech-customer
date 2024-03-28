import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import BaseModal from "components/BaseModal";
import Button from "components/Button";
import Text from "components/Text";
import icons from "configs/icons";
import React, { useEffect, useState } from "react";
import { Alert, Image, PermissionsAndroid, Platform, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "types/NavigatorTypes";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs';
import { createPdf } from 'react-native-images-to-pdf';
import moment from "moment";
import notifee, { EventType } from '@notifee/react-native';

type WarrantyDetailScreenRouteType = RouteProp<RootStackParamList, "WarrantyDetailScreen">;

type WarrantyDetailScreenNavigationProps = StackNavigationProp<
    RootStackParamList,
    "WarrantyDetailScreen"
>;

type Prop = {
    route: WarrantyDetailScreenRouteType;
    navigation: WarrantyDetailScreenNavigationProps;
};

const WarrantyDetailScreen = ({ route }: Prop) => {
    const { urlImage } = route?.params;
    const [openModal, setOpenModal] = useState(false);

    const getFileExtention = (fileUrl: any) => {
        // To get the file extension
        return /[.]/.exec(fileUrl) ?
            /[^.]+$/.exec(fileUrl) : undefined;
    };

    const downloadFile = (fileUrl: any) => {
        let date = new Date();
        let FILE_URL = fileUrl;
        let file_ext: any = getFileExtention(FILE_URL);

        file_ext = `.${file_ext?.[0]}`
        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                path:
                    RootDir +
                    '/file_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    file_ext,
                description: 'downloading file...',
                notification: false,
                useDownloadManager: true,
            },
        };
        config(options)
            .fetch('GET', FILE_URL)
            .then((res: any) => {
                downloadConvertAndSaveToPDF(res.path())
            });
    };

    const checkPermission = async () => {

        if (Platform.OS === 'ios') {

            // downloadConvertAndSaveToPDF(urlImage || "")

            downloadFile(urlImage);
        } else {
            try {
                let permission = [
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ] as any
                const granted = await PermissionsAndroid.requestMultiple(permission)
                if (granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED as any &&
                    granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED as any
                ) {
                    // downloadConvertAndSaveToPDF(urlImage || "")
                    downloadFile(urlImage);
                } else {
                    alert('Storage Permission Not Granted');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const downloadConvertAndSaveToPDF = async (path: any) => {

        try {
            const outputPath = `file://${RNFS.DownloadDirectoryPath}/warranty_${moment().format('YYYY_MM_DD_HH_mm_ss')}.pdf`;
            const options = {
                pages: [
                    { imagePath: path }
                ],
                outputPath: outputPath,
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
        } catch (error) {
            Alert.alert("Failed", "Failed converting " + error)
        }
    };

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
                backgroundColor: "#ffffff"
            }}
        >
            <View style={{
                height: 55,
                paddingHorizontal: scaledHorizontal(20),
                paddingVertical: scaledVertical(18),
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#ffffff"
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
                    <Text size={14}><Text size={14} style={{ fontWeight: "bold" }}>1</Text>/1</Text>
                </View>
            </View>
            <ScrollView>
                <Image source={{ uri: urlImage }} style={{ width: "100%", height: 600 }} resizeMode="contain" />

            </ScrollView>
            <Button
                onPress={() => {
                    // handleNotification();
                    checkPermission();
                    // downloadConvertAndSaveToPDF(urlImage || "");
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
            <BaseModal
                contentStyle={{
                    paddingBottom: 0,
                    paddingHorizontal: 0,
                    borderRadius: 22,
                    height: 45,
                    width: 200,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
