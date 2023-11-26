export interface UserLoginType {
  accessToken: string;
  user: UserDataType;
}

export interface UserDataType {
  id: string;
  name: string;
  contact: string;
  citizenNo: string;
  address: string;
  gender: string;
  createdAt: string;
  userSurgeryHistory: any[];
}

export interface ListUserHospitalType {
  data: UserHospitalType[],
  ok: boolean
}
export interface UserHospitalType {
  "id": string,
  "contact": string,
  "name": string,
  "createdAt": string,
  "address": string,
  "email": string,
  "addressDetail": string
}