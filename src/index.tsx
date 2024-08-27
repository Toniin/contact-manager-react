import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import ContactsRoute from "@/routes/protected/ContactsRoute";
import AddContactRoute from "@/routes/protected/AddContactRoute";
import SignUpRoute from "@/routes/public/SignUpRoute";
import SignInRoute from "@/routes/public/SignInRoute";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import PublicRoutes from "@/routes/PublicRoutes";
import ErrorRoute from "./routes/public/ErrorRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorRoute />,
        children: [
            {
                index: true,
                loader: async () => redirect('/sign-in'),
            },
            {
                element: <PublicRoutes/>,
                children: [
                    {
                        path: "/sign-up",
                        element: <SignUpRoute/>,
                    },
                    {
                        path: "/sign-in",
                        element: <SignInRoute/>,
                    },
                ],
            },
            {
                element: <ProtectedRoutes/>,
                children: [
                    {
                        path: "/contacts",
                        element: <ContactsRoute/>,
                    },
                    {
                        path: "/contacts/add",
                        element: <AddContactRoute/>,
                    },
                ],
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);
