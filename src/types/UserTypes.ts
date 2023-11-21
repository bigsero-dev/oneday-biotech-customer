export interface UserLoginType {
  accessToken: string;
  user: UserDataType;
}

export interface UserDataType {
  id: string;
  role: string;
  email: string;
  type: string;
  hospitalId: string;
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