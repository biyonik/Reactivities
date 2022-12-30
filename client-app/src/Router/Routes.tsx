﻿import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivityDashboardComponent from "../Features/Activities/Dashboard/ActivityDashboard.Component";
import ActivityDetailComponent from "../Features/Activities/Details/ActivityDetail.Component";
import ActivityFormComponent from "../Features/Activities/Form/ActivityForm.Component";
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
            }
        ]
    }  
];

export const router = createBrowserRouter(routes);