export type RootStackParamList = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  TabNavigator: any;
  MainNavigator: undefined;
  LoginScreen: undefined;
  TreatmentScreen: undefined;
  ProfileScreen: undefined;
  DetailTreatmentScreen: {
    type?: string
  };
  WarrantyListScreen: undefined;
  HospitalListScreen: undefined;
  ImplantListScreen: undefined;
  ChangeHospitalScreen: undefined;
  NotificationScreen: undefined;
  WarrantyScreen: undefined;
  ScheduleXrayScreen: undefined;
  HospitalDetailScreen: undefined;
  WarrantyDetailScreen: undefined;
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
  | "WarrantyDetailScreen";
