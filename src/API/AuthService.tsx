import $authApi from '../http/auth.interceptor';


export default class AuthService {
    static async login(username: string, password: string) {
        try {
            const resp = await $authApi.post('/ru/data/v3/testmethods/docs/login', {username, password});
            return resp
        } catch(error) {
            return error
        }
    }

    static async checkToken() {
        return $authApi.get('/ru/data/v3/testmethods/docs/userdocs/get')
    }

    // Удаление с кук + обновление?
    static async logout() {
        return $authApi.post('/api/auth/logout')
    }
}

export const loginAPI = async (username: string, password: string) => {
    try {
        const resp = await $authApi.post('/ru/data/v3/testmethods/docs/login', {username, password});
        return resp
    } catch(error) {
        return error
    }
}

export const isLoggedAPI = async (token: string) => {
    try {
        const resp = await $authApi.get('/ru/data/v3/testmethods/docs/userdocs/get')
        return resp
    } catch(error) {
        return error
    }
}
