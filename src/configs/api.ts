import axios from 'axios';
import Config from 'react-native-config';

export const BaseService = axios.create({
    timeout: 60000,
    baseURL: Config.API_URL,
});

const getHeaderPrivate = (token: string) => {
    return {
        headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
        },
    };
};

const getHeaderPublic: any = () => {
    return {
        headers: {
            Accept: "*/*",
            //"X-PUBLIC-TOKEN": Config.PUBLIC_KEY,
        },
    };
};

const api = {
    postLogin: (body: any) =>
        BaseService.post("auth/login/user", body, getHeaderPublic()),
    getMe: (token: string) => BaseService.get('mine/get-user', getHeaderPrivate(token)),
    getHospital: (token: string) => BaseService.get("hospital-by-user?page=1&pageSize=999", getHeaderPrivate(token)),
    getHistorySurgery: (token: string, params: any) => BaseService.get("user-surgery-history-by-user?" + params, getHeaderPrivate(token)),
    getDetailHospital: (token: string, id: string) => BaseService.get("hospitals/" + id, getHeaderPrivate(token)),
    getUserSurgeryHistory: (token: string, id: string) => BaseService.get("user-surgery-history/" + id, getHeaderPrivate(token)),
    getMineWarranty: (token: string, sortBy: string) => BaseService.get("mine/get-warranty?sortBy=" + sortBy, getHeaderPrivate(token)),
    getTeethStep2: (token: string, id: string) => BaseService.get("get-teeth-by-user-id/" + id, getHeaderPrivate(token)),
}

export default api;
