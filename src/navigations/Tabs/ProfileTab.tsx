import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "screens/ProfileScreen/ProfileScreen";
import HospitalListScreen from "screens/HospitalListScreen/HospitalListScreen";

const Profile = createStackNavigator();

const ProfileTab = () => {
  return (
    <Profile.Navigator>
      <Profile.Screen
        options={{ headerShown: false }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Profile.Screen
        options={{ headerShown: false }}
        name="HospitalListScreen"
        component={HospitalListScreen}
      />
    </Profile.Navigator>
  );
};

export default ProfileTab;
