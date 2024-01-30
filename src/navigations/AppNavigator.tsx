import { NavigationContainer } from "@react-navigation/native";
import type { StackNavigationOptions } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import type { RootStackParamList } from "types/NavigatorTypes";
import NavigationService, { navigationRef } from "utils/NavigationService";

import MainNavigator from "./MainNavigator";
import { useAuth } from "utils/hooks/UseAuth";
import { wait } from "utils/Utils";
import { useEffect } from "react";
import api from "configs/api";

const App = createStackNavigator<RootStackParamList>();
const options: StackNavigationOptions = {
    headerTintColor: "#65b6e5",
    headerBackTitleVisible: false,
    headerTitleAlign: "center",
    headerTitleStyle: {
        //fontFamily: "Poppins-Regular",
        fontWeight: "bold",
        fontSize: 14,
        color: "#4a4a4a",
    },
}

const AppNavigator = () => {
    const { token, isAutoLogin } = useAuth();

    const checkUser = async () => {

        if (isAutoLogin) {
            if (token !== "") {
                const result = await api.getMe(token);
                if (result?.data?.ok) {
                    wait(2000).then(() => {
                        NavigationService.jump("TabNavigator");
                    });
                } else {
                    wait(2000).then(() => {
                        NavigationService.jump("LoginScreen");
                    });
                }
            }
        } else {
            wait(2000).then(() => {
                NavigationService.jump("LoginScreen");
            });
        }
    };

    useEffect(() => {
        checkUser();
    }, []);
    return (
        <NavigationContainer ref={navigationRef}>
            <App.Navigator screenOptions={options}>
                <App.Screen
                    name="MainNavigator"
                    component={MainNavigator}
                    options={{ headerShown: false }}
                />
            </App.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
