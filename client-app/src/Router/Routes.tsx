import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDashboardComponent from "../Features/Activities/Dashboard/ActivityDashboard.Component";
import ActivityDetailComponent from "../Features/Activities/Details/ActivityDetail.Component";
import ActivityFormComponent from "../Features/Activities/Form/ActivityForm.Component";
import NotFound from "../Features/Errors/NotFound";
import ServerError from "../Features/Errors/ServerError";
import App from "../Layout/App";
import HomePage from "../Pages/HomePage/Home.Page";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'activities',
                element: <ActivityDashboardComponent />
            },
            {
                path: 'activities/:id',
                element: <ActivityDetailComponent />
            },
            {
                path: 'createActivity',
                element: <ActivityFormComponent key='create' />
            },
            {
                path: 'manage/:id',
                element: <ActivityFormComponent key='manage' />
            },
            {
                path: 'not-found',
                element: <NotFound />
            },
            {
                path: 'server-error',
                element: <ServerError />
            },
            {
                path: '*',
                element: <Navigate replace to='/not-found' />
            }
        ]
    }  
];

export const router = createBrowserRouter(routes);