import $authApi from '../http/auth.interceptor';


export default class AuthService {
    static async login(username: string, password: string) {
        return $authApi.post('/ru/data/v3/testmethods/docs/login', {username, password})
    }

    static async checkToken() {
        return $authApi.get('/ru/data/v3/testmethods/docs/userdocs/get')
    }

    // Удаление с кук + обновление?
    static async logout() {
        return $authApi.post('/api/auth/logout')
    }
}
