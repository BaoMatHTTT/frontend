import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import DeltaTable from '../Pages/Delta';
import Ingestion from "../Pages/Ingestion";
import SignIn from "../Pages/Login";

const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <Dashboard />
    // }, 
    {
        path: '/login',
        element: <SignIn />
    },
    {
        path: '/deltas',
        element: <DeltaTable />
    },
    {
        path: '/ingestions',
        element: <Ingestion />
    },
    // {
    //     path: '/models',
    //     element: <Model />
    // },
    // {
    //     path: '/models/:modelID',
    //     element: <ModelWithID />
    // },
]);

export default router;