import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Blgs from "../Pages/Blogs/Blogs";
import AddProduct from "../Pages/DashBoardPage/Add A Product/AddProduct";
import AllByer from "../Pages/DashBoardPage/AllByer/AllByer";
import Allseller from "../Pages/DashBoardPage/AllSeller/Allseller";
import Myorders from "../Pages/DashBoardPage/My orders/Myorders";
import MyProducts from "../Pages/DashBoardPage/My Products/MyProducts";
import Reports from "../Pages/DashBoardPage/Reports/Reports";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Homepage from "../Pages/Home/HomePage/Homepage";
import Login from "../Pages/Login/Login";
import ParchesProduct from "../Pages/productParches/ParchesProduct";
import Signup from "../Pages/Signup/Signup";
import AdminRoute from "./AdminRoute";
import PrivetRouting from "./PrivetRouting";
import SellerRouting from "./SellerRouting";

const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Homepage></Homepage>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/blog',
                element: <Blgs></Blgs>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/categori/:id',
                element: <PrivetRouting><AllProducts></AllProducts></PrivetRouting>,
                loader: ({ params }) => fetch(`https://resale-server-woad.vercel.app/categories/${params.id}`)

            },

        ]
    },
    {
        path: '/dashbord',
        errorElement: <ErrorPage></ErrorPage>,
        element: <PrivetRouting> <DashboardLayout></DashboardLayout> </PrivetRouting>,
        children: [
            {
                path: '/dashbord',
                element: <Myorders></Myorders>
            },
            {
                path: '/dashbord/parches/:id',
                element: <ParchesProduct></ParchesProduct>,
                loader: ({ params }) => fetch(`https://resale-server-woad.vercel.app/product/parces/${params.id}`)

            },
            {
                path: '/dashbord/myproducts',
                element: <SellerRouting><MyProducts></MyProducts></SellerRouting>
            },
            {
                path: '/dashbord/addproducts',
                element: <SellerRouting><AddProduct></AddProduct></SellerRouting>
            },

            {
                path: '/dashbord/allseller',
                element: <AdminRoute> <Allseller></Allseller> </AdminRoute>
            },
            {
                path: '/dashbord/allbyer',
                element: <AdminRoute> <AllByer></AllByer> </AdminRoute>
            },
            {
                path: '/dashbord/report',
                element: <AdminRoute> <Reports></Reports> </AdminRoute>
            },

        ]
    }
])
export default router