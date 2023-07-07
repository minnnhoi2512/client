
import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Sidebar  from "./components/SidebarAdmin.jsx";

// components
import ConfirmAccount from "./components/ConfirmAccount"
import Login from "./components/Login"
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";
import UserRecovery from './components/UserRecovery';
import ShowUser from "./components/ShowUser";
import Grade from "./components/Grade";
// managerment
import ShowCustomer from './components/ShowCustomer.js'
import ShowMentor from './components/ShowMentor.js'
import ShowStaff from './components/ShowStaff.js'
import ShowAdmin from './components/ShowAdmin.js'
// function
import Booking from './components/Booking.js'
import Blog from './components/Blog.js'

import Course from './components/Course.js'
import { AuthorizeUser} from './middleware/auth'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login></Login>
    },
    {
        path: '/showCustomers',
        element:<Sidebar> <ShowCustomer></ShowCustomer></Sidebar>
    },
    {
        path: '/showMentors',
        element:<Sidebar> <ShowMentor></ShowMentor></Sidebar>
    },
    {
        path: '/showStaffs',
        element:<Sidebar> <ShowStaff></ShowStaff></Sidebar>
    },
    {
        path: '/showAdmins',
        element:<Sidebar> <ShowAdmin></ShowAdmin></Sidebar>
    },

    {
        path: '/showUser',
        element: <Sidebar><AuthorizeUser><ShowUser></ShowUser></AuthorizeUser></Sidebar>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/confirmAccount',
        element: <ConfirmAccount></ConfirmAccount>
    },
    {
        path: '/profile',
        element: <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path: '/userRecovery',
        element: <UserRecovery></UserRecovery>
    },
    {
        path: '/recovery',
        element: <Recovery></Recovery>
    },
    {
        path: '/reset',
        element: <Reset></Reset>
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    },
    {
        path: '/booking',
        element:<Sidebar> <Booking></Booking></Sidebar>
    },
 
    {
        path: '/course',
        element:<Sidebar> <Course></Course></Sidebar>
    },
    {
        path: '/grade',
        element:<Sidebar> <Grade></Grade></Sidebar>
    },
    {
        path: '/blog',
        element:<Sidebar> <Blog></Blog></Sidebar>
    },
])
export default function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>

    )
}