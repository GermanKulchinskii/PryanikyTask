import $authApi from '../http/auth.interceptor';

export const loginAPI = async (username: string, password: string) => {
    try {
        const resp = await $authApi.post('/ru/data/v3/testmethods/docs/login', {username, password});
        return resp;
    } catch(error) {
        return error;
    };
};

export const isLoggedAPI = async () => {
    try {
        const resp = await $authApi.get('/ru/data/v3/testmethods/docs/userdocs/get');
        return resp;
    } catch(error) {
        return error;
    };
};
