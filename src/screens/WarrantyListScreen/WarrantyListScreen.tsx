import BaseModal from "components/BaseModal";
import Button from "components/Button";
import SearchInput from "components/SearchInput";
import Space from "components/Space";
import Text from "components/Text";
import api from "configs/api";
import colors from "configs/colors";
import icons from "configs/icons";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, TouchableOpacity, View } from "react-native"
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { convertDate } from "utils/Utils";
import { useAuth } from "utils/hooks/UseAuth";

const WarrantyListScreen = () => {
    const timeout: any = useRef(null);
    const { token } = useAuth();
    const [openModalSort, SetOpenModalSort] = useState(false);
    const [searchInfo, setSearchInfo] = useState({
        searchText: "",
        page: "1",
        pageSize: "6",
        sortBy: "최신순"
    });
    const [_, setIsSearch] = useState(false);

    const [dataWarranty, setDataWarranty] = useState([] as any);
    const [searchResults, setSearchResults] = useState([] as any);
    const [isLoading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("LATEST");
    const [openModalEmpty, setOpenModalEmpty] = useState(false);

    const onChangeTextSearch = (text: string) => {
        clearTimeout(timeout.current);
        // const tempArr = [...dataWarranty];
        if (text.length > 2) {
            timeout.current = setTimeout(() => {
                setIsSearch(true);
                const term = text.toLocaleLowerCase();
                const res = dataWarranty?.filter((item: any) => item?.name?.toLocaleLowerCase().includes(term))
                if (res?.length < 1) {
                    setOpenModalEmpty(true)
                }
                setSearchResults(res);
                //setIsLoading(true);
            }, 1000);
        } else {
            setSearchResults([...dataWarranty]);
            // setDataWarranty(tempArr);
            setIsSearch(false);
        }
        setSearchInfo({ ...searchInfo, searchText: text });
    };

    const _getWarranty = async (sortBy: any) => {
        setLoading(true);
        const result = await api.getMineWarranty(token, sortBy);

        if (result?.data?.ok) {
            let newArr: any = [];
            result?.data?.data?.userSurgeryHistory?.forEach((item: any) => {
                if (item?.userSurgeryHistoryForm?.filter((val: any) => val?.type === 'IMPLANT')?.length > 0) {
                    item?.userSurgeryHistoryForm?.filter((val: any) => val?.type === 'IMPLANT')?.forEach((data: any) => {
                        const newData = {
                            id: data?.id,
                            name: `${item?.hospital?.name} 임플란트 보증서`,
                            url: data?.imgUrl,
                            createdAt: item?.createdAt
                        }

                        newArr = [...newArr, newData];
                    })
                }
            })

            setDataWarranty(newArr)
            setSearchResults(newArr)
        }

        setLoading(false);
    }

    useEffect(() => {
        _getWarranty(sortBy);
    }, [sortBy]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

            <View style={{
                height: 55,
                paddingHorizontal: scaledHorizontal(20),
                paddingVertical: scaledVertical(18),
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
            }}>
                <TouchableOpacity
                    onPress={() => NavigationService.back()}
                    style={{
                        flexDirection: "row",
                    }}>
                    <View
                        style={{
                            width: 10,
                            height: 18,
                            marginRight: 16
                        }}
                    >
                        <Image source={icons.arrowLeft} style={{ width: 10, height: 18 }} resizeMode="cover" />
                    </View>
                    <Text style={{ fontWeight: "bold" }}>보증서 목록</Text>
                </TouchableOpacity>
            </View>
            <Space height={20} />
            {isLoading ? (
                <ActivityIndicator
                    size={30}
                    color={colors.darkBlue}
                />
            ) : (
                <View
                    style={{ flex: 1, paddingHorizontal: scaledHorizontal(20) }}
                // showsVerticalScrollIndicator={false}
                >
                    <SearchInput
                        value={searchInfo.searchText}
                        placeholder="병원명 검색"
                        onChangeText={onChangeTextSearch}
                        onSubmit={onChangeTextSearch}
                        onDeleteInput={() => {
                            setSearchInfo({ ...searchInfo, searchText: "" });
                            setIsSearch(false);
                            _getWarranty(sortBy);
                        }}
                    />
                    <Space height={19} />
                    <View
                        style={{
                            // paddingHorizontal: scaledHorizontal(25),
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text size={13}>
                            총{" "}
                            <Text style={{ fontWeight: "900" }} size={13}>
                                {searchResults?.length}
                            </Text>
                            건
                        </Text>
                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => { SetOpenModalSort(true) }}
                            >
                                <Text size={13}>{searchInfo.sortBy}</Text>
                                <Image
                                    source={icons.arrowDown}
                                    style={{
                                        height: 12,
                                        width: 12,
                                        tintColor: colors.black,
                                        marginLeft: 5,
                                    }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Space height={12} />
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => NavigationService.navigate("WarrantyDetailScreen", { urlImage: item?.url })}
                                style={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 15,
                                    borderRadius: 2,
                                    borderWidth: 0.3,
                                    marginHorizontal: 1,
                                    borderColor: colors.gainsboro,
                                    marginBottom: 12,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 2,
                                    elevation: 3,
                                    backgroundColor: "#fff",
                                    minHeight: 70,
                                }}
                            >
                                <View
                                    style={{
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            width: 285
                                        }}
                                    >
                                        <Text size={15} style={{ fontWeight: "bold" }}>{item?.name}</Text>
                                        <Space height={8} />
                                        <Text size={12} color="#999999">발급일 : {item?.createdAt ? convertDate(item?.createdAt) : '-'}</Text>
                                    </View>
                                    <View>
                                        <Image source={icons.arrowRight} style={{ width: 7, height: 12 }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
            <BaseModal
                contentStyle={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingHorizontal: 0,
                    borderRadius: 2,
                    minHeight: 114,
                    width: 320,
                    alignSelf: "center"
                }}
                showModal={openModalEmpty}
                animation="slide"
                onBackdropPress={() => setOpenModalEmpty(false)}
                onBackButtonPress={() => setOpenModalEmpty(false)}
            >
                <View
                    style={{
                        backgroundColor: colors.white,
                        // flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 18
                    }}
                >
                    <Text size={15} color="#000" style={{ marginBottom: 23 }}>검색 결과가 없습니다.</Text>
                    <Button
                        onPress={() => setOpenModalEmpty(false)}
                        title="확인"
                        textStyle={{
                            color: "#fff",
                            // fontWeight: "bold",
                            fontSize: 13
                        }}
                        style={{
                            borderRadius: 2,
                            height: 30,
                            width: 80,
                            paddingHorizontal: 17,
                            // paddingVertical: 7,
                            backgroundColor: "#0f1e3d"
                        }}
                    />
                </View>
            </BaseModal>
            <BaseModal
                contentStyle={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingHorizontal: 0,
                    borderRadius: 2,
                    height: 75,
                    width: 225,
                    alignSelf: "center"
                }}
                showModal={openModalSort}
                animation="slide"
                onBackdropPress={() => SetOpenModalSort(false)}
                onBackButtonPress={() => SetOpenModalSort(false)}
            >
                <View
                    style={{
                        backgroundColor: colors.white,
                        // flex: 1
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setSearchInfo({ ...searchInfo, sortBy: "최신순" });
                            SetOpenModalSort(false)
                            setSortBy("LATEST")
                        }}
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingHorizontal: 15,
                            // paddingBottom: 20,
                            paddingVertical: 8,
                            alignItems: "center"
                        }}
                    >
                        <Text size={13}>최신순</Text>
                        <Image source={searchInfo.sortBy === "최신순" ? icons.radioSelect : icons.radioUnselect} style={{ width: 16, height: 16 }} />
                    </TouchableOpacity>
                    <View style={{ height: 1, borderWidth: 0.5, borderColor: "#ddd" }}></View>
                    <TouchableOpacity
                        onPress={() => {
                            setSearchInfo({ ...searchInfo, sortBy: "오래된순" });
                            SetOpenModalSort(false)
                            setSortBy("OLDEST")
                        }}
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingHorizontal: 15,
                            // paddingTop: 20,
                            paddingVertical: 8,
                            alignItems: "center"
                        }}
                    >
                        <Text size={13}>오래된순</Text>
                        <Image source={searchInfo.sortBy === "오래된순" ? icons.radioSelect : icons.radioUnselect} style={{ width: 16, height: 16 }} />
                    </TouchableOpacity>
                </View>
            </BaseModal>
        </SafeAreaView>
    );
}

export default WarrantyListScreen;
