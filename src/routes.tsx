import React from "react";

// Admin Imports
import MainDashboard from "views/user/default";
import Profile from "views/user/profile";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdPerson,
  MdLock,
  MdLineAxis,
  MdPieChart,
} from "react-icons/md";
import PriceChart from "views/user/priceChart";
import BasicHomePage from "views/basic/home";
import SignUp from "views/auth/SignUp";

const routes = [
  {
    name: "Landing Page",
    layout: "/basic",
    path: "default",
    component: <BasicHomePage />,
  },
  {
    name: "Main Dashboard",
    layout: "/user",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Chart",
    layout: "/user",
    path: "charts",
    icon: <MdLineAxis className="h-6 w-6" />,
    children: [
      {
        name: "PriceChart",
        layout: "/user",
        path: "charts/priceChart",
        icon: <MdLineAxis className="h-6 w-6" />,
        component: <PriceChart />,
      },
      // {
      //   name: "SalesChart",
      //   layout: "/user",
      //   path: "charts/salesChart",
      //   icon: <MdPieChart className="h-6 w-6" />,
      //   component: <PriceChart />,
      // },
    ],
  },
  {
    name: "Profile",
    layout: "/user",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "signin",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "signup",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
  },    
];
export default routes;
