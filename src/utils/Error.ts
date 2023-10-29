import icons from "configs/icons";
import { onErrorState } from "stores/error/errorSlice";
import { onResetPersist } from "stores/persist/persistSlice";
import { onResetUser } from "stores/user/userSlice";
import NavigationService from "./NavigationService";

export const ErrorStatus = (status: any, dispatch: any) => {
  dispatch(
    onErrorState({
      visible: false,
      text: "",
      icon: icons.searchClose,
      withCloseIcon: true,
      withIcon: true,
    }),
  );
  let text = "";
  if (status === 400) {
    text = "Error fetching data from server";
  } else if (status === 403) {
    text = "Error forbidden from server";
  } else if (status === 400) {
    text = "Error bad request from server";
  } else if (status === 404) {
    text = "Error id not found from server";
  } else if (status === 500) {
    text = "Error internal server";
  } else if (status === 502) {
    text = "Error bad gateway";
  } else if (status === 413) {
    text = "Errors file too large";
  } else if (status === 401) {
    text = "Unauthorized error, please login again";
    dispatch(onResetPersist());
    dispatch(onResetUser());
    NavigationService.navigate("TabNavigator", { screen: "Tooth" });
  } else {
    text = "Error not unknown";
  }
  dispatch(
    onErrorState({
      visible: true,
      text: text,
      icon: icons.searchClose,
      withCloseIcon: true,
      withIcon: true,
    }),
  );
};
