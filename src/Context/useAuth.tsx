import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedAPI, loginAPI } from "../API/AuthService";

type UserContextType = {
    token: string | null;
    loginUser: (username: string, password: string) => Promise<string>;
    logout: () => void;
    isLoggedIn: () => Promise<boolean>;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(true);

    useEffect(() => {
        const tokenString = document.cookie.split(';').find(row => row.trim().startsWith('token='));
        if (tokenString) {
            const token = tokenString.split('=')[1];
            setToken(token);
        };

        setIsReady(true);
    }, []);

    const loginUser = async (username: string, password: string) => {
        try {
            const res: any = await loginAPI(username, password);
            if (res.data?.data?.token) {
                const newToken = res.data.data.token;
                setToken(newToken);
                document.cookie = `token=${newToken}; path=/;`;
                navigate('/');
                return 'success';
            };
            setIsReady(true);
            return 'wrong credentials';
        } catch (e) {
            return 'error';
        };
    };

    const isLoggedIn = async (): Promise<boolean> => {
        const tokenString = document.cookie.split(';').find(row => row.trim().startsWith('token='));
        if (tokenString) {
            const token = tokenString.split('=')[1];
            setToken(token);
            if (token) {
                try {
                    const res: any = await isLoggedAPI();
                    if (res.data?.data) {
                        setIsReady(true);
                        navigate('/');
                        return true;
                    } else {
                        document.cookie = `token=; path=/;`;
                        setToken(null);
                        setIsReady(false);
                        navigate('/login');
                        return false;
                    }
                } catch (error) {
                    console.error('Ошибка при проверке токена:', error);
                    setIsReady(false);
                    navigate('/login');
                    return false;
                }
            }
        } 
        navigate('/login');
        setIsReady(true);
        return false;
    };

    const logout = async () => {
        document.cookie = `token=; path=/;`;
        setToken(null);
        navigate('/login');
        setIsReady(true);
    };

    return (
        <UserContext.Provider value={{ token, loginUser, isLoggedIn, logout }}>
            {isReady ? children : <div>loading...</div>}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
