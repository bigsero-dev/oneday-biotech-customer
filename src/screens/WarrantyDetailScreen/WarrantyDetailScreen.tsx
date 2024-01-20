import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import BaseModal from "components/BaseModal";
import Button from "components/Button";
import Text from "components/Text";
import icons from "configs/icons";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "types/NavigatorTypes";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs';
import { createPdf } from 'react-native-images-to-pdf';
import moment from "moment";

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

    // const getFileExtention = (fileUrl: any) => {
    //     // To get the file extension
    //     return /[.]/.exec(fileUrl) ?
    //         /[^.]+$/.exec(fileUrl) : undefined;
    // };

    // const downloadFile = (fileUrl: any) => {

    //     // Get today's date to add the time suffix in filename
    //     let date = new Date();
    //     // File URL which we want to download
    //     let FILE_URL = fileUrl;
    //     // Function to get extention of the file url
    //     let file_ext: any = getFileExtention(FILE_URL);

    //     file_ext = `.${file_ext?.[0]}`
    //     // file_ext = '.' + file_ext[0];

    //     // config: To get response by passing the downloading related options
    //     // fs: Root directory path to download
    //     const { config, fs } = RNFetchBlob;
    //     let RootDir = fs.dirs.PictureDir;
    //     let options = {
    //         fileCache: true,
    //         addAndroidDownloads: {
    //             path:
    //                 RootDir +
    //                 '/file_' +
    //                 Math.floor(date.getTime() + date.getSeconds() / 2) +
    //                 file_ext,
    //             description: 'downloading file...',
    //             notification: true,
    //             // useDownloadManager works with Android only
    //             useDownloadManager: true,
    //         },
    //     };
    //     config(options)
    //         .fetch('GET', FILE_URL)
    //         .then(res => {
    //             // Alert after successful downloading
    //             // console.log('res -> ', JSON.stringify(res));
    //             // setPath(res);
    //             setOpenModal(true);
    //             setTimeout(() => {
    //                 setOpenModal(false);
    //             }, 5000);
    //             // alert('File Downloaded Successfully.');
    //         });
    // };

    // const checkPermission = async () => {

    //     // Function to check the platform
    //     // If iOS then start downloading
    //     // If Android then ask for permission

    //     if (Platform.OS === 'ios') {

    //         downloadFile(urlImage)

    //         // downloadFile();
    //     } else {
    //         try {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //                 {
    //                     title: 'Storage Permission Required',
    //                     message:
    //                         'App needs access to your storage to download Photos',
    //                 }
    //             );
    //             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                 // Once user grant the permission start downloading
    //                 console.log('Storage Permission Granted.');
    //                 downloadFile(urlImage)
    //             } else {
    //                 // If permission denied then show alert
    //                 alert('Storage Permission Not Granted');
    //             }
    //         } catch (err) {
    //             // To handle permission related exception
    //             console.warn(err);
    //         }
    //     }
    // };

    const downloadConvertAndSaveToPDF = async (Url: string) => {
        const imageUrl = Url;

        try {
            const response = await RNFetchBlob.config({ fileCache: true }).fetch('GET', imageUrl);
            const imagePath = response.path();

            const imageContent = await RNFS.readFile(imagePath, 'base64');

            const options = {
                pages: [
                    { imagePath: imageContent }
                ],
                outputPath: `file://${RNFS.DownloadDirectoryPath}/warranty_${moment().format('YYYY_MM_DD_HH_mm_ss')}.pdf`,
            };

            createPdf(options)
                .then((path) => {
                    setOpenModal(true);
                    setTimeout(() => {
                        setOpenModal(false);
                    }, 5000);
                    console.log(`PDF created successfully: ${path}`)
                })
                .catch((error) => console.log(`Failed to create PDF: ${error}`));
        } catch (error) {
            console.error('Error saat mengunduh, mengonversi, dan menyimpan file:', error);
        }
    };

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
                    downloadConvertAndSaveToPDF(urlImage || "");
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
