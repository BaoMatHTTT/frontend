import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import AsyncRoute from './asyncRoute';
import ProtectedRoute from './protectedRoutes';

import SignIn from "../Pages/SignIn";
import Project from '../Pages/Project';
import Personnel from '../Pages/Personnel';
import ProjectPersonnel from '../Pages/Project/childPages/ProjectPersonnel';
import Account from '../Pages/Account';
import Home from '../Pages/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AsyncRoute component={<Home />}/>
    },
    {
        path: '/signin',
        element: <ProtectedRoute authenticate={false} component={<SignIn />}/>
    },
    {
        path: '/projects',
        element: <ProtectedRoute component={<Project />}/>
    },
    {
        path: '/projects/:id/personnels',
        element: <ProtectedRoute component={<ProjectPersonnel />}/>
    },
    {
        path: '/account',
        element: <ProtectedRoute component={<Account />}/>
    },
    {
        path: '/personnels',
        element: <ProtectedRoute component={<Personnel />}/>
    }
]);

export default router;