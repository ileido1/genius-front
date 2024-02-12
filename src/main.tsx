import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './pages/home.tsx';
import { Login } from './pages/Login.tsx';
import { PrivateRoute } from './utils/PrivateRoute.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { Header } from './components/header.tsx';
import { Signup } from './pages/singup.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute></PrivateRoute>,
    children: [
      {
        path: "/promts",
        element: <Header><Home></Home></Header>,
      },
    ],
  },
  {
    path: "/login",
    element: <Header><Login></Login></Header>,
  },
  {
    path: "/signup",
    element: <Header><Signup></Signup></Header>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router}>
  </RouterProvider>
  </AuthProvider>
  </React.StrictMode>,
)
