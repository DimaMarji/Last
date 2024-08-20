import { RouteObject } from "react-router-dom";
import Home from "../Pages/Home/homeContainer";

export const companyRoutes: RouteObject[]=[
    {
        path: "/",
        element: <Home />,
    },

]