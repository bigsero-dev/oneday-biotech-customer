import { NavigationContainer } from "@react-navigation/native";
import type { StackNavigationOptions } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import type { RootStackParamList } from "types/NavigatorTypes";
import NavigationService, { navigationRef } from "utils/NavigationService";

import MainNavigator from "./MainNavigator";

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
