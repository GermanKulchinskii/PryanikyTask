interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: document.cookie.split(';').find(row => row.trim().startsWith('token='))?.split('=')[1] || null,
    isAuthenticated: !!document.cookie.split(';').find(row => row.trim().startsWith('token=')),
};

interface AuthAction {
    type: string;
    payload?: string;
}

const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            document.cookie = `token=${action.payload}; path=/`;
            return {
                ...state,
                token: action.payload || null,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;
