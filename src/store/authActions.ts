import { Dispatch } from 'redux';
import AuthService from '../API/AuthService';

interface LoginSuccessAction {
    type: 'LOGIN_SUCCESS';
    payload: string;
}

interface LogoutAction {
    type: 'LOGOUT';
}

type AuthAction = LoginSuccessAction | LogoutAction;

export const login = (username: string, password: string) => async (dispatch: Dispatch<AuthAction>) => {
    try {
        const response = await AuthService.login(username, password);
        const token = response.data.token;
        dispatch({ type: 'LOGIN_SUCCESS', payload: token });
    } catch (error) {
        console.error('Login error:', error);
    }
};

export const logout = () => (dispatch: Dispatch<AuthAction>) => {
    AuthService.logout();
    dispatch({ type: 'LOGOUT' });
};

export const checkToken = () => async (dispatch: Dispatch<AuthAction>) => {
    try {
        await AuthService.checkToken();
        const token = document.cookie.split(';').find(row => row.trim().startsWith('token='))?.split('=')[1];
        if (token) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: token });
        }
    } catch (error) {
        dispatch({ type: 'LOGOUT' });
    }
};
