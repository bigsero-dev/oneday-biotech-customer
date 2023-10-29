import color from "configs/colors";
import { StyleSheet } from "react-native";
import { scaledVertical } from "utils/ScaledService";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    position: "relative",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: scaledVertical(9),
  },
  textInput: {
    fontSize: 15,
    height: 40,
    color: color.white,
  },
  borderError: {
    borderColor: color.cinnabar,
  },
  borderLess: {
    borderBottomWidth: 1,
    borderColor: color.white,
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: color.black,
    borderRadius: 8,
  },
  label: {
    paddingBottom: 3,
  },
  wrapInput: {
    flexDirection: "row",
  },
  wrapIcon: {
    position: "absolute",
    right: 0,
    bottom: 2,
    top: 0,
    justifyContent: "center",
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: color.white,
  },
  clearIcon: {
    height: 16,
    width: 16,
    tintColor: color.white,
  },
  errorText: {
    alignSelf: "flex-start",

    marginTop: 5,
    marginBottom: 10,
    fontSize: 12,
    color: color.cinnabar,
  },
  iconSvg: {
    height: 20,
    width: 20,
    color: color.white,
  },
  contentSvg: {
    position: "absolute",
  },
});

export default styles;
