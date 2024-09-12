import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from "axios";


const instance = axios.create({
    baseURL: 'https://test.v5.pryaniky.com',
});

const addToken = (config: InternalAxiosRequestConfig) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
        const tokenValue = token.split('=')[1];
        (config.headers as AxiosRequestHeaders)['x-auth'] = tokenValue;
    }
    return config;
};

instance.interceptors.request.use(
    addToken,
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
        
)

export default instance;
