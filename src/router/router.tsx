import { createBrowserRouter, RouteObject } from "react-router-dom";
import { lazy } from 'react';
import ErrorPage from "../pages/ErrorPage";

const LoginPage = lazy(() => import('../pages/LoginPage'));
const MainPage = lazy(() => import('../pages/MainPage'));
const App = lazy(() => import('../App'));

const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "", element: <MainPage /> },
			{ path: 'login', element: <LoginPage /> }
		]
	}
];

export const router = createBrowserRouter(routes, {
	basename: '/PryanikyTask'
});