import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';


import {
    createBrowserRouter,
    // redirect,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
// import ContactsRoute from "@/routes/protected/ContactsRoute.tsx";
// import AddContactRoute from "@/routes/protected/AddContactRoute.tsx";
// import SignUpRoute from "@/routes/public/SignUpRoute.tsx";
// import SignInRoute from "@/routes/public/SignInRoute.tsx";
// import ProtectedRoutes from "@/routes/ProtectedRoutes.tsx";
// import PublicRoutes from "@/routes/PublicRoutes.tsx";
import ErrorRoute from "./routes/public/ErrorRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorRoute />,
        // children: [
        //     {
        //         index: true,
        //         loader: async () => redirect('/sign-in'),
        //     },
        //     {
        //         element: <PublicRoutes/>,
        //         children: [
        //             {
        //                 path: "/sign-up",
        //                 element: <SignUpRoute/>,
        //             },
        //             {
        //                 path: "/sign-in",
        //                 element: <SignInRoute/>,
        //             },
        //         ],
        //     },
        //     {
        //         element: <ProtectedRoutes/>,
        //         children: [
        //             {
        //                 path: "/contacts",
        //                 element: <ContactsRoute/>,
        //             },
        //             {
        //                 path: "/contacts/add",
        //                 element: <AddContactRoute/>,
        //             },
        //         ],
        //     },
        // ],
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
