import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View, Image, Platform } from "react-native";
import icons from "configs/icons";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import NavigationService from "utils/NavigationService";

import {IconTooth, IconCalendar, IconChange} from "./TabsIcon/TabsIcon"
import HomeTab from "./Tabs/HomeTab";
import TreatmentTab from "./Tabs/TreatmentTab";
import ProfileTab from "./Tabs/ProfileTab";
import Text from "components/Text";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: any) => (
    <TouchableOpacity
      style={{
        top: Platform.OS === "android" ? -20 : -10,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          //borderRadius: 68 / 2,
          //backgroundColor: colors.primary500,
          //borderWidth: 3,
          //borderColor: colors.neutral50,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );

const TabNavigator = () => {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                tabBarStyle: {
                    borderTopWidth: 0,
                    shadowColor: "#000",
                    shadowOffset: {
                    width: 0,
                    height: 14,
                    },
                    shadowOpacity: 0.48,
                    shadowRadius: 11.95,

                    elevation: 11,
                    height: 65,
                    // paddingVertical: scaledVertical(40),
                    paddingTop: 28,
                    paddingBottom: 8,
                    paddingRight: scaledHorizontal(15),
                    backgroundColor: "white",
                    position: "absolute",
                    alignItems: "center",
                    alignContent: "center",
                },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeTab}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            e.preventDefault();
                            navigation.navigate("Home");
                        },
                    })}
                    options={{
                        tabBarHideOnKeyboard: true,
                        headerShown: false,

                        tabBarLabel: ({focused}) => <Text size={12} color={focused ? "#0f1e3d" : "#aaaaaa"}>임플란트</Text>,
                        tabBarIcon: ({ focused }) => <IconTooth focused={focused} />,
                    }}
                />
                <Tab.Screen
                    name="Treatment"
                    component={TreatmentTab}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            e.preventDefault();
                            navigation.navigate("Treatment");
                        },
                    })}
                    options={{
                        tabBarHideOnKeyboard: true,
                        headerShown: false,

                        tabBarLabel: ({focused}) => <Text size={12} color={focused ? "#0f1e3d" : "#aaaaaa"}>진료내역</Text>,
                        tabBarIcon: ({ focused }) => <IconCalendar focused={focused} />,
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileTab}
                    listeners={({ navigation }) => ({
                        tabPress: e => {
                            e.preventDefault();
                            navigation.navigate("Profile");
                        },
                    })}
                    options={{
                        tabBarHideOnKeyboard: true,
                        headerShown: false,

                        tabBarLabel: ({focused}) => <Text size={12} color={focused ? "#0f1e3d" : "#aaaaaa"}>마이페이지</Text>,
                        tabBarIcon: ({ focused }) => <IconChange focused={focused} />,
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}

export default TabNavigator;
