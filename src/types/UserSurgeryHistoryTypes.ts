export interface UserSurgeryHistoryList {
    ok: boolean,
    data: UserHistoryUserData[],
    metadata: UserSurgeryHistoryMeta
}

export interface UserHistoryUserData {
    id: string,
    step: string,
    reservatedAt: string,
    status: string,
    doctorName: string,
    createdAt: string,
    updatedAt: string,
    user: UserDetailData,
    hospitalMember: HospitalData,
    hospital: HospitalData,
    userTeeth: any[],
    userSurgeryDetail: SurgeryDetailData[]
}

export interface UserSurgeryHistoryMeta {
    page: number,
    pageSize: number,
    total: number,
    lastPage: number
}

export interface UserDetailData {
    id: string,
    name: string,
    citizenNo: string
}

export interface HospitalData {
    id: string,
    name: string
}

export interface SurgeryDetailData {
    id: string,
    formHospital: any,
    type: number,
    status: string,
    reservatedAt: string
    sort: string
}