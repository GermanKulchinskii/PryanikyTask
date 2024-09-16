import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
import LoginPage from '../pages/LoginPage';
import MainPage from "../pages/MainPage"
import { UserProvider } from "../Context/useAuth";
// import AuthGuard from '../components/AuthGuard';
import App  from '../App'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: "", element: <MainPage/> },
            { path: 'login', element: <LoginPage />}
        ]
    }
];

export const router = createBrowserRouter(routes);

// const AppProvider: React.FC = ({children}: ) => {
//     return (
//         <RouterProvider router={router} />
//     );
// }

// export default AppProvider;
