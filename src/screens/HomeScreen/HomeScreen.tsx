import Space from "components/Space";
import Text from "components/Text";
import icons from "configs/icons";
import { useState } from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
// import { Config } from "./Config";
import images from "configs/images";
import BaseModal from "components/BaseModal";
import colors from "configs/colors";
import Button from "components/Button";
import NavigationService from "utils/NavigationService";
import { useAuth } from "utils/hooks/UseAuth";
import { useSelector } from "react-redux";
import { StoreStateType } from "stores";

const HomeScreen = () => {
    // const [dataTeeth, setDataTeeth] = useState(Config);
    const [openModal, setOpenModel] = useState(false);
    const [tab, setTab] = useState("완료");
    const { userData } = useAuth();
    const { userHospital } = useSelector((state: StoreStateType) => state.hospital)
    // const { height } = useWindowDimensions();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <BaseModal
                contentStyle={{ paddingBottom: 0, paddingHorizontal: 0, borderRadius: 2, height: 525 }}
                showModal={openModal}
                animation="slide"
                onBackdropPress={() => setOpenModel(false)}
                onBackButtonPress={() => setOpenModel(false)}
            >
                <View
                    style={{
                        backgroundColor: colors.white,
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ececec",
                            paddingHorizontal: scaledHorizontal(20)
                        }}
                    >
                        <Text size={18} style={{ fontWeight: "bold", paddingBottom: scaledVertical(14) }}>이용 가이드</Text>
                    </View>
                    <ScrollView
                        style={{
                            height: 384,
                            paddingVertical: scaledVertical(20),
                            paddingHorizontal: scaledHorizontal(16)
                        }}
                    >
                        <View style={{ marginBottom: 10 }}>
                            <Text size={14} style={{ lineHeight: 23, fontWeight: "bold" }}>1. 홈 화면 - 임플란트</Text>
                            <Text size={14} style={{ lineHeight: 23 }}>(1) 하단 푸터에 보면, &apos;임플란트&apos; 메뉴를 누르면 홈 화면으로 올 수 있습니다.</Text>
                            <Text size={14} style={{ lineHeight: 23 }}>(2) 종 모양 아이콘 : 병원에서 진료내역에 대한
                                예약 정보를 알림으로 발송해줍니다.
                                푸시알림을 ON 설정해주세요.

                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (3) 치료중 {"\n"}
                                - 현재 내가 치료중인 치아번호에 빨간색으로 표시가 됩니다.{"\n"}
                                - 병원에서 1차 수술이 예약되면 그때부터 임플란트 수술을 받는 치아 번호에 색표시가 되면서, 임플란트 보증서를 확인할 수 있습니다.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (3) 완료중 {"\n"}
                                - 진료가 최종적으로 검진까지 완료된 경우, 파란색으로 치아에 색이 표시됩니다.{"\n"}
                                - 그동안 해당 병원에서 임플란트 진료가 완료된 치아가 색표시 됩니다.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (4) 예약 현황 {"\n"}
                                병원에서 진료일정을 등록할 경우, 예약 현황이 파란색으로 표시됩니다.{"\n"}
                                클릭하면 &apos;진료내역 상세&apos;를 확인 할 수 있습니다.
                            </Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text size={14} style={{ lineHeight: 23, fontWeight: "bold" }}>2. 진료상세</Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (1) 해당 병원에서 현재 치료중/완료된 진료내역을{"\n"}
                                확인할 수 있습니다.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (2) 치료중 : 임플란트를 한번에 진행하는 임플란 트 수량과 예약일시가 표시됩니다.{"\n"}
                                - 현재 수술과정이 초진검진, 1차 수술, 2차 수술, 본뜨기, 중간과정, 보철세팅, 검진의 순서로 진행 됩니다.
                            </Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text size={14} style={{ lineHeight: 23, fontWeight: "bold" }}>3. 진료상세</Text>
                            <Text size={14} style={{ lineHeight: 23, fontWeight: "bold" }}>A. 예약관리</Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (1) 임플란트 목록 {"\n"}
                                1차 수술에 등록된 임플란트 목록을 확인할 수 있습니다.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (2) 이번 진료일정 {"\n"}
                                - 예약되거나 현재 받아야하는 진료일정이 표시 됩니다.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (3) 다음 진료일정 {"\n"}
                                - 다음에 예약되는 진료일정이 표시됩니다.{"\n"}
                                - 만약, 병원에서 등록하지 않은 경우 &apos;다음 진료{"\n"}
                                일정&apos;에 (미등록)으로 표시됩니다.{"\n"}
                                ** 자세한 일정은 병원에 문의해주세요{"\n"}
                                - 치료중인 진료일정이 모두 완료되면, &apos;완료&apos;상태 로 변경됩니다.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (4) 예약일정 변경 {"\n"}
                                ** 병원에 문의하여 변경해주세요.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (5) 보증서 보기 {"\n"}
                                - 임플란트 보증서와 병원에서 등록한 보증서를 볼 수 있습니다.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (6) 엑스레이 보기 {"\n"}
                                - 임플란트 수술위해 촬영된 엑스레이를 병원에서{"\n"}
                                등록할 경우 볼 수 있습니다.
                            </Text>

                            <Text size={14} style={{ lineHeight: 23, fontWeight: "bold", marginTop: 10 }}>B. 상세내역</Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                - 현재 수술과정이 초진검진, 1차 수술, 2차 수술, 본뜨기, 중간과정, 보철세팅, 검진의 순서로 진행 됩니다.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                - 이번 진료일정 : {"/n"}
                                파란색으로 표시됩니다.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                - 다음 진료일정 : {"/n"}
                                짙은 남색으로 표시됩니다.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                - 완료 일정  : {"/n"}
                                회색으로 표시됩니다.
                            </Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text size={14} style={{ lineHeight: 23, fontWeight: "bold" }}>4. 마이페이지</Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (1) 병원 목록 {"\n"}
                                - 임플란트 APP을 이용하는 병원 중, 나의 회원 정보가 등록된 병원 목록이 보입니다. {"/n"}
                                - HOME 화면에 선택된 진료내역을 다른 병원으로{"\n"}
                                변경할 경우, 병원 목록에서 [병원 변경하기]를 눌러주세요.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (2) 보증서 목록 {"\n"}
                                - 병원 목록에 등록된 병원들 중, 임플란트 수술을 받아 &apos;보증서&apos;가 발급된 병원의 보증서를 볼 수 있습니다.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (3) 알림설정 : 푸시알림 ON/OFF 설정입니다. {"\n"}
                                병원의 진료예약 알림을 위하여 항상 ON으로 설정해주시기 바랍니다.
                            </Text>
                            <Text size={14} style={{ lineHeight: 23 }}>
                                (4) 로그 아웃 : APP에서 로그아웃이 됩니다. {"\n"}
                                만약, 자동 로그인을 한 경우, 자동 로그인이 해제 됩니다.
                            </Text>
                        </View>
                    </ScrollView>
                    <View>
                        <Button
                            onPress={() => setOpenModel(false)}
                            title="확인"
                            textStyle={{
                                color: "#000",
                                fontWeight: "bold"
                            }}
                            style={{
                                borderRadius: 2,
                                height: 55,
                                backgroundColor: "#f2dca8"
                            }}
                        />
                    </View>
                </View>
            </BaseModal>
            <View
                style={{
                    paddingHorizontal: scaledHorizontal(20),
                    paddingVertical: scaledVertical(18),
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    height: 55,
                }}>
                <TouchableOpacity
                    style={{
                        marginRight: scaledHorizontal(18),
                        backgroundColor: "#568dff",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 11,
                        paddingVertical: 3,
                        borderRadius: 10
                    }}
                    onPress={() => setOpenModel(true)}
                >
                    <Text size={12} color="#fff">이용 가이드</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => NavigationService.navigate("NotificationScreen")}
                    style={{ width: 18, height: 20, justifyContent: "center", alignItems: "center" }}
                >
                    <Image source={icons.bell} style={{ width: 18, height: 20 }} resizeMode="contain" />
                    <View style={{ width: 7, height: 7, backgroundColor: "#e11818", borderRadius: 7 / 2, position: "absolute", top: 0, right: 0 }}>

                    </View>
                </TouchableOpacity>
            </View>
            <Space height={scaledVertical(28)} />
            <ScrollView>
                <View style={{
                    paddingHorizontal: scaledHorizontal(20)
                }}>
                    <Text size={14}>안녕하세요, {userData?.name}님</Text>
                    <Space height={7} />
                    <Text size={22} style={{ fontWeight: "bold" }} type="extrabold">{userHospital?.name} 입니다.</Text>
                    <View
                        style={{
                            width: 110,
                            height: 32,
                            backgroundColor: "#ececec",
                            borderRadius: 16,
                            flexDirection: "row",
                            alignSelf: "flex-end"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 55,
                                height: 32,
                                borderRadius: 16,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: tab === "완료" ? "#0f1e3d" : "#ececec"
                            }}
                            onPress={() => setTab("완료")}
                        >
                            <Text
                                color={tab === "완료" ? "#fff" : "#0f1e3d"}
                                style={{ opacity: tab === "완료" ? 1 : 0.5 }}
                                size={13}
                            >
                                완료
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 55,
                                height: 32,
                                borderRadius: 16,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: tab === "치료중" ? "#0f1e3d" : "#ececec"
                            }}
                            onPress={() => setTab("치료중")}
                        >
                            <Text
                                color={tab === "치료중" ? "#fff" : "#0f1e3d"}
                                style={{ opacity: tab === "치료중" ? 1 : 0.5 }}
                                size={13}
                            >
                                치료중
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Space height={19} />
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image source={images.teethImplant} style={{ width: 210, height: 327 }} resizeMode="cover" />
                        <View style={{ position: "absolute", width: 100 }}>
                            <Text textAlign="center" style={{ opacity: 0.8 }} size={13} color="#555">병원에 예약일정을 문의해주세요.</Text>
                        </View>
                    </View>
                    {/* <View
                        style={{
                        //position: "absolute",
                        marginTop:
                            Platform.OS === "android" ? (height < 720 ? "15%" : "20%") : 0,
                        justifyContent:
                            Platform.OS === "android" ? "flex-start" : "center",

                        height:
                            Platform.OS === "ios"
                            ? height * ((height < 720 ? 10 : 23) / 100)
                            : heightPercentage(75),
                        //height: height,
                        width: "100%",
                        alignItems: "center",
                        }}
                    >   
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute", 
                                top: scaledVertical(440),
                                width: 100,
                            }}
                        >
                            <Text size={13} color="#555" textAlign="center">병원에 예약일정을 문의해주세요.</Text>
                        </View>
                        {dataTeeth.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                flexDirection: "row",
                                position: "absolute",
                                justifyContent: "center",
                                alignItems: "center",
                                //gap: scaledHorizontal(item.gap),
                                //top: item.top,
                                //zIndex: item.zIndex,
                                //backgroundColor: index === 0 ? "red" : "blue",
                                backgroundColor: "red",
                                }}
                            >
                                {item.teeth &&
                                    item.teeth.map((img, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            style={{
                                                position: "absolute", 
                                                top: img.imageInfoUnselect.top,
                                                left: img.imageInfoUnselect.left
                                            }}
                                        >
                                            <Image 
                                                source={img.imageInfoUnselect.image}
                                                style={{
                                                    height: img.imageInfoUnselect.height,
                                                    width: img.imageInfoUnselect.width
                                                }}
                                                resizeMode="cover"
                                            />
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        ))}
                    </View> */}
                </View>
                <Space height={scaledVertical(30)} />
                <View style={{
                    paddingHorizontal: scaledHorizontal(20),
                    // position: "absolute",
                    // top: scaledVertical(1100)
                }}>
                    <Text style={{ fontWeight: "bold" }} type="extrabold">예약 현황</Text>
                    <Space height={10} />
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            backgroundColor: "#fff",
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                            elevation: 2,
                            height: 92
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                // justifyContent: "space-between"
                            }}
                        >
                            <View
                                style={{
                                    width: 8,
                                    backgroundColor: "#dddddd",
                                    height: 92,
                                    marginRight: scaledHorizontal(18)
                                }}
                            >
                            </View>
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: scaledHorizontal(18)
                            }}>
                                <Text color="#555" size={13} style={{ opacity: 0.8 }}>등록된 일정이 없습니다.</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: scaledVertical(18)
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50 / 2
                                }}
                            >
                                <Image source={icons.clipBoard} style={{ width: 50, height: 50 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Space height={100} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;
