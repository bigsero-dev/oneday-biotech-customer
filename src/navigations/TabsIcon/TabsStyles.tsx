import colors from "configs/colors";
import { Platform, StyleSheet } from "react-native";
import { scaledVertical } from "utils/ScaledService";

const styles = (focused?: boolean) =>
  StyleSheet.create({
    icon: {
      width: 18,
      height: 18,
      resizeMode: "contain",
      //color: focused ? '#F2994A' : 'white',
      marginTop: Platform.OS === "android" ? 0 : scaledVertical(13),
      marginBottom: Platform.OS === "android" ? 20 : scaledVertical(13),
      tintColor: focused ? colors.darkBlue : colors.lavenderGray,
    },
    title: {
      textAlign: "center",
      fontSize: 12,

      color: focused ? "blue" : "yellow",
      marginBottom: Platform.OS === "android" ? 15 : 5,
      // borderTopWidth: 1,
      // borderTopColor: "red",
    },
    // borderStyle: {
    //   borderBottomWidth: focused ? 2 : 0,
    //   //borderBottomColor: colors.secondary500,
    //   width: "100%",
    // },
  });

export default styles;
