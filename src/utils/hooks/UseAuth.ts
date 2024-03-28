import { useDispatch, useSelector } from "react-redux";
import api from "configs/api";
import type { StoreStateType } from "stores";
import { onPostLoginToken, onPostUser, onResetPersist } from "stores/persist/persistSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { token, userData, isAutoLogin } = useSelector(
        (state: StoreStateType) => state.persist,
    );
    //   const { user } = useSelector((state: StoreStateType) => state.user);

    const postLogin = async (value: any, isAuto: boolean) => {
        try {
            const resp = await api.postLogin(value);
            if (resp.data) {
                const datas = {
                    ...resp?.data?.data,
                    isAutoLogin: isAuto
                }
                dispatch(onPostLoginToken(datas));

                const result = await api.getMe(resp?.data?.data?.accessToken);
                dispatch(onPostUser(result?.data?.data))
            }

            return {
                ok: true,
                status: "success",
                message: "",
            };
        } catch (errors: any) {
            return {
                ok: false,
                status: "failed",
                message: errors,
            };
        }
    };

    const postLogout = (cb?: () => void) => {
        dispatch(onResetPersist());
        // dispatch(onResetUser());

        cb && cb();
    };

    return {
        postLogin,
        postLogout,
        token,
        userData,
        isAutoLogin
    };
};
