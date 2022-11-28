
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { myContext } from '../contextApi/Authcontext';
import useAdminHook from '../CustomeHOOk/MakeAdmin/useAdminHook';

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(myContext);
    const location = useLocation();
    const [admin, adminLoading] = useAdminHook(user?.email)

    if(loading || adminLoading){
        return <progress className="progress w-56"></progress>
    }

    if (user && admin){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default AdminRoute;