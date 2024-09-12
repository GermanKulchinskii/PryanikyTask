import axios from "axios";

const baseURL = 'https://test.v5.pryaniky.com';

export class AuthService {
    // Эндпоинт входа по токену?
    refresh() {
        
    }

    login(loginData: { username: string, password: string }) {
        const endPoint = '/ru/data/v3/testmethods/docs/login';
        axios.post(`${baseURL + endPoint}`, loginData)
        .then(response => {
            console.log(response);
            document.cookie = `token=${response.data.data.token}; path=/;`;
        })
        .catch(error => {
            console.log(error);
        });
    }

    isAuthenticated() {
        return document.cookie.split('; ').some(row => row.startsWith('token='));
    }
}
