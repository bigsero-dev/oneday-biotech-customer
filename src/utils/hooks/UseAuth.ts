import { useDispatch, useSelector } from "react-redux";
import api from "configs/api";
import type { StoreStateType } from "stores";
import { onPostLoginToken, onResetPersist } from "stores/persist/persistSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { token, userData } = useSelector(
        (state: StoreStateType) => state.persist,
    );
    //   const { user } = useSelector((state: StoreStateType) => state.user);

    const postLogin = async (value: any) => {
        try {
            const resp = await api.postLogin(value);
            if (resp.data) {
                dispatch(onPostLoginToken(resp?.data?.data));
            }

            return {
                ok: true,
                status: "success",
                message: "",
            };
        } catch (errors: any) {
            console.log(errors?.response?.status);
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
    };
};
