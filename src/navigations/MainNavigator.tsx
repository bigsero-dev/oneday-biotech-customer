import React from "react";
import type { StackNavigationOptions } from "@react-navigation/stack";
import {
    CardStyleInterpolators,
    createStackNavigator,
} from "@react-navigation/stack";
import type { RootStackParamList } from "types/NavigatorTypes";
import HomeScreen from "screens/HomeScreen/HomeScreen";
import LoginScreen from "screens/Auth/LoginScreen/LoginScreen";
import { View } from "react-native";
import ProfileScreen from "screens/ProfileScreen/ProfileScreen";
import TreatmentScreen from "screens/TreatmentScreen/TreatmentScreen";
import TabNavigator from "./TabNavigator";
import DetailTreatmentScreen from "screens/DetailTreatmentScreen/DetailTreatmentScreen";
import WarrantyListScreen from "screens/WarrantyListScreen/WarrantyListScreen";
import HospitalListScreen from "screens/HospitalListScreen/HospitalListScreen";
import ImplantListScreen from "screens/ImplantListScreen/ImplantListScreen";
import ChangeHospitalScreen from "screens/ChangeHospitalScreen/ChangeHospitalScreen";
import NotificationScreen from "screens/NotificationScreen/NotificationScreen";

const Main = createStackNavigator<RootStackParamList>();

const options: StackNavigationOptions = {
    headerTintColor: "#65b6e5",
    headerBackTitleVisible: false,
    headerTitleAlign: "center",
    headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#4a4a4a",
    },
}

const MainNavigator = () => {
    return (
        <View style={{ flex: 1 }}>
            <AppStackNavigator />
        </View>
    );
}

const AppStackNavigator = () => {
    return (
        <Main.Navigator screenOptions={options}>
            <Main.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />
            <Main.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Main.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
            />
            <Main.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
            />
            <Main.Screen
                name="TreatmentScreen"
                component={TreatmentScreen}
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
            />
            <Main.Screen
                name="DetailTreatmentScreen"
                component={DetailTreatmentScreen}
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
            />
            <Main.Screen
                name="WarrantyListScreen"
                component={WarrantyListScreen}
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
            />
            <Main.Screen
                name="HospitalListScreen"
                component={HospitalListScreen}
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
            />
            <Main.Screen
                name="ImplantListScreen"
                component={ImplantListScreen}
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
            />
            <Main.Screen
                name="ChangeHospitalScreen"
                component={ChangeHospitalScreen}
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
            />
            <Main.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
            />
        </Main.Navigator>
    );
}

export default MainNavigator;
