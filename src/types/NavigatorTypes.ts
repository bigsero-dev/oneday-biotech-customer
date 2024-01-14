import { UserHistoryUserData } from "./UserSurgeryHistoryTypes";

export type RootStackParamList = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  TabNavigator: any;
  MainNavigator: undefined;
  LoginScreen: undefined;
  TreatmentScreen: undefined;
  ProfileScreen: undefined;
  DetailTreatmentScreen: {
    type?: string,
    userHistoryDetail?: UserHistoryUserData
  };
  WarrantyListScreen: undefined;
  HospitalListScreen: undefined;
  ImplantListScreen: {
    historyId?: string
  };
  ChangeHospitalScreen: undefined;
  NotificationScreen: undefined;
  WarrantyScreen: {
    historyId?: string
  };
  ScheduleXrayScreen: {
    historyId?: string
  };
  HospitalDetailScreen: {
    id: string;
  };
  WarrantyDetailScreen: undefined;
  PickHospitalScreen: undefined;
}

export type RootType =
  | "SplashScreen"
  | "HomeScreen"
  | "TabNavigator"
  | "MainNavigator"
  | "LoginScreen"
  | "TreatmentScreen"
  | "ProfileScreen"
  | "DetailTreatmentScreen"
  | "WarrantyListScreen"
  | "HospitalListScreen"
  | "ImplantListScreen"
  | "ChangeHospitalScreen"
  | "NotificationScreen"
  | "WarrantyScreen"
  | "ScheduleXrayScreen"
  | "HospitalDetailScreen"
  | "WarrantyDetailScreen"
  | "PickHospitalScreen";
