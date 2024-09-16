import axios, { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

const $authApi = axios.create({
    baseURL: 'https://test.v5.pryaniky.com',
});

const addToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = document.cookie.split(';').find(row => row.trim().startsWith('token='));

    if (token) {
        const tokenValue = token.split('=')[1];
        (config.headers as AxiosRequestHeaders)['x-auth'] = tokenValue;
    }
    
    return config;
};


$authApi.interceptors.request.use(
    (config) => {
        // console.log('Request Interceptor:', config);
        return addToken(config);
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default $authApi;
