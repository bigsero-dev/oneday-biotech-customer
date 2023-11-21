import colors from "configs/colors";
import icons from "configs/icons";
import React from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";
const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={"dark-content"} />
            <Image
                source={icons.logo}
                style={{
                    width: 240,
                    height: 240,
                }}
                resizeMode={"contain"}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.darkBlue,
    },
});
