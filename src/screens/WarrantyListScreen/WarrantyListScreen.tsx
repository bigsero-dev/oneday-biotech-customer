import BaseModal from "components/BaseModal";
import SearchInput from "components/SearchInput";
import Space from "components/Space";
import Text from "components/Text";
import api from "configs/api";
import colors from "configs/colors";
import icons from "configs/icons";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from "react-native"
import globalStyles from "utils/GlobalStyles";
import NavigationService from "utils/NavigationService";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
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

    const onChangeTextSearch = (text: string) => {
        clearTimeout(timeout.current);
        // const tempArr = [...dataWarranty];
        if (text.length > 2) {
            timeout.current = setTimeout(() => {
                setIsSearch(true);
                const term = text.toLocaleLowerCase();
                const res = dataWarranty?.filter((item: any) => item?.name?.toLocaleLowerCase().includes(term))
                console.log("aasdas", res)
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

    const _getWarranty = async () => {
        setLoading(true);
        const result = await api.getMineWarranty(token);

        if (result?.data?.ok) {
            let newArr: any = [];
            result?.data?.data?.userSurgeryHistory?.forEach((item: any) => {
                if (item?.userSurgeryHistoryForm?.length > 0) {
                    item?.userSurgeryHistoryForm?.forEach((data: any) => {
                        const newData = {
                            id: data?.id,
                            name: `${item?.hospital?.name} ${data?.type} Warranty`,
                            url: data?.imgUrl
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
        _getWarranty();
    }, []);

    return (
        <View style={[globalStyles().topSafeArea]}>
            <View style={{ flex: 1 }}>
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
                            placeholder="환자명 검색"
                            onChangeText={onChangeTextSearch}
                            onSubmit={onChangeTextSearch}
                            onDeleteInput={() => {
                                setSearchInfo({ ...searchInfo, searchText: "" });
                                setIsSearch(false);
                                _getWarranty();
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
                                    onPress={() => NavigationService.navigate("WarrantyDetailScreen")}
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
                                            <Text size={12} color="#999999">발급일 : {item?.date}</Text>
                                        </View>
                                        <View>
                                            <Image source={icons.arrowRight} style={{ width: 7, height: 12 }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        {/* {dataWarranty?.map((item: any, idx: number) => (
                            <TouchableOpacity
                                onPress={() => NavigationService.navigate("WarrantyDetailScreen")}
                                key={idx}
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
                                        <Text size={12} color="#999999">발급일 : {item?.date}</Text>
                                    </View>
                                    <View>
                                        <Image source={icons.arrowRight} style={{ width: 7, height: 12 }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))} */}

                    </View>
                )}

            </View>
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
        </View>
    );
}

export default WarrantyListScreen;
