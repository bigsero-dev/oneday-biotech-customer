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
import { useNavigation } from "@react-navigation/core";
import NavigationService from "utils/NavigationService";

const LoginScreen = () => {
    const [form, setForm] = useState({} as { username: string; password: string });
    const [focusInput, setFocusInput] = useState({
        username: false,
        password: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    // const navigate = useNavigation();

    const {
        control,
        handleSubmit,
        //formState: { errors, isDirty, isValid },
        formState: { errors },
        reset,
      } = useForm({ mode: "onChange" });

    const _onSubmit = (data: any) => {
        setIsLoading(true);
        NavigationService.navigate("TabNavigator", { screen: "Home" });
        console.log(data);
        setIsLoading(false);
    }

    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f1e3d"}}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={"height"}
                contentContainerStyle={{ height: "100%" }}
            >
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ alignItems: "center" }}>
                        <Image source={icons.logo} style={{width: 140, height: 180, marginTop: scaledVertical(180),}} resizeMode="contain" />
                        <Space height={scaledVertical(120)} />
                        <View style={{flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", marginHorizontal: scaledHorizontal(40)}}>
                            <Controller
                                control={control}
                                defaultValue=""
                                render={({ field:{ onChange, value }}) => (
                                    <Input
                                    onChange={text => {
                                        onChange(text);
                                        setForm({ ...form, username: text });
                                      }}
                                      value={value}
                                      isRequired
                                      borderLess={true}
                                      placeholder={"이름"}
                                      error={errors.username && errors?.username?.message}
                                      onClearButton={value ? true : false}
                                      onFocus={() =>
                                        setFocusInput({ ...focusInput, username: true })
                                      }
                                      onBlur={() =>
                                        setFocusInput({ ...focusInput, username: false })
                                      }
                                      onClear={() => {
                                        reset((formValues: any) => ({
                                          ...formValues,
                                          username: "",
                                        }));
                                        setForm({ ...form, username: "" });
                                      }}
                                      //label={i18n.t("login.formEmail")}
                                      focusInput={focusInput.username}
                                    />
                                )}
                                name="username"
                                rules={{}}
                            />
                            <Controller
                                control={control}
                                defaultValue=""
                                render={({ field:{ onChange, value }}) => (
                                    <Input
                                        onChange={text => {
                                            onChange(text);
                                            setForm({ ...form, password: text });
                                        }}
                                        keyboardType="numeric"
                                        value={value}
                                        isRequired
                                        borderLess={true}
                                        placeholder={"휴대전화 번호"}
                                        error={errors.password && errors?.password?.message}
                                        onClearButton={value ? true : false}
                                        onFocus={() =>
                                            setFocusInput({ ...focusInput, password: true })
                                        }
                                        onBlur={() =>
                                            setFocusInput({ ...focusInput, password: false })
                                        }
                                        onClear={() => {
                                            reset((formValues: any) => ({
                                            ...formValues,
                                            password: "",
                                            }));
                                            setForm({ ...form, password: "" });
                                        }}
                                        //label={i18n.t("login.formEmail")}
                                        focusInput={focusInput.password}
                                    />
                                )}
                                name="password"
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
                            disabled={!form?.password || !form?.username}
                            style={{
                                backgroundColor: colors.mediumChampagne,
                                paddingVertical: scaledVertical(25),
                                marginHorizontal: scaledVertical(70),
                                width: "83%",
                                borderRadius: 2,
                            }}
                            textStyle={{
                                color: colors.black,
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
