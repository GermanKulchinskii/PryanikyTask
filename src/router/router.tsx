import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
import LoginPage from '../pages/LoginPage';
import MainPage from "../pages/MainPage"
import AuthGuard from '../components/AuthGuard';

const routes: RouteObject[] = [
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: (
            <AuthGuard>
                <MainPage />
            </AuthGuard>
        ),
    },
];

const router = createBrowserRouter(routes);

const AppProvider: React.FC = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default AppProvider;
