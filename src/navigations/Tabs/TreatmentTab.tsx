import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TreatmentScreen from "screens/TreatmentScreen/TreatmentScreen";

const Treatment = createStackNavigator();

const TreatmentTab = () => {
  return (
    <Treatment.Navigator>
      <Treatment.Screen
        options={{ headerShown: false }}
        name="TreatmentScreen"
        component={TreatmentScreen}
      />
    </Treatment.Navigator>
  );
};

export default TreatmentTab;
