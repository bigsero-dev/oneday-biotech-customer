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
}

export default api;
