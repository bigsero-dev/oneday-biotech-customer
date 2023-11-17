import React, { useState } from "react";
import { View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
import icons from "../../../configs/icons";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import Space from "components/Space";
import colors from "configs/colors";
import Text from "components/Text";
import Button from "components/Button";
import Input from "components/Input";
import { Controller, useForm } from "react-hook-form";
import NavigationService from "utils/NavigationService";
import { useAuth } from "utils/hooks/UseAuth";

const LoginScreen = () => {
    const [form, setForm] = useState({} as { name: string; contact: string });
    const [focusInput, setFocusInput] = useState({
        name: false,
        contact: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const { postLogin } = useAuth();
    // const navigate = useNavigation();

    const {
        control,
        handleSubmit,
        //formState: { errors, isDirty, isValid },
        formState: { errors },
        reset,
    } = useForm({ mode: "onChange" });

    const _onSubmit = async (data: any) => {
        setIsLoading(true);
        const res = await postLogin(data);
        if (res?.ok) {
            NavigationService.navigate("TabNavigator", { screen: "Home" });

        }
        console.log(data);
        setIsLoading(false);
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f1e3d" }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={"height"}
                contentContainerStyle={{ height: "100%" }}
            >
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ alignItems: "center" }}>
                        <Image source={icons.logo} style={{ width: 140, height: 180, marginTop: scaledVertical(180), }} resizeMode="contain" />
                        <Space height={scaledVertical(120)} />
                        <View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", marginHorizontal: scaledHorizontal(40) }}>
                            <Controller
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        onChange={text => {
                                            onChange(text);
                                            setForm({ ...form, name: text });
                                        }}
                                        value={value}
                                        isRequired
                                        borderLess={true}
                                        placeholder={"이름"}
                                        error={errors.name && errors?.name?.message}
                                        onClearButton={value ? true : false}
                                        onFocus={() =>
                                            setFocusInput({ ...focusInput, name: true })
                                        }
                                        onBlur={() =>
                                            setFocusInput({ ...focusInput, name: false })
                                        }
                                        onClear={() => {
                                            reset((formValues: any) => ({
                                                ...formValues,
                                                name: "",
                                            }));
                                            setForm({ ...form, name: "" });
                                        }}
                                        //label={i18n.t("login.formEmail")}
                                        focusInput={focusInput.name}
                                    />
                                )}
                                name="name"
                                rules={{}}
                            />
                            <Controller
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        onChange={text => {
                                            onChange(text);
                                            setForm({ ...form, contact: text });
                                        }}
                                        keyboardType="numeric"
                                        value={value}
                                        isRequired
                                        borderLess={true}
                                        placeholder={"휴대전화 번호"}
                                        error={errors.contact && errors?.contact?.message}
                                        onClearButton={value ? true : false}
                                        onFocus={() =>
                                            setFocusInput({ ...focusInput, contact: true })
                                        }
                                        onBlur={() =>
                                            setFocusInput({ ...focusInput, contact: false })
                                        }
                                        onClear={() => {
                                            reset((formValues: any) => ({
                                                ...formValues,
                                                contact: "",
                                            }));
                                            setForm({ ...form, contact: "" });
                                        }}
                                        //label={i18n.t("login.formEmail")}
                                        focusInput={focusInput.contact}
                                    />
                                )}
                                name="contact"
                                rules={{}}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignSelf: "flex-start",
                                    alignItems: "center",
                                }}
                            >
                                <TouchableOpacity
                                    style={[{
                                        width: 16,
                                        height: 16,
                                        borderRadius: 16 / 2,
                                        borderWidth: 1.5,
                                        borderColor: colors.gainsboro,
                                        // backgroundColor: colors.white,
                                        marginLeft: scaledHorizontal(3),
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }]}
                                    onPress={() => setIsCheck(!isCheck)}
                                >
                                    {isCheck && (
                                        <Image
                                            source={icons.check2}
                                            resizeMode="contain"
                                            style={{
                                                height: 16,
                                                width: 16,
                                                // tintColor: isCheck ? colors.black : colors.spanishGray,
                                            }}
                                        />
                                    )}
                                </TouchableOpacity>
                                <Text
                                    color={colors.gainsboro}
                                    style={{ marginLeft: scaledHorizontal(15), fontSize: 13 }}
                                    type="bold"
                                >
                                    자동로그인
                                </Text>
                            </View>
                        </View>
                        <Space height={scaledVertical(100)} />
                        <Button
                            onPress={handleSubmit(_onSubmit)}
                            type="light"
                            title="로그인"
                            disabled={!form?.contact || !form?.name}
                            style={{
                                backgroundColor: !form?.contact || !form?.name ? "#ececec" : colors.mediumChampagne,
                                paddingVertical: scaledVertical(25),
                                marginHorizontal: scaledVertical(70),
                                width: "83%",
                                borderRadius: 2,
                            }}
                            textStyle={{
                                color: !form?.contact || !form?.name ? "#767676" : colors.black,
                                flex: 1,
                                textAlign: "center",
                                fontSize: 17,
                                fontWeight: "900",
                            }}
                            textType="bold"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </View>
    );
}

export default LoginScreen;
