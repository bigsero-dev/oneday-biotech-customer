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